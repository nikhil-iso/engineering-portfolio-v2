
-- Ensure pgcrypto is available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Update the stored password hash to bcrypt
UPDATE public.admin_config
SET value = crypt('NikhilAdmin2024!', gen_salt('bf', 12))
WHERE key = 'admin_password_hash';

-- Replace verify_admin_password to use bcrypt + brute-force delay
CREATE OR REPLACE FUNCTION public.verify_admin_password(_password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  stored_hash TEXT;
  result BOOLEAN;
BEGIN
  SELECT value INTO stored_hash FROM public.admin_config WHERE key = 'admin_password_hash';
  
  result := stored_hash IS NOT NULL AND stored_hash = crypt(_password, stored_hash);
  
  IF NOT result THEN
    PERFORM pg_sleep(0.2);
  END IF;
  
  RETURN result;
END;
$function$;

-- Replace save_grid_layout to use bcrypt + brute-force delay
CREATE OR REPLACE FUNCTION public.save_grid_layout(_id text, _layout jsonb, _admin_password text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT value INTO stored_hash FROM public.admin_config WHERE key = 'admin_password_hash';
  
  IF stored_hash IS NULL OR stored_hash != crypt(_admin_password, stored_hash) THEN
    PERFORM pg_sleep(0.2);
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO public.grid_layouts (id, layout, updated_at)
  VALUES (_id, _layout, now())
  ON CONFLICT (id) DO UPDATE SET layout = _layout, updated_at = now();

  RETURN true;
END;
$function$;
