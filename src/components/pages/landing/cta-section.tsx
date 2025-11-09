import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const CtaSection = () => {
  return (
    <section className="relative py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute *:absolute inset-0 h-full w-full saturate-200-">
        <div className="bg-gradient-to-tr from-neutral-100 to-blue-200/30 h-[80%] w-[60%] md:w-[20%] blur-3xl" />
        <div className="bottom-0 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-red-100 to-blue-300/20 h-[30%] w-[40%] blur-3xl float-right" />
        <div className="right-0 bottom-0 translate-x-1/2 translate-y-1/2 bg-gradient-to-tr from-red-100/40 to-yellow-300/10 h-[100%] w-[40%] blur-3xl" />
        <div className="right-0 top-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-200/15 to-orange-300/10 h-[90%] w-[35%] blur-3xl" />
      </div>
      <div className="text-center rounded-4xl z-10 relative">
        <h2 className="text-3xl md:text-5xl font-medium mb-6 md:mb-10">The fastest way to build every banners</h2>
        <p className="text-sm md:text-xl mb-6 md:mb-8 opacity-70">
          Trusted by designers, agencies, and marketing
          <br /> teams to automate campaign resizing.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/home">
            <ButtonCustom variant="main" className="">
              Start Free <ArrowRight />
            </ButtonCustom>
          </Link>
        </div>
      </div>
    </section>
  );
};
