"use client";

import { Palette, Users, Crown } from "lucide-react";

export const UseCasesSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-medium text-neutral-900 mb-4">Perfect for designers, marketers, and brand teams.</h2>
        <p className="text-xl text-neutral-600 mb-16 max-w-3xl mx-auto">
          Whether you create campaigns or manage visuals — our AI saves you hours every week.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Palette className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-4">Designers</h3>
            <p className="text-neutral-600">Automate resizing without breaking your layout.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Users className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-4">Marketers</h3>
            <p className="text-neutral-600">Repurpose assets instantly for every channel.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Crown className="w-8 h-8 text-neutral-600" />
            </div>
            <h3 className="text-xl font-medium text-neutral-900 mb-4">Agencies</h3>
            <p className="text-neutral-600">Deliver full campaigns faster with consistent branding.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
