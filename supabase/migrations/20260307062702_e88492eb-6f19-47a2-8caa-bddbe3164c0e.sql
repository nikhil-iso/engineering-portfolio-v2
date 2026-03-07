
-- Create a SECURITY DEFINER function to update admin password hash
-- This is called by the rotate-admin-password edge function
CREATE OR REPLACE FUNCTION public.update_admin_password_from_secret(_new_password text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  UPDATE public.admin_config
  SET value = crypt(_new_password, gen_salt('bf', 12))
  WHERE key = 'admin_password_hash';
END;
$function$;
