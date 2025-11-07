"use client";

import { useState } from "react";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { CheckCircle2 } from "lucide-react";
const FeatureList = ({ features }: { features: string[] }) => (
  <ul className="mb-8 space-y-3 text-left text-xs md:text-base">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center gap-3">
        <CheckCircle2 className="md:mt-0.5 size-4 md:size-5" />
        <span>{feature}</span>
      </li>
    ))}
  </ul>
);

export const PricingSection = () => {
  const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

  const starterPrice = billing === "monthly" ? 10 : 8; // $8/mo billed yearly
  const billingSuffix = billing === "monthly" ? "/month" : "/month — billed yearly";

  const freeFeatures = ["5 image generations/month", "Basic editor", "Standard queue", "Community support"];

  const starterFeatures = ["100 image generations/month", "Motion video generation", "Fast queue", "All formats & platforms", "Email support"];

  const customFeatures = [
    "Custom generation limits",
    "Team workspace & roles",
    "Batch processing",
    "Priority support & SLA",
    "SSO, security & compliance",
  ];

  return (
    <section id="pricing" className="relative py-14 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      {/* background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-10%] h-72 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-200 via-indigo-200 to-cyan-200 opacity-40 blur-3xl" />
        <div className="absolute left-1/3 bottom-[-20%] h-64 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-200 to-blue-200 opacity-30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center flex flex-col">
          <h2 className="text-3xl sm:text-4xl font-medium">Simple pricing</h2>

          {/* Billing toggle */}
          <div className="mt-6 md:mt-2 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1 shadow-sm self-center md:self-end">
            <button
              type="button"
              onClick={() => setBilling("monthly")}
              className={`rounded-full px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium transition ${
                billing === "monthly" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setBilling("yearly")}
              className={`rounded-full px-3 py-1.5 md:px-4 md:py-2 text-sm font-medium transition relative ${
                billing === "yearly" ? "bg-neutral-900 text-white" : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              Yearly
              <span className="ml-2 hidden rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700 sm:inline">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-3 md:mt-6 grid grid-cols-1 gap-3 md:gap-6 md:grid-cols-3 lg:gap-8">
          {/* Free */}
          <div className="rounded-2xl border px-4 py-5 md:p-8 md:px-7 flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-2xl font-semibold text-neutral-900 md:mb-1">Free</h3>
              <p className="text-neutral-600 mb-3 md:mb-6 text-sm md:text-base">Perfect for trying it out</p>
              <div className="mb-3 md:mb-6 flex items-end md:gap-1">
                <span className="text-3xl md:text-4xl font-semibold text-neutral-900">$0</span>
                <span className="text-neutral-500 text-sm md:text-base">/month</span>
              </div>
              <FeatureList features={freeFeatures} />
            </div>
            <ButtonCustom variant="outline" className="w-full">
              Get started free
            </ButtonCustom>
          </div>

          {/* Starter */}
          <div className="relative rounded-2xl border px-4 py-5 md:p-8 md:px-7 flex flex-col justify-between">
            <div className="absolute top-2 right-2 md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
              <div className="rounded-full bg-neutral-900 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium text-white shadow">
                Recommended Plan
              </div>
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-semibold text-neutral-900 md:mb-1">Starter</h3>
              <p className="text-neutral-600 mb-3 md:mb-6 text-sm md:text-base">Best for creators and small teams</p>
              <div className="mb-3 md:mb-6 flex items-end md:gap-1">
                <span className="text-3xl md:text-4xl font-semibold">${starterPrice}</span>
                <span className="text-neutral-500 text-sm md:text-base">{billingSuffix}</span>
              </div>
              <FeatureList features={starterFeatures} />
            </div>
            <ButtonCustom variant="main" className="w-full">
              Get started
            </ButtonCustom>
          </div>

          {/* Custom */}
          <div className="relative rounded-2xl border px-4 py-5 md:p-8 md:px-7 flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-2xl font-semibold text-neutral-900 md:mb-1">Custom</h3>
              <p className="text-neutral-600 mb-3 md:mb-6 text-sm md:text-base">For businesses with advanced needs</p>
              <div className="mb-3 md:mb-6 text-3xl md:text-4xl font-semibold text-neutral-900">Let’s talk</div>
              <FeatureList features={customFeatures} />
            </div>
            <ButtonCustom variant="outline" className="w-full">
              Contact sales
            </ButtonCustom>
          </div>
        </div>

        {/* Footnote */}
        <p className="mt-8 text-center text-xs text-neutral-500">No credit card required. Cancel anytime. 14‑day money‑back guarantee.</p>
      </div>
    </section>
  );
};
