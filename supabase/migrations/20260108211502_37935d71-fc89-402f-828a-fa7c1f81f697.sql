-- Add explicit SELECT policies to block anonymous access to sensitive tables
-- These tables already have admin SELECT policies, but we need a permissive policy base

-- For contact_submissions: Add a permissive SELECT policy for admins
-- (The existing one is RESTRICTIVE which may cause issues)
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (is_admin((SELECT auth.uid())));

-- For newsletter_subscribers: Recreate the SELECT policy properly
DROP POLICY IF EXISTS "Admins can view newsletter subscribers" ON public.newsletter_subscribers;
CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (is_admin((SELECT auth.uid())));

-- For waitlist_subscribers: Recreate the SELECT policy properly  
DROP POLICY IF EXISTS "Admins can view waitlist subscribers" ON public.waitlist_subscribers;
CREATE POLICY "Admins can view waitlist subscribers"
ON public.waitlist_subscribers
FOR SELECT
TO authenticated
USING (is_admin((SELECT auth.uid())));