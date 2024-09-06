export type Config = typeof siteConfig;

export const siteConfig = {
  name: "Mockly",
  description:
    "Mockly streamlines the process of creating stunning mockups for your projects. No design skills? No problem. Pick your screenshots, customize backgrounds, and add text—all without leaving your browser. Fast, easy, and fully client-side.",
  pricing: [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Unlimited screenshot creation",
        "No login required",
        "Access to all screen sizes (mobile, tablet, desktop)",
        "Custom backgrounds & text",
        "No watermarks",
      ],
    },
    {
      name: "Pro",
      price: "Coming Soon",
      features: [
        "All Free features",
        "Cloud storage",
        "Additional templates and backgrounds",
        "Priority support",
        "Collaborative editing",
      ],
    },
    // {
    //   name: "Pro",
    //   price: "$12/mo",
    //   features: [
    //     "All Free features",
    //     "Priority support",
    //     "Unlimited integrations",
    //     "Custom analytics",
    //   ],
    // },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro features",
        "Custom SLA",
        "Dedicated account manager",
        "Custom branding",
      ]
      
    },
  ],
  isEditorActive: true,
  socialLinks: {
    twitter: "https://x.com/SuryanshSi2001",
    github: "https://github.com/suryanshsingh2001",
  },
};
