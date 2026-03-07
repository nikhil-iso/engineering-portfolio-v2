
-- Fix verify_admin_password to use schema-qualified crypt
CREATE OR REPLACE FUNCTION public.verify_admin_password(_password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  stored_hash TEXT;
  result BOOLEAN;
BEGIN
  SELECT value INTO stored_hash FROM public.admin_config WHERE key = 'admin_password_hash';
  
  result := stored_hash IS NOT NULL AND stored_hash = extensions.crypt(_password, stored_hash);
  
  IF NOT result THEN
    PERFORM pg_sleep(0.2);
  END IF;
  
  RETURN result;
END;
$function$;

-- Fix save_grid_layout to use schema-qualified crypt
CREATE OR REPLACE FUNCTION public.save_grid_layout(_id text, _layout jsonb, _admin_password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT value INTO stored_hash FROM public.admin_config WHERE key = 'admin_password_hash';
  
  IF stored_hash IS NULL OR stored_hash != extensions.crypt(_admin_password, stored_hash) THEN
    PERFORM pg_sleep(0.2);
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO public.grid_layouts (id, layout, updated_at)
  VALUES (_id, _layout, now())
  ON CONFLICT (id) DO UPDATE SET layout = _layout, updated_at = now();

  RETURN true;
END;
$function$;

-- Drop the temporary utility function
DROP FUNCTION IF EXISTS public.update_admin_password_from_secret(text);
