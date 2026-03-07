import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Verify service role key from Authorization header
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
  
  if (!token || token !== serviceRoleKey) {
    return new Response("Unauthorized", { status: 401 });
  }

  const newPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!newPassword) {
    return new Response("ADMIN_PASSWORD secret not set", { status: 500 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    serviceRoleKey
  );

  const { error } = await supabase.rpc("update_admin_password_from_secret", {
    _new_password: newPassword,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
