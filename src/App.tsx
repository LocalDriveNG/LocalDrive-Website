import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { usePageTracking } from "@/hooks/usePageTracking";
import ErrorBoundary from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import SEO from "@/components/SEO"

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminAuth = lazy(() => import("./pages/AdminAuth"));
const DashboardOverview = lazy(() => import("./pages/dashboard/DashboardOverview"));
const NewsletterDashboard = lazy(() => import("./pages/dashboard/NewsletterDashboard"));
const WaitlistDashboard = lazy(() => import("./pages/dashboard/WaitlistDashboard"));
const ContactsDashboard = lazy(() => import("./pages/dashboard/ContactsDashboard"));
const UserManagement = lazy(() => import("./pages/dashboard/UserManagement"));

// Loading components
const MainLoading = () => (
  <div className="flex justify-center items-center min-h-screen bg-background">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-muted-foreground">Loading application...</p>
    </div>
  </div>
);

const PageLoading = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Page wrapper with error boundary
const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorBoundary fallback={
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center p-6">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-xl font-semibold mb-2">Page failed to load</h2>
        <p className="text-muted-foreground mb-4">There was an error loading this page.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  }>
    <Suspense fallback={<PageLoading />}>
      {children}
    </Suspense>
  </ErrorBoundary>
);

// Page transition wrapper
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  usePageTracking();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="animate-fade-in">
      {children}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary fallback={
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-6">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Application Error</h1>
        <p className="text-muted-foreground mb-4">Something went wrong with the application.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Restart Application
        </button>
      </div>
    </div>
  }>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CookieConsent />
          <Suspense fallback={<MainLoading />}>
            <PageTransition>
              <Routes>
                {/* Admin Routes - no pt-16 */}
                <Route path="/admin" element={<PageWrapper><AdminAuth /></PageWrapper>} />
                <Route path="/dashboard" element={<PageWrapper><DashboardOverview /></PageWrapper>} />
                <Route path="/dashboard/newsletter" element={<PageWrapper><NewsletterDashboard /></PageWrapper>} />
                <Route path="/dashboard/waitlist" element={<PageWrapper><WaitlistDashboard /></PageWrapper>} />
                <Route path="/dashboard/contacts" element={<PageWrapper><ContactsDashboard /></PageWrapper>} />
                <Route path="/dashboard/users" element={<PageWrapper><UserManagement /></PageWrapper>} />
                
                {/* Public Routes */}
                <Route path="/" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><Index /></PageWrapper></div>} />
                <Route path="/about" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><AboutUs /></PageWrapper></div>} />
                <Route path="/contact" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><Contact /></PageWrapper></div>} />
                <Route path="/blog" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><Blog /></PageWrapper></div>} />
                <Route path="/blog/:slug" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><BlogPost /></PageWrapper></div>} />
                <Route path="/privacy-policy" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><PrivacyPolicy /></PageWrapper></div>} />
                <Route path="/terms-of-service" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><TermsOfService /></PageWrapper></div>} />
                <Route path="/cookies-policy" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><CookiesPolicy /></PageWrapper></div>} />
                <Route path="/unsubscribe" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><Unsubscribe /></PageWrapper></div>} />
                <Route path="/waitlist" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><Waitlist /></PageWrapper></div>} />
                <Route path="*" element={<div className="min-h-screen pt-16"><SEO /><PageWrapper><NotFound /></PageWrapper></div>} />
              </Routes>
            </PageTransition>
          </Suspense>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;