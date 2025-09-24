import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageVisit = async () => {
      // Temporarily disabled to prevent RLS policy errors
      // TODO: Fix RLS policies for page_visits table
      return;
    };

    trackPageVisit();
  }, [location.pathname]);
};