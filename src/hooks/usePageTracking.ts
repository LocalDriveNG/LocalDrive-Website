import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        const { error } = await supabase
          .from('page_visits')
          .insert({
            page_url: location.pathname,
            user_ip: null, // Will be handled server-side if needed
          });

        if (error && error.code !== '23505') { // Ignore duplicate entries
          console.error('Error tracking page visit:', error);
        }
      } catch (error) {
        console.error('Error tracking page visit:', error);
      }
    };

    trackPageVisit();
  }, [location.pathname]);
};