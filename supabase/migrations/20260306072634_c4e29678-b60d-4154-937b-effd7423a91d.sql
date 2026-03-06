-- Drop the function that uses current_setting (won't work)
DROP FUNCTION IF EXISTS public.save_grid_layout(TEXT, JSONB, TEXT);

-- Simpler: create function that takes a password and compares to a stored hash
-- We'll store the admin password hash in a config table
CREATE TABLE IF NOT EXISTS public.admin_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

ALTER TABLE public.admin_config ENABLE ROW LEVEL SECURITY;

-- No one can read admin_config directly
CREATE POLICY "No public access to admin_config"
ON public.admin_config FOR SELECT
TO anon, authenticated
USING (false);

-- Security definer function to save layout with password check
CREATE OR REPLACE FUNCTION public.save_grid_layout(
  _id TEXT,
  _layout JSONB,
  _admin_password TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT value INTO stored_hash FROM public.admin_config WHERE key = 'admin_password_hash';
  
  IF stored_hash IS NULL OR stored_hash != encode(digest(_admin_password, 'sha256'), 'hex') THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO public.grid_layouts (id, layout, updated_at)
  VALUES (_id, _layout, now())
  ON CONFLICT (id) DO UPDATE SET layout = _layout, updated_at = now();

  RETURN true;
END;
$$;

-- Also create a function to verify admin password (for UI unlock)
CREATE OR REPLACE FUNCTION public.verify_admin_password(_password TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  stored_hash TEXT;
BEGIN
  SELECT value INTO stored_hash FROM public.admin_config WHERE key = 'admin_password_hash';
  RETURN stored_hash IS NOT NULL AND stored_hash = encode(digest(_password, 'sha256'), 'hex');
END;
$$;