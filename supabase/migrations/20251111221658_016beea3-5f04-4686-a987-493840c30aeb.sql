-- Create waitlist_subscribers table
CREATE TABLE public.waitlist_subscribers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public to insert into waitlist (anyone can join)
CREATE POLICY "Allow public insert on waitlist_subscribers"
ON public.waitlist_subscribers
FOR INSERT
TO public
WITH CHECK (true);

-- Only admins can view waitlist subscribers
CREATE POLICY "Admins can view waitlist subscribers"
ON public.waitlist_subscribers
FOR SELECT
TO authenticated
USING ((SELECT auth.jwt() ->> 'is_admin') = 'true');

-- Only admins can update waitlist subscribers
CREATE POLICY "Admins can update waitlist subscribers"
ON public.waitlist_subscribers
FOR UPDATE
TO authenticated
USING ((SELECT auth.jwt() ->> 'is_admin') = 'true')
WITH CHECK ((SELECT auth.jwt() ->> 'is_admin') = 'true');

-- Only admins can delete waitlist subscribers
CREATE POLICY "Admins can delete waitlist subscribers"
ON public.waitlist_subscribers
FOR DELETE
TO authenticated
USING ((SELECT auth.jwt() ->> 'is_admin') = 'true');