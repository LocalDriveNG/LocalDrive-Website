-- Insert super_admin role for the specified user
INSERT INTO public.user_roles (user_id, role)
VALUES ('ec0250ba-fd1d-4880-88ff-5973a4d14d25', 'super_admin')
ON CONFLICT (user_id, role) DO NOTHING;