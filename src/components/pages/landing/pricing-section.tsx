"use client";

import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { CheckCircle } from "lucide-react";

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 mb-4">Start free. Pay when you publish.</h2>
        <p className="text-lg text-neutral-600 mb-16">Choose the plan that fits your workflow.</p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-neutral-50 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Free</h3>
            <p className="text-neutral-600 mb-8">Perfect for trying it out</p>
            <div className="text-4xl font-medium text-neutral-900 mb-8">$0</div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>5 exports/month</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Basic platform support</span>
              </li>
            </ul>
            <ButtonCustom variant="outline" className="w-full">
              Get Started
            </ButtonCustom>
          </div>

          <div className="bg-blue-600 rounded-3xl p-8 text-white relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium">Most Popular</div>
            </div>
            <h3 className="text-2xl font-semibold mb-2">Pro</h3>
            <p className="text-blue-100 mb-8">For growing teams</p>
            <div className="text-4xl font-medium mb-8">
              $19<span className="text-lg">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Unlimited resizing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>Brand presets</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-white" />
                <span>All platforms</span>
              </li>
            </ul>
            <ButtonCustom variant="outline" className="w-full bg-white text-blue-600 hover:bg-neutral-50">
              Start Pro Trial
            </ButtonCustom>
          </div>

          <div className="bg-neutral-50 rounded-3xl p-8">
            <h3 className="text-2xl font-semibold text-neutral-900 mb-2">Agency</h3>
            <p className="text-neutral-600 mb-8">For large teams</p>
            <div className="text-4xl font-medium text-neutral-900 mb-8">
              $49<span className="text-lg">/month</span>
            </div>
            <ul className="text-left space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Team workspace</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Batch processing</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Priority support</span>
              </li>
            </ul>
            <ButtonCustom variant="outline" className="w-full">
              Contact Sales
            </ButtonCustom>
          </div>
        </div>
      </div>
    </section>
  );
};
