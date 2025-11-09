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

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
                <Wand className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-neutral-900">Flexel</span>
            </div>

            <nav className="absolute items-center hidden gap-6 md:flex left-1/2 -translate-x-1/2">
              <Link href="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                Features
              </Link>
              <Link href="/home" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                Convert
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
                Pricing
              </Link>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/api/sign-in">
                <ButtonCustom variant="outline" size="sm">
                  Sign In
                </ButtonCustom>
              </Link>
              <Link href="/home">
                <ButtonCustom variant="main" size="sm">
                  Get Started
                </ButtonCustom>
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
