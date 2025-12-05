-- Fix waitlist_subscribers RLS policies - change from RESTRICTIVE to PERMISSIVE

-- Drop existing RESTRICTIVE policies
DROP POLICY IF EXISTS "Allow public insert on waitlist_subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can view waitlist subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can update waitlist subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can delete waitlist subscribers" ON public.waitlist_subscribers;

-- Create PERMISSIVE policies (default behavior)
CREATE POLICY "Allow public insert on waitlist_subscribers" 
ON public.waitlist_subscribers 
FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "Admins can view waitlist subscribers" 
ON public.waitlist_subscribers 
FOR SELECT 
TO authenticated
USING (((SELECT (auth.jwt() ->> 'is_admin'::text)) = 'true'::text));

CREATE POLICY "Admins can update waitlist subscribers" 
ON public.waitlist_subscribers 
FOR UPDATE 
TO authenticated
USING (((SELECT (auth.jwt() ->> 'is_admin'::text)) = 'true'::text))
WITH CHECK (((SELECT (auth.jwt() ->> 'is_admin'::text)) = 'true'::text));

CREATE POLICY "Admins can delete waitlist subscribers" 
ON public.waitlist_subscribers 
FOR DELETE 
TO authenticated
USING (((SELECT (auth.jwt() ->> 'is_admin'::text)) = 'true'::text));