# LocalDrive

LocalDrive is a modern driving education platform connecting learners with certified instructors for a seamless learning experience.

## Features

- **Find & Match**: Connect with top-rated certified instructors in your area
- **Book & Pay**: Schedule lessons and pay securely online
- **Learn & Track**: Monitor your progress and skills development
- **Dark/Light Mode**: Fully responsive design with theme support
- **Mobile Optimized**: Perfect experience across all devices

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn UI
- **Animations**: Framer Motion
- **Routing**: React Router DOM with hash link support
- **Backend**: Supabase (Database, Auth, Real-time)
- **Deployment**: Ready for production deployment

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd localdrive
```

2.Install dependencies:

```bash
npm install
```

3.Set up environment variables:

```bash
cp .env.example .env
```

Add your Supabase credentials to the `.env` file.

4.Start development server:

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```'

src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── assets/             # Images and static assets
├── integrations/       # Third-party integrations
└── index.css          # Global styles and design system
```

## Environment Variables

Required environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

## Features Implementation

## Responsive Design

- Mobile-first approach with Tailwind CSS
- Optimized for mobile, tablet, and desktop
- Precision section scrolling with header offset

## Animations

- Framer Motion integration for smooth animations
- Scroll-triggered animations for better UX
- Hover effects and micro-interactions

## Dark Mode

- System preference detection
- Manual toggle with persistent storage
- Comprehensive dark mode coverage for all components

## Backend Integration

- Supabase for real-time data
- Form submissions with validation
- Newsletter subscriptions
- Page visit tracking

## Deployment

The project is deployed on

- Netlify
?branch=[![Netlify Status](https://api.netlify.com/api/v1/badges/6063d7c2-61de-405e-a8d9-5a0d9ddafc76/deploy-status)](https://app.netlify.com/projects/localdriveapp/deploys)

Ensure environment variables are configured in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.
