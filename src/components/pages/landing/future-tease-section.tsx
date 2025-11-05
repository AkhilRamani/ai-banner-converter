"use client";

import { Video, Play } from "lucide-react";
import { ButtonCustom } from "@/components/ui/custom/button-custom";

export const FutureTeaseSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800">
            <Video className="w-4 h-4 mr-2" />
            Coming Soon
          </span>
        </div>
        <h2 className="text-4xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 mb-6 leading-tight">Next: From Static To Motion</h2>
        <p className="text-lg text-neutral-600 mb-8">Soon, transform your designs into platform-ready videos automatically.</p>
        <div className="flex justify-center mb-8">
          <div className="relative inline-block">
            <img src="/landing/original.jpg" alt="Static Design" className="w-48 h-32 object-cover rounded-lg shadow-sm" />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
              <Play className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
        <ButtonCustom variant="main" size="lg" className="px-8 py-4">
          <Video className="w-5 h-5 mr-2" />
          Join Waitlist For Video Feature
        </ButtonCustom>
      </div>
    </section>
  );
};
