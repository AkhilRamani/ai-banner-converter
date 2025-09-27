"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, ArrowRight, Check, Sparkles, Zap, Shield, Users, Star } from "lucide-react";
import { getAllPlatforms, getFormFactorsByPlatform } from "@/lib/formats";

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Conversion",
      description: "Advanced AI analyzes your designs and intelligently adapts them to any platform format while preserving design integrity.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "Get perfectly formatted designs in seconds. No more manual resizing or worrying about aspect ratios.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Platform Optimized",
      description: "Each format is optimized for its specific platform with proper guidelines and best practices built-in.",
    },
  ];

  const platforms = getAllPlatforms();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Image Converter</h1>
                <p className="text-xs text-gray-600">Design for every platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                Powered by Gemini AI
              </Badge>
              <Link href="/convert">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-6 text-blue-800 bg-blue-100 hover:bg-blue-100">✨ New: AI-Powered Design Conversion</Badge>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 md:text-6xl">
              Convert Your Designs
              <span className="block text-blue-600">For Every Platform</span>
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
              Transform your Figma designs, graphics, and images into perfectly optimized formats for social media, websites, ads, and more. Our AI
              understands design principles and maintains your creative vision.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/convert">
                <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">
                  Start Converting
                  <Wand2 className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 py-3 text-lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute bg-blue-200 rounded-full top-20 left-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute delay-1000 bg-purple-200 rounded-full top-40 right-10 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute delay-500 bg-pink-200 rounded-full bottom-20 left-1/2 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Why Choose Our AI Converter?</h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Designed for designers, marketers, and businesses who need professional results without the hassle.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="transition-all duration-300 border-0 shadow-lg cursor-pointer hover:shadow-xl"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 transition-all duration-300 ${
                      hoveredFeature === index ? "bg-blue-600 text-white" : "text-blue-600"
                    }`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Supported Platforms</h2>
            <p className="text-lg text-gray-600">Convert your designs for all major platforms with optimized settings</p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            {platforms.map((platform, index) => (
              <Card key={platform} className="p-6 text-center transition-shadow hover:shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                    <span className="text-lg font-bold text-white">{platform.charAt(0)}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{platform}</h3>
                  <p className="mt-1 text-sm text-gray-600">{getFormFactorsByPlatform(platform).length} formats</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to Transform Your Designs?</h2>
          <p className="mb-8 text-xl text-blue-100">Join thousands of designers and marketers who trust our AI to optimize their visuals</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/convert">
              <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
                Start Converting Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg text-white border-white hover:bg-white hover:text-blue-600">
              View Examples
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-white bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">AI Image Converter</h3>
                <p className="text-sm text-gray-400">Design for every platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>© 2024 AI Image Converter</span>
              <span>•</span>
              <span>Powered by Gemini AI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
