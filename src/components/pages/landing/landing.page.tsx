"use client";

import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wand2,
  Play,
  Zap,
  Palette,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  Video,
  Crown,
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  // Pinterest,
  // Tiktok,
  Twitch,
  X,
} from "lucide-react";
import Link from "next/link";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-neutral-900">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">Flexel</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Pricing
              </Link>
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

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Design Resizing
                </span>
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
                One Design.
                <br />
                <span className="text-blue-600">Infinite Formats.</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                Upload once — and let AI redesign your banner, ad, or social post for every platform. Content-aware resizing that looks like a human
                designer did it.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="/home">
                  <ButtonCustom variant="main" size="lg" className="px-8 py-4 text-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Try for Free
                  </ButtonCustom>
                </Link>
                <ButtonCustom variant="outline" size="lg" className="px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </ButtonCustom>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-neutral-50 rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=800&fit=crop&crop=center"
                  alt="AI Design Resizing Interface"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-8">Stop wasting hours resizing every campaign image.</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-neutral-600">You design one hero banner… then spend hours tweaking 12 versions.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-neutral-600">Every platform needs a different aspect ratio.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-neutral-600">Text and elements break, logos go off-center, compositions get ruined.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-neutral-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-neutral-600">Your brand loses visual consistency.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-3xl p-8 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&h=600&fit=crop&crop=center"
                  alt="Designer working on multiple formats"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Meet your AI Design Resizer.</h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">The smartest way to adapt visuals for every platform.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-3">Content-aware resizing</h3>
              <p className="text-neutral-600">AI repositions key elements like text, logos, and subjects.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <CheckCircle className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-3">Platform presets</h3>
              <p className="text-neutral-600">Instagram, LinkedIn, YouTube, Google Ads, Facebook, X, Pinterest & more.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <ArrowRight className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-3">One-click exports</h3>
              <p className="text-neutral-600">Generate all formats in one go.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Palette className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-3">Smart layouts</h3>
              <p className="text-neutral-600">Maintain brand consistency automatically.</p>
            </div>
          </div>

          {/* Before & After Gallery */}
          <div className="bg-neutral-50 rounded-3xl p-12">
            <h3 className="text-2xl font-bold text-neutral-900 mb-12 text-center">Before & After Gallery</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400&h=400&fit=crop&crop=center"
                    alt="Original design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-neutral-600 text-center">Original Design</p>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=400&fit=crop&crop=center"
                    alt="Instagram format"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-neutral-600 text-center">Instagram Post</p>
              </div>
              <div className="space-y-4">
                <div className="aspect-square bg-white rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop&crop=center"
                    alt="LinkedIn format"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-neutral-600 text-center">LinkedIn Banner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Perfect for designers, marketers, and brand teams.</h2>
          <p className="text-xl text-neutral-600 mb-16 max-w-3xl mx-auto">
            Whether you create campaigns or manage visuals — our AI saves you hours every week.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Palette className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Designers</h3>
              <p className="text-neutral-600">Automate resizing without breaking your layout.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Marketers</h3>
              <p className="text-neutral-600">Repurpose assets instantly for every channel.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 text-center">
              <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Crown className="w-8 h-8 text-neutral-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">Agencies</h3>
              <p className="text-neutral-600">Deliver full campaigns faster with consistent branding.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">See how your design transforms.</h2>
          <p className="text-xl text-neutral-600 mb-16">It's not just resizing — it's rethinking your design.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "LinkedIn Cover", icon: Linkedin },
              { name: "Instagram Post", icon: Instagram },
              { name: "Story", icon: Instagram },
              { name: "YouTube Banner", icon: Youtube },
              { name: "Facebook Ad", icon: Facebook },
              { name: "Twitter Header", icon: X },
            ].map(({ name, icon: Icon }) => (
              <div key={name} className="bg-neutral-50 rounded-2xl p-6 hover:bg-neutral-100 transition-colors">
                <div className="aspect-square bg-white rounded-xl flex flex-col items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-neutral-600 mb-2" />
                  <span className="text-sm text-neutral-600 text-center font-medium">{name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Tease Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">Next: Bring your static designs to life.</h2>
          <p className="text-xl text-neutral-600 mb-8">
            We're building AI that can turn your image into a short animated video ad. Reuse your visual assets across every medium — image, motion,
            and beyond.
          </p>
          <ButtonCustom variant="main" size="lg" className="px-8 py-4">
            <Video className="w-5 h-5 mr-2" />
            Join waitlist for video generation
          </ButtonCustom>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-16">Designers are calling it their secret weapon.</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-50 rounded-3xl p-8">
                <div className="flex items-center mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-600 mb-6 italic">
                  "This saved me hours of layout tweaking every campaign. The AI somehow gets design composition. It's scary good."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-neutral-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-neutral-600 font-semibold text-sm">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Jane Designer</p>
                    <p className="text-sm text-neutral-600">Senior Designer at TechCorp</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-900 rounded-3xl p-12 text-white">
            <h3 className="text-2xl font-bold mb-6">Be among the first 100 creators shaping the future of AI-assisted design.</h3>
            <ButtonCustom variant="outline" className="bg-white text-neutral-900 hover:bg-neutral-50">
              Join Early Access
            </ButtonCustom>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">Start free. Pay when you publish.</h2>
          <p className="text-xl text-neutral-600 mb-16">Choose the plan that fits your workflow.</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Free</h3>
              <p className="text-neutral-600 mb-8">Perfect for trying it out</p>
              <div className="text-4xl font-bold text-neutral-900 mb-8">$0</div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>5 exports/month</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Basic platform support</span>
                </li>
              </ul>
              <ButtonCustom variant="outline" className="w-full">
                Get Started
              </ButtonCustom>
            </div>

            <div className="bg-blue-600 rounded-3xl p-8 text-white relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-neutral-900 text-white px-4 py-2 rounded-full text-sm font-medium">Most Popular</div>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-blue-100 mb-8">For growing teams</p>
              <div className="text-4xl font-bold mb-8">
                $19<span className="text-lg">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Unlimited resizing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>Brand presets</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-white" />
                  <span>All platforms</span>
                </li>
              </ul>
              <ButtonCustom variant="outline" className="w-full bg-white text-blue-600 hover:bg-neutral-50">
                Start Pro Trial
              </ButtonCustom>
            </div>

            <div className="bg-neutral-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">Agency</h3>
              <p className="text-neutral-600 mb-8">For large teams</p>
              <div className="text-4xl font-bold text-neutral-900 mb-8">
                $49<span className="text-lg">/month</span>
              </div>
              <ul className="text-left space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Team workspace</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Batch processing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Priority support</span>
                </li>
              </ul>
              <ButtonCustom variant="outline" className="w-full">
                Contact Sales
              </ButtonCustom>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Turn one design into every format — in seconds.</h2>
          <p className="text-xl mb-12 opacity-90">Trusted by designers, agencies, and marketing teams to automate campaign resizing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/home">
              <ButtonCustom variant="outline" size="lg" className="bg-white text-neutral-900 hover:bg-neutral-50 px-8 py-4">
                Start Free
              </ButtonCustom>
            </Link>
            <ButtonCustom variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8 py-4">
              Join Early Access
            </ButtonCustom>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-neutral-800">
                  <Wand2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Flexel</span>
              </div>
              <p className="text-neutral-400">AI-powered design resizer for modern creators.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="#features" className="hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white transition-colors">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/help" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800">
            <p className="text-neutral-400">© 2024 Flexel — Made with ❤️ for creators</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
