-- Drop existing policy and recreate as PERMISSIVE
DROP POLICY IF EXISTS "Admins can view contact submissions" ON public.contact_submissions;

-- Create PERMISSIVE SELECT policy for admins only
CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));