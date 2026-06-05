# Pixel-match helper: composites a rendered screenshot beside (and over) the design.
# Scales the design crop to the render's pixel width so both are at identical scale.
#
# Usage:
#   pwsh scripts/compare.ps1 -Render <render.png> -Design <design.png> `
#        [-DesignTop 0] [-DesignHeight 0] [-Out <out-prefix>]
#
# Produces <out-prefix>-side.png (render | design) and <out-prefix>-overlay.png
# (design ghosted at 50% over the render — misalignment shows as doubling).

param(
  [Parameter(Mandatory = $true)][string]$Render,
  [Parameter(Mandatory = $true)][string]$Design,
  [int]$DesignTop = 0,
  [int]$DesignHeight = 0,           # 0 = auto: match the render's aspect ratio
  [string]$Out = "$env:TEMP\compare"
)

Add-Type -AssemblyName System.Drawing

$r = [System.Drawing.Image]::FromFile((Resolve-Path $Render))
$d = [System.Drawing.Image]::FromFile((Resolve-Path $Design))

$rw = $r.Width; $rh = $r.Height
if ($DesignHeight -le 0) { $cropH = [int]($d.Width * $rh / $rw) } else { $cropH = $DesignHeight }
$scale = $rw / $d.Width
$scaledH = [int]($cropH * $scale)

# Design crop, scaled to render width
$dScaled = New-Object System.Drawing.Bitmap($rw, $scaledH)
$g = [System.Drawing.Graphics]::FromImage($dScaled)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$src = New-Object System.Drawing.Rectangle(0, $DesignTop, $d.Width, $cropH)
$dst = New-Object System.Drawing.Rectangle(0, 0, $rw, $scaledH)
$g.DrawImage($d, $dst, $src, [System.Drawing.GraphicsUnit]::Pixel)
$g.Dispose()

# Side-by-side
$gap = 24
$H = [Math]::Max($rh, $scaledH)
$side = New-Object System.Drawing.Bitmap(($rw * 2 + $gap), $H)
$sg = [System.Drawing.Graphics]::FromImage($side)
$sg.Clear([System.Drawing.Color]::White)
$sg.DrawImage($r, 0, 0, $rw, $rh)
$sg.DrawImage($dScaled, ($rw + $gap), 0, $rw, $scaledH)
$sg.Dispose()
$side.Save("$Out-side.png")

# Overlay (design at 50% alpha over render)
$ov = New-Object System.Drawing.Bitmap($rw, $H)
$og = [System.Drawing.Graphics]::FromImage($ov)
$og.Clear([System.Drawing.Color]::White)
$og.DrawImage($r, 0, 0, $rw, $rh)
$cm = New-Object System.Drawing.Imaging.ColorMatrix
$cm.Matrix33 = 0.5
$ia = New-Object System.Drawing.Imaging.ImageAttributes
$ia.SetColorMatrix($cm)
$ovRect = New-Object System.Drawing.Rectangle(0, 0, $rw, $scaledH)
$og.DrawImage($dScaled, $ovRect, 0, 0, $rw, $scaledH, [System.Drawing.GraphicsUnit]::Pixel, $ia)
$og.Dispose()
$ov.Save("$Out-overlay.png")

$r.Dispose(); $d.Dispose(); $dScaled.Dispose(); $side.Dispose(); $ov.Dispose()
Write-Output "saved $Out-side.png and $Out-overlay.png  (render ${rw}x${rh}, design crop top=$DesignTop h=$cropH)"
