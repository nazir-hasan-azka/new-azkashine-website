/**
 * The site's spine: the three-bucket taxonomy from the corporate portfolio deck (p4,
 * "Technical Portfolio"). The deck's own section dividers already follow these buckets,
 * so the site structure mirrors how the business describes itself.
 *
 * Capability names and their one-line descriptors are taken verbatim from the deck;
 * the longer `intro` copy is written for the web.
 */

export type CategorySlug =
  | "ai-automation"
  | "digital-platforms"
  | "cloud-testing";

export interface Capability {
  /** Verbatim capability name from deck p4. */
  title: string;
  /** Verbatim one-liner from deck p4. */
  descriptor: string;
  /** Expanded copy for the category page. */
  detail: string;
}

export interface Category {
  slug: CategorySlug;
  /** Verbatim bucket name from deck p4. */
  name: string;
  /** Short label used in navigation. */
  navLabel: string;
  tagline: string;
  intro: string;
  /** Banner image in /public/img (without extension). */
  image: string;
  capabilities: Capability[];
}

export const CATEGORIES: Category[] = [
  {
    slug: "ai-automation",
    name: "AI & Automation",
    navLabel: "AI & Automation",
    tagline: "Put AI to work on the decisions people still make by hand.",
    image: "ai-automation",
    intro:
      "Most automation handles the work you can write down in advance. The effort that remains is the work where the goal is clear but the path is not — investigating exceptions, applying policy, moving between systems to reach a decision. That is where our AI and automation practice operates.",
    capabilities: [
      {
        title: "AI-Driven Automation",
        descriptor: "Automating repetitive tasks with GenAI & Agentic AI.",
        detail:
          "Agentic systems that pursue a goal rather than replay a script — planning, reasoning, acting, and adapting as conditions change, with human approval at the points that matter.",
      },
      {
        title: "Advanced Analytics",
        descriptor: "Trends forecast and BI.",
        detail:
          "Forecasting, anomaly detection, and pattern recognition on live data, delivered as dashboards and answers business users can act on without a BI team in the loop.",
      },
      {
        title: "AI-Integrated Ecosystem",
        descriptor: "Modernize with AI in real-time applications.",
        detail:
          "Adding AI to systems already in production — conversational interfaces, document understanding, and CRM-connected retrieval — without rebuilding what already works.",
      },
      {
        title: "AI Based Network Optimization",
        descriptor: "AI Ops for Telecom.",
        detail:
          "AI-Ops for telecom operators: anticipating degradation, prioritising interventions, and reducing manual triage across network operations.",
      },
    ],
  },
  {
    slug: "digital-platforms",
    name: "Digital Platforms",
    navLabel: "Digital Platforms",
    tagline: "Platforms built to be run for years, not demoed once.",
    image: "digital-platforms",
    intro:
      "We build and operate multi-sided platforms — the kind with several classes of user, real money or real compliance obligations moving through them, and an administrative surface that has to stay usable as the business grows.",
    capabilities: [
      {
        title: "Custom Software Solutions",
        descriptor: "Evolving Hybrid smart Platforms",
        detail:
          "End-to-end platform builds spanning multiple portals and roles — advertiser, partner, and administrator views over one core engine, each with its own permissions and reporting.",
      },
      {
        title: "Smart Applications",
        descriptor: "Web & Mobile Applications",
        detail:
          "Web and mobile applications designed for the conditions they actually run in: shared devices, patchy connectivity, and users who will not be trained.",
      },
      {
        title: "Data Governance & ETL",
        descriptor: "Integrating and Transforming data.",
        detail:
          "Integrating and transforming data across systems, with the lineage, validation, and access controls needed to trust what comes out the other side.",
      },
      {
        title: "AI Enabled Platforms",
        descriptor: "Sector agnostic AI platforms",
        detail:
          "Platforms where AI is the product rather than a feature — case triage, risk detection, and document intelligence built into the core workflow.",
      },
    ],
  },
  {
    slug: "cloud-testing",
    name: "Cloud Services & Testing",
    navLabel: "Cloud & Testing",
    tagline: "Provision it, run it, and prove it works.",
    image: "cloud-testing",
    intro:
      "Cloud infrastructure engineering and quality engineering under one roof — including validation of AI systems themselves, which most engineering firms do not offer.",
    capabilities: [
      {
        title: "DevOps",
        descriptor: "Strategic DevOps Implementations.",
        detail:
          "DevOps, SRE, and infrastructure provisioning across AWS, Azure, and GCP — turning infrastructure requests into governed, repeatable deployments.",
      },
      {
        title: "Automation & Quality Engineering",
        descriptor: "Workflow automations & E2E Testing",
        detail:
          "End-to-end test suite development and execution across functional, non-functional, integration, and penetration testing — extending to prompt-engineering validation and RAG groundedness testing for GenAI systems.",
      },
      {
        title: "Managed Services",
        descriptor: "Unwavering operational excellence",
        detail:
          "Ongoing operation of the platforms we build and the infrastructure they run on, with defined ownership rather than best-effort support.",
      },
      {
        title: "Wireless Testing",
        descriptor: "Comprehensive wireless testing — 5G/6G",
        detail:
          "Comprehensive wireless testing for 5G and 6G deployments, covering device, network, and performance validation.",
      },
    ],
  },
];

export const CATEGORY_BY_SLUG: Record<CategorySlug, Category> = Object.fromEntries(
  CATEGORIES.map((c) => [c.slug, c]),
) as Record<CategorySlug, Category>;
