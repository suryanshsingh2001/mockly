"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { siteConfig } from "@/config/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BackgroundGradient } from "../layout/background-gradient";

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24">
        <BackgroundGradient
            className="z-0"
            primaryColor="purple-500"
            secondaryColor="violet-400"
            accentColor="indigo-600"
            gridOpacity="0.03"
        />
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Simple, transparent <span className="text-primary">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            No hidden fees, no complicated tiers. Choose the plan that works
            for you.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {siteConfig.pricing.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card 
                className={`h-full ${
                  plan.isRecommended 
                    ? "relative overflow-hidden border-primary" 
                    : ""
                }`}
              >
                {plan.isRecommended && (
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                )}
                <CardContent className={`pt-6 ${plan.isRecommended ? "relative z-10" : ""}`}>
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium">{plan.name}</h3>
                    {plan.isRecommended && (
                      <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.price !== "Free" && plan.price !== "Custom" && plan.price !== "Coming Soon" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                  <p className="mb-6 text-muted-foreground">
                    {plan.name === "Starter" && "Perfect for hobbyists and small projects."}
                    {plan.name === "Pro" && "For professionals and growing teams."}
                    {plan.name === "Enterprise" && "For large teams and organizations."}
                  </p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={plan.isRecommended ? "default" : "outline"} 
                    className="w-full"
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}