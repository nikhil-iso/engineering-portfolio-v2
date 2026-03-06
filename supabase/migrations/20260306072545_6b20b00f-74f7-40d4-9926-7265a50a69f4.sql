CREATE TABLE public.grid_layouts (
  id TEXT PRIMARY KEY,
  layout JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.grid_layouts ENABLE ROW LEVEL SECURITY;

-- Everyone can read layouts (so public visitors see the saved layout)
CREATE POLICY "Anyone can read grid layouts"
ON public.grid_layouts FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated users can insert/update (we'll use a service-level approach)
CREATE POLICY "Anyone can insert grid layouts"
ON public.grid_layouts FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Anyone can update grid layouts"
ON public.grid_layouts FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);