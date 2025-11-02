import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { Sparkles, Play } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mt-14">
          <div className="max-w-2/3 flex flex-col text-center items-center">
            <div className="mb-6">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral-100 text-neutral-800">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Design Resizing
              </span>
            </div>
            <h1 className="text-4xl sm:text-4xl lg:text-5xl font-medium text-neutral-900 mb-6 leading-tight-">
              One Design.
              <br />
              <span className="text-blue-600-">Infinite Formats.</span>
            </h1>
            <p className="text-lg text-neutral-600 mb-8">
              Upload once — and let AI redesign your banner, ad, or social post for every platform. Content-aware resizing that looks like a human
              designer did it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-24">
              <Link href="/home">
                <ButtonCustom variant="main">
                  <Sparkles />
                  Try for Free
                </ButtonCustom>
              </Link>
              <ButtonCustom variant="outline">
                <Play />
                Watch Demo
              </ButtonCustom>
            </div>
          </div>

          <div className="relative">
            <div className="flex flex-wrap justify-center items-center gap-4 max-w-6xl">
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm self-end">
                <img src="/landing/google_ad.webp" alt="Google Ad" className="w-auto h-44 object-contain" />
              </div>
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm">
                <img src="/landing/instagram_post.webp" alt="Instagram Post" className="w-auto h-56 object-contain" />
              </div>
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm self-end">
                <img src="/landing/linkedin_cover.webp" alt="LinkedIn Cover" className="w-auto h-36 object-contain" />
              </div>
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm self-start">
                <img src="/landing/linkedin_post.webp" alt="LinkedIn Post" className="w-auto h-48 object-contain" />
              </div>
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm">
                <img src="/landing/original.jpg" alt="original" className="w-auto h-96 object-contain" />
              </div>
              <div className="bg-neutral-50 rounded-xl overflow-hidden shadow-sm self-start">
                <img src="/landing/youtube_thumbnail.webp" alt="YouTube Thumbnail" className="w-auto h-44 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
