# AI Image Converter

A SaaS application that uses Google Gemini AI to intelligently convert and resize images for different social media platforms and marketing materials. Upload a single Figma-designed image and get optimized versions for LinkedIn, Facebook, Instagram, Google Ads, and more.

## Features

- **AI-Powered Analysis**: Uses Google Gemini 2.0 Flash to analyze image elements and layout
- **Smart Resizing**: Intelligently rearranges elements like a human designer would
- **Multiple Formats**: Support for 12+ platforms including:
  - Social Media: Instagram, Facebook, LinkedIn, Twitter/X, Pinterest
  - Marketing: Google Display Ads, Email Banners, Website Heroes
  - Professional: LinkedIn Banners, YouTube Thumbnails
- **Drag & Drop Upload**: Easy image upload with preview
- **Real-time Previews**: See how your image will look on each platform
- **Platform Guidelines**: Built-in best practices for each format

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI**: Google Gemini 2.0 Flash Image Preview
- **Image Processing**: Sharp
- **File Upload**: React Dropzone

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm package manager
- Google Gemini API key

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd ai-img-converter
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Add your Google Gemini API key to `.env.local`:

```env
GOOGLE_GEMINI_API_KEY=your_api_key_here
```

5. Run the development server:

```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Getting a Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## Usage

1. **Upload**: Drag and drop your Figma design or any image
2. **Select Formats**: Choose from available platform formats
3. **AI Processing**: The app analyzes your image and creates optimized versions
4. **Preview**: See real-time previews of each format
5. **Download**: Download the converted images for each platform

## Supported Formats

### Social Media

- **Instagram Post** (1080x1080) - Square format for feed posts
- **Instagram Story** (1080x1920) - Vertical format for stories
- **Facebook Post** (1200x630) - Horizontal format for feed
- **Facebook Cover** (820x312) - Cover photo for pages
- **LinkedIn Post** (1200x627) - Professional feed posts
- **LinkedIn Banner** (1584x396) - Profile banner
- **Twitter/X Post** (1200x675) - Horizontal format
- **Pinterest Pin** (1000x1500) - Vertical pins

### Marketing & Advertising

- **YouTube Thumbnail** (1280x720) - Video thumbnails
- **Email Banner** (600x200) - Email marketing headers
- **Website Hero** (1920x600) - Hero section banners
- **Google Display Ad** (300x250) - Standard display ads

## Architecture

### Core Components

- `src/lib/gemini.ts` - AI integration and image analysis
- `src/lib/formats.ts` - Platform specifications and guidelines
- `src/components/image-upload.tsx` - File upload with drag & drop
- `src/components/format-preview.tsx` - Format selection and previews
- `src/app/page.tsx` - Main application interface

### AI Processing Flow

1. **Image Analysis**: Gemini AI analyzes the uploaded image structure
2. **Layout Generation**: Creates optimized layouts for target platforms
3. **Element Repositioning**: Intelligently rearranges elements for new dimensions
4. **Preview Generation**: Creates preview images for user review

## Development

### Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
```

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── image-upload.tsx  # File upload component
│   └── format-preview.tsx # Format selection
└── lib/                  # Utility libraries
    ├── gemini.ts         # AI integration
    ├── formats.ts        # Platform definitions
    └── utils.ts          # Helper functions
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:

- Create an issue on GitHub
- Contact the development team

## Roadmap

- [ ] Batch processing for multiple images
- [ ] Custom format creation
- [ ] Advanced export options (PNG, JPG, WebP)
- [ ] User accounts and project management
- [ ] API integration for automated workflows
- [ ] Mobile app companion
# ai-banner-converter
