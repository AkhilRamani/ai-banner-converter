import { cn } from "@/lib/utils";

interface PlatformIconProps {
  platform: string;
  className?: string;
}

export const PlatformIcon = ({ platform, className }: PlatformIconProps) => {
  const iconMap: Record<string, string> = {
    Instagram: "/icons/instagram-icon.svg",
    Facebook: "/icons/fb-icon.svg",
    Meta: "/icons/meta-icon.svg",
    "Google Ads": "/icons/google-icon.svg",
    LinkedIn: "/icons/linkedin-icon.svg",
    "Twitter/X": "/icons/x-icon.svg",
    YouTube: "/icons/youtube-icon.svg",
    Pinterest: "/icons/pinterest-icon.svg",
    TikTok: "/icons/tiktok-icon.svg",
    Twitch: "/icons/twitch-icon.svg",
    Email: "/icons/google-icon.svg",
    Website: "/icons/google-icon.svg",
  };

  const iconSrc = iconMap[platform] || "/icons/google-icon.svg";

  return <img src={iconSrc} alt={`${platform} icon`} className={cn("w-4 h-4", className)} />;
};
