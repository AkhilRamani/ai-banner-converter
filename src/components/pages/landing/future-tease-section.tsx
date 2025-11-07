"use client";

import { Video, Play, Sparkles } from "lucide-react";
import { ButtonCustom } from "@/components/ui/custom/button-custom";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AiSparklesIcon } from "@/lib/icons/ai-sparkles";

export const FutureTeaseSection = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-24 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-neutral-50 via-white to-neutral-100" />
      <div
        className="pointer-events-none absolute -z-10 left-1/2 top-[-120px] h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl"
        aria-hidden="true"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-center">
          <div>
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-neutral-100 text-neutral-800">
                <Video className="w-4 h-4 mr-2" />
                Coming Soon
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] font-medium text-neutral-900 mb-4 md:mb-6 leading-tight">
              Next: From Static To Motion
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-neutral-600 mb-6 md:mb-8">
              Turn any resized design into a platform-ready video. Smart motion presets, auto timing, and export-perfect aspect ratios — in one click.
            </p>
            <ul className="text-neutral-700 mb-8 md:mb-10 space-y-3 text-xs md:text-sm lg:text-base">
              <li className="flex items-start gap-3">
                <AiSparklesIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                <span>Auto-animate layers and text with tasteful, brand-safe motion.</span>
              </li>
              <li className="flex items-start gap-3">
                <Video className="w-5 h-5 text-blue-600 stroke-0 fill-blue-600 mt-0.5" />
                <span>Output vertical, square, and widescreen cuts instantly.</span>
              </li>
              <li className="flex items-start gap-3">
                <Play className="w-5 h-5 fill-blue-600 stroke-0 mt-0.5" />
                <span>Export ready-to-post MP4s optimized per platform.</span>
              </li>
            </ul>

            <ButtonCustom variant="main" className="w-full md:w-auto">
              <Video className="w-5 h-5" />
              Join Waitlist for Video
            </ButtonCustom>
          </div>

          <div id="future-tease-video" className="w-full flex gap-4 md:gap-6 lg:gap-10 justify-between items-end">
            <Image src="/landing/original.jpg" alt="original" width={400} height={300} className="shrink max-w-2/5 h-min rounded-xl" />
            <div className="rounded-2xl overflow-hidden bg-neutral-200 md:max-w-[24rem] lg:max-w-[22rem] shrink-0 grow">
              <AspectRatio ratio={9 / 16}>
                <iframe
                  src="https://player.vimeo.com/video/1133459088?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1&controls=0"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full"
                  title="video-feature-teaser"
                />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
