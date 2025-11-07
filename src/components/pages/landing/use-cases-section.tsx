"use client";

import { Palette, Users, Crown } from "lucide-react";

export const UseCasesSection = () => {
  const cards = [
    {
      icon: Palette,
      title: "Designers",
      description: "Automate resizing without breaking your layout.",
    },
    {
      icon: Users,
      title: "Marketers",
      description: "Repurpose assets instantly for every channel.",
    },
    {
      icon: Crown,
      title: "Agencies",
      description: "Deliver full campaigns faster with consistent branding.",
    },
  ];

  return (
    <section className="py-14 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="flex justify-between md:items-center max-w-7xl mx-auto flex-col md:flex-row gap-8 md:gap-12">
        <div className="md:max-w-[35%]">
          <h2 className="text-2xl lg:text-3xl font-medium text-neutral-900 mb-4">
            Perfect for designers,
            <br />
            marketers, and brand teams.
          </h2>
          <p className="text-sm lg:text-base text-neutral-600 max-w-3xl mx-auto">
            Whether you create campaigns or manage visuals — our AI saves you hours every week.
          </p>
        </div>

        <div className="grid grid-cols-2 md:flex gap-4 md:gap-5">
          {cards.map((card, index) => (
            <div key={index} className="md:pl-6 max-w-54 md:border-l">
              <card.icon className="size-4 md:size-5 opacity-70 mb-3 md:mb-4" />
              <h3 className="text-sm lg:text-base font-medium text-neutral-900 mb-2">{card.title}</h3>
              <p className="text-xs lg:text-sm opacity-70">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
