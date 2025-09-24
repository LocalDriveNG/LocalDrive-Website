<<<<<<< HEAD
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2ee8f6a1-f34e-4fb7-9909-6a84a72649e6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2ee8f6a1-f34e-4fb7-9909-6a84a72649e6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2ee8f6a1-f34e-4fb7-9909-6a84a72649e6) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
=======
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

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd localdrive
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Add your Supabase credentials to the `.env` file.

4. Start development server:
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

```
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

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Optimized for mobile, tablet, and desktop
- Precision section scrolling with header offset

### Animations
- Framer Motion integration for smooth animations
- Scroll-triggered animations for better UX
- Hover effects and micro-interactions

### Dark Mode
- System preference detection
- Manual toggle with persistent storage
- Comprehensive dark mode coverage for all components

### Backend Integration
- Supabase for real-time data
- Form submissions with validation
- Newsletter subscriptions
- Page visit tracking

## Deployment

The project is ready for deployment on platforms like:
- Vercel
- Netlify
- AWS Amplify
- Any static hosting service

Ensure environment variables are configured in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary software. All rights reserved.
>>>>>>> 784f2bf7ba1d8f7b5216fb6e8c3dccb5fb0abbcb
