"use client";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";

export const ProblemSection = () => {
  const words = ["campaign", "banner", "platform"];

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 bg-neutral-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-10 items-center">
          <div className="text-3xl lg:text-4xl font-medium text-neutral-900 leading-normal w-[60%] lg:w-[50%] shrink-0">
            Stop wasting hours redesigning and resizing every{" "}
            <ContainerTextFlip words={words} className="!text-3xl lg:!text-4xl font-medium py-1.5 rounded-xl pb-2.5" /> images.
          </div>
          <p className="text-base lg:text-xl mx-auto opacity-60">
            Skip the design tools. <br /> Just tell AI what to change, and it redesigns intelligently.
          </p>
        </div>
      </div>
    </section>
  );
};
