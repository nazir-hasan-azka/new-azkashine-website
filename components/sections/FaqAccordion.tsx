"use client";

import { useState } from "react";

// NOTE: placeholder Q&A from the Figma design — real questions/answers come in the content pass.
const ITEMS = [
  {
    q: "Find quick answers to the most common support questions",
    a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
  },
  { q: "Find quick answers to the most common support questions", a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { q: "Find quick answers to the most common support questions", a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { q: "Find quick answers to the most common support questions", a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
  { q: "Find quick answers to the most common support questions", a: "Lorem Ipsum is simply dummy text of the printing and typesetting industry." },
];

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <ul className="flex flex-col gap-5">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <li key={i} className="rounded-2xl border border-border bg-white">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left lg:px-8"
            >
              <span className="text-lg font-medium text-ink lg:text-2xl">
                {item.q}
              </span>
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <PlusMinus open={isOpen} />
              </span>
            </button>
            {isOpen && (
              <div className="px-6 pb-6 lg:px-8">
                <p className="max-w-3xl text-base leading-relaxed text-muted lg:text-lg">
                  {item.a}
                </p>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      {!open && <line x1="12" y1="5" x2="12" y2="19" />}
    </svg>
  );
}
