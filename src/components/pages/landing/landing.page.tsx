"use client";

import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { Wand2, Star, Video, Wand } from "lucide-react";
import Link from "next/link";
import { HeroSection } from "./hero-section";
import { Footer } from "./footer";
import { PricingSection } from "./pricing-section";
import { UseCasesSection } from "./use-cases-section";
import { SolutionSection } from "./solution-section";
import { TestimonialsSection } from "./testimonials-section";
import { FutureTeaseSection } from "./future-tease-section";
import { ProblemSection } from "./problem-section";
import { CtaSection } from "./cta-section";
import { LandingNavbar } from "./landing-navbar";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <HeroSection />

      <ProblemSection />

      <SolutionSection />

      <UseCasesSection />

      <FutureTeaseSection />

      {/* <TestimonialsSection /> */}

      <PricingSection />

      {/* Final CTA Section */}
      <CtaSection />

      <Footer />
    </div>
  );
};
