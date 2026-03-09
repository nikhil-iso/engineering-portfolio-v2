
-- Drop RPC functions
DROP FUNCTION IF EXISTS public.save_grid_layout(_admin_password text, _id text, _layout jsonb);
DROP FUNCTION IF EXISTS public.verify_admin_password(_password text);

-- Drop tables
DROP TABLE IF EXISTS public.admin_config;
DROP TABLE IF EXISTS public.grid_layouts;
DROP TABLE IF EXISTS public.contact_submissions;

-- Drop policies (will be auto-dropped with tables, but just in case)
