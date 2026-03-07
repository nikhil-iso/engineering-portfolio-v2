
-- Fix the update function to use schema-qualified pgcrypto functions
CREATE OR REPLACE FUNCTION public.update_admin_password_from_secret(_new_password text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
  UPDATE public.admin_config
  SET value = extensions.crypt(_new_password, extensions.gen_salt('bf', 12))
  WHERE key = 'admin_password_hash';
END;
$function$;
