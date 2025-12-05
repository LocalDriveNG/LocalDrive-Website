-- Fix RLS policies to use subquery pattern for better performance

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view waitlist subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can update waitlist subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can delete waitlist subscribers" ON public.waitlist_subscribers;

-- Recreate with optimized subquery pattern
CREATE POLICY "Admins can view waitlist subscribers" 
ON public.waitlist_subscribers 
FOR SELECT 
TO authenticated
USING ((((SELECT auth.jwt()) ->> 'is_admin') = 'true'));

CREATE POLICY "Admins can update waitlist subscribers" 
ON public.waitlist_subscribers 
FOR UPDATE 
TO authenticated
USING ((((SELECT auth.jwt()) ->> 'is_admin') = 'true'))
WITH CHECK ((((SELECT auth.jwt()) ->> 'is_admin') = 'true'));

CREATE POLICY "Admins can delete waitlist subscribers" 
ON public.waitlist_subscribers 
FOR DELETE 
TO authenticated
USING ((((SELECT auth.jwt()) ->> 'is_admin') = 'true'));