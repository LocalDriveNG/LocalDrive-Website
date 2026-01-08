-- Add email format validation constraints to prevent abuse
-- These tables intentionally allow public INSERT for forms, but we add email validation

-- Add email format check constraint to contact_submissions
ALTER TABLE public.contact_submissions
ADD CONSTRAINT contact_submissions_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add email format check constraint to newsletter_subscribers
ALTER TABLE public.newsletter_subscribers
ADD CONSTRAINT newsletter_subscribers_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add email format check constraint to waitlist_subscribers
ALTER TABLE public.waitlist_subscribers
ADD CONSTRAINT waitlist_subscribers_email_format 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');