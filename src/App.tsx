import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { usePageTracking } from "@/hooks/usePageTracking";
import ErrorBoundary from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiesPolicy = lazy(() => import("./pages/CookiesPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
        <BrowserRouter>
          <Suspense fallback={<MainLoading />}>
            <PageTransition>
              <div className="min-h-screen pt-16">
              <Routes>
                <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><AboutUs /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
                <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                <Route path="/cookies-policy" element={<PageWrapper><CookiesPolicy /></PageWrapper>} />
                <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
              </Routes>
              </div>
            </PageTransition>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;