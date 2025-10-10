export interface FormFactor {
  name: string;
  platform: string;
  width: number;
  height: number;
  aspectRatio: string;
  description: string;
}

export const FORM_FACTORS_BY_PLATFORM: Record<string, FormFactor[]> = {
  Instagram: [
    {
      name: "Instagram Post",
      platform: "Instagram",
      width: 1080,
      height: 1080,
      aspectRatio: "1:1",
      description: "Square format perfect for Instagram feed posts",
    },
    {
      name: "Instagram Story",
      platform: "Instagram",
      width: 1080,
      height: 1920,
      aspectRatio: "9:16",
      description: "Vertical format for Instagram Stories",
    },
  ],
  Facebook: [
    {
      name: "Facebook Post",
      platform: "Facebook",
      width: 1200,
      height: 630,
      aspectRatio: "1.91:1",
      description: "Horizontal format optimized for Facebook feed",
    },
    {
      name: "Facebook Cover",
      platform: "Facebook",
      width: 820,
      height: 312,
      aspectRatio: "2.63:1",
      description: "Cover photo for Facebook pages and profiles",
    },
  ],
  LinkedIn: [
    {
      name: "LinkedIn Post",
      platform: "LinkedIn",
      width: 1200,
      height: 627,
      aspectRatio: "1.91:1",
      description: "Professional format for LinkedIn feed posts",
    },
    {
      name: "LinkedIn Banner",
      platform: "LinkedIn",
      width: 1584,
      height: 396,
      aspectRatio: "4:1",
      description: "Professional banner for LinkedIn profiles",
    },
  ],
  "Twitter/X": [
    {
      name: "Twitter Post",
      platform: "Twitter/X",
      width: 1200,
      height: 675,
      aspectRatio: "16:9",
      description: "Horizontal format for Twitter/X posts",
    },
  ],
  YouTube: [
    {
      name: "YouTube Thumbnail",
      platform: "YouTube",
      width: 1280,
      height: 720,
      aspectRatio: "16:9",
      description: "Video thumbnail for YouTube videos",
    },
  ],
  Email: [
    {
      name: "Email Banner",
      platform: "Email",
      width: 600,
      height: 200,
      aspectRatio: "3:1",
      description: "Header banner for email marketing",
    },
  ],
  Website: [
    {
      name: "Website Hero",
      platform: "Website",
      width: 1920,
      height: 600,
      aspectRatio: "3.2:1",
      description: "Hero section banner for websites",
    },
  ],
  "Google Ads": [
    {
      name: "Google Display Ad",
      platform: "Google Ads",
      width: 300,
      height: 250,
      aspectRatio: "1.2:1",
      description: "Standard Google Display Network ad",
    },
  ],
  Meta: [
    {
      name: "Facebook News Feed Ad",
      platform: "Meta",
      width: 1200,
      height: 628,
      aspectRatio: "1.91:1",
      description: "Primary Facebook ad format for news feed",
    },
    {
      name: "Facebook Carousel Ad",
      platform: "Meta",
      width: 1080,
      height: 1080,
      aspectRatio: "1:1",
      description: "Square format for Facebook carousel ads",
    },
    {
      name: "Facebook Stories Ad",
      platform: "Meta",
      width: 1080,
      height: 1920,
      aspectRatio: "9:16",
      description: "Full-screen vertical ad for Facebook Stories",
    },
    {
      name: "Facebook Right Column Ad",
      platform: "Meta",
      width: 254,
      height: 133,
      aspectRatio: "1.91:1",
      description: "Compact sidebar ad format for Facebook",
    },
    {
      name: "Meta Audience Network",
      platform: "Meta",
      width: 300,
      height: 250,
      aspectRatio: "1.2:1",
      description: "Native ad format for mobile apps and websites",
    },
    {
      name: "Facebook Marketplace Ad",
      platform: "Meta",
      width: 1080,
      height: 1080,
      aspectRatio: "1:1",
      description: "Square format optimized for Facebook Marketplace",
    },
  ],
  Pinterest: [
    {
      name: "Pinterest Pin",
      platform: "Pinterest",
      width: 1000,
      height: 1500,
      aspectRatio: "2:3",
      description: "Vertical format for Pinterest pins",
    },
  ],
};

export const getFormFactor = (name: string): FormFactor | undefined => {
  for (const platformFormats of Object.values(FORM_FACTORS_BY_PLATFORM)) {
    const format = platformFormats.find((format) => format.name === name);
    if (format) return format;
  }
  return undefined;
};

export const getFormFactorsByPlatform = (platform: string): FormFactor[] => {
  return FORM_FACTORS_BY_PLATFORM[platform] || [];
};

export const getAllPlatforms = (): string[] => {
  return Object.keys(FORM_FACTORS_BY_PLATFORM);
};

export const getAllFormats = (): FormFactor[] => {
  return Object.values(FORM_FACTORS_BY_PLATFORM).flat();
};

// Map dimensions to format names for Convex data compatibility
export const getFormatNameFromDimensions = (width: number, height: number): string | undefined => {
  for (const platformFormats of Object.values(FORM_FACTORS_BY_PLATFORM)) {
    const format = platformFormats.find((format) => format.width === width && format.height === height);
    if (format) return format.name;
  }
  return undefined;
};

// Map dimension string (e.g., "1080x1920") to format name
export const getFormatNameFromDimensionString = (dimensionString: string): string | undefined => {
  const match = dimensionString.match(/^(\d+)x(\d+)$/);
  if (!match) return undefined;

  const width = parseInt(match[1], 10);
  const height = parseInt(match[2], 10);

  return getFormatNameFromDimensions(width, height);
};
