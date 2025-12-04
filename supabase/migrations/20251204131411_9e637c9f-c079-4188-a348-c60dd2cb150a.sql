-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is any admin type
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin', 'admin')
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Super admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role((SELECT auth.uid()), 'super_admin'));

CREATE POLICY "Super admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role((SELECT auth.uid()), 'super_admin'));

CREATE POLICY "Super admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role((SELECT auth.uid()), 'super_admin'));

-- Update existing table policies to use new role system
-- newsletter_subscribers
DROP POLICY IF EXISTS "Newsletter select admins" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter update admins" ON public.newsletter_subscribers;
DROP POLICY IF EXISTS "Newsletter delete admins" ON public.newsletter_subscribers;

CREATE POLICY "Admins can view newsletter subscribers"
ON public.newsletter_subscribers
FOR SELECT
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Admins can update newsletter subscribers"
ON public.newsletter_subscribers
FOR UPDATE
TO authenticated
USING (public.is_admin((SELECT auth.uid())))
WITH CHECK (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Super admins can delete newsletter subscribers"
ON public.newsletter_subscribers
FOR DELETE
TO authenticated
USING (public.has_role((SELECT auth.uid()), 'super_admin'));

-- waitlist_subscribers
DROP POLICY IF EXISTS "Admins can view waitlist subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can update waitlist subscribers" ON public.waitlist_subscribers;
DROP POLICY IF EXISTS "Admins can delete waitlist subscribers" ON public.waitlist_subscribers;

CREATE POLICY "Admins can view waitlist subscribers"
ON public.waitlist_subscribers
FOR SELECT
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Admins can update waitlist subscribers"
ON public.waitlist_subscribers
FOR UPDATE
TO authenticated
USING (public.is_admin((SELECT auth.uid())))
WITH CHECK (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Super admins can delete waitlist subscribers"
ON public.waitlist_subscribers
FOR DELETE
TO authenticated
USING (public.has_role((SELECT auth.uid()), 'super_admin'));

-- contact_submissions
DROP POLICY IF EXISTS "Contact select admins" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact update admins" ON public.contact_submissions;
DROP POLICY IF EXISTS "Contact delete admins" ON public.contact_submissions;

CREATE POLICY "Admins can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.is_admin((SELECT auth.uid())))
WITH CHECK (public.is_admin((SELECT auth.uid())));

CREATE POLICY "Super admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.has_role((SELECT auth.uid()), 'super_admin'));