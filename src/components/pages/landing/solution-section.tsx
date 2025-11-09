"use client";

import Image from "next/image";
import { Zap, CheckCircle, ArrowRight, Palette } from "lucide-react";

export const SolutionSection = () => {
  const cards = [
    {
      icon: Zap,
      title: "Content-aware resizing",
      description: "AI repositions key elements like text, logos, and subjects.",
    },
    {
      icon: CheckCircle,
      title: "Platform presets",
      description: "Instagram, LinkedIn, YouTube, Google Ads, Facebook, X, Pinterest & more.",
    },
    {
      icon: ArrowRight,
      title: "One-click exports",
      description: "Generate all formats in one go.",
    },
    {
      icon: Palette,
      title: "Smart layouts",
      description: "Maintain brand consistency automatically.",
    },
  ];

  return (
    <section id="features" className="relative overflow-hidden py-28 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/80 px-3 py-1 text-sm text-neutral-600 shadow-sm backdrop-blur">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Smart, fast, on-brand
          </div>

          <h2 className="mt-6 text-balance text-2xl md:text-4xl font-medium">
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 bg-clip-text text-transparent">
              Meet your AI Design Resizer
            </span>
          </h2>

          <p className="mt-4 text-lg sm:text-xl text-neutral-500 max-w-2xl mx-auto">Adapt visuals for every platform—automatically.</p>

          {/* Platform strip */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 opacity-60">
            <Image src="/icons/instagram-icon.svg" alt="Instagram" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/linkedin-icon.svg" alt="LinkedIn" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/youtube-icon.svg" alt="YouTube" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/google-icon.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/pinterest-icon.svg" alt="Pinterest" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/x-icon.svg" alt="X" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/tiktok-icon.svg" alt="TikTok" width={20} height={20} className="h-5 w-5" />
            <Image src="/icons/meta-icon.svg" alt="Meta" width={20} height={20} className="h-5 w-5" />
          </div>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <div
                key={index}
                className="group relative rounded-2xl border border-neutral-200/80 bg-white/70 p-6 backdrop-blur transition-shadow hover:shadow-sm"
              >
                <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-neutral-900 group-hover:text-white">
                  <IconComponent className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-neutral-900">{card.title}</h3>
                <p className="mt-2 text-neutral-600 text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
