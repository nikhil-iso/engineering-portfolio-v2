-- Drop the permissive insert/update policies
DROP POLICY "Anyone can insert grid layouts" ON public.grid_layouts;
DROP POLICY "Anyone can update grid layouts" ON public.grid_layouts;

-- Create a security definer function to save layouts with password check
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
BEGIN
  -- Check admin password from vault/secrets
  IF _admin_password != current_setting('app.settings.admin_password', true) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO public.grid_layouts (id, layout, updated_at)
  VALUES (_id, _layout, now())
  ON CONFLICT (id) DO UPDATE SET layout = _layout, updated_at = now();

  RETURN true;
END;
$$;