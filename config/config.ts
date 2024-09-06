export type Config = typeof siteConfig;

export const siteConfig = {
  name: "Mockly",
  description:
    "Mockly is a tool that helps you create mockups for your projects.",
  pricing: [
    {
      name: "Starter",
      price: "Free",
      features: [
        "Unlimited projects",
        "Unlimited users",
        "Unlimited storage",
        "24/7 support",
      ],
    },
    {
      name: "Pro",
      price: "$12/mo",
      features: [
        "All Free features",
        "Priority support",
        "Unlimited integrations",
        "Custom analytics",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "All Pro features",
        "Dedicated account manager",
        "Service-level agreement",
        "Custom branding",
      ],
    },
  ],
  isEditorActive: true,
  socialLinks: {
    twitter: "https://x.com/SuryanshSi2001",
    github: "https://github.com/suryanshsingh2001",
  },
};
