import { ButtonCustom } from "@/components/ui/custom/button-custom";
import { AiSparklesIcon } from "@/lib/icons/ai-sparkles";
import { Sparkles, Play } from "lucide-react";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <section className="pt-24 pb-28 px-4 sm:px-6 lg:px-8">
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

            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link href="/home">
                <ButtonCustom variant="main">
                  <AiSparklesIcon />
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
            <div className="group flex flex-wrap justify-center items-center gap-4 max-w-7xl [&>img]:grayscale-100 [&>img]:hover:grayscale-0 [&>img]:transition-[filter] [&>img]:duration-500">
              <img src="/landing/google_ad.webp" alt="Google Ad" className="w-auto h-44 object-contain rounded-xl shadow-sm self-end peer" />
              <img
                src="/landing/instagram_post.webp"
                alt="Instagram Post"
                className="w-auto h-56 object-contain rounded-xl shadow-sm self-end peer"
              />
              {/* <div className="w-54 h-96 rounded-2xl overflow-hidden bg-neutral-100 object-contain shadow-sm transition-[filter] duration-500 group-has-[img:hover]:grayscale">
                <iframe
                  src="https://player.vimeo.com/video/1133459088?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full"
                  title="demo-vertical-video-1"
                />
              </div> */}
              <div className="w-54 h-96 rounded-2xl overflow-hidden bg-neutral-200 object-contain shadow-sm transition-[filter] duration-500 group-has-[img:hover]:grayscale">
                <iframe
                  src="https://player.vimeo.com/video/1133459088?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;autoplay=1&amp;muted=1&amp;loop=1&amp;controls=0"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full opacity-0 blur-xl animate-[fadeIn_1.2s_ease-out_1s_forwards]"
                  title="demo-vertical-video-1"
                />
              </div>
              <style jsx>{`
                @keyframes fadeIn {
                  to {
                    opacity: 1;
                    filter: blur(0);
                  }
                }
              `}</style>
              <img
                src="/landing/youtube_thumbnail.webp"
                alt="YouTube Thumbnail"
                className="w-auto h-44 object-contain self-end rounded-xl shadow-sm peer"
              />
              <img
                src="/landing/linkedin_post.webp"
                alt="LinkedIn Post"
                className="w-auto h-48 object-contain rounded-xl shadow-sm self-start peer"
              />
              <img src="/landing/instagram_story.webp" alt="original" className="w-auto h-96 object-contain rounded-xl shadow-sm peer" />
              <img
                src="/landing/linkedin_cover.webp"
                alt="LinkedIn Cover"
                className="w-auto h-36 object-contain rounded-xl shadow-sm self-start peer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
{
  /* <img src="/landing/original.jpg" alt="original" className="w-auto h-96 object-contain rounded-xl shadow-sm" /> */
}
