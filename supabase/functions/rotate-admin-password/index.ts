import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  // Only allow POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const authHeader = req.headers.get("authorization");
  if (!authHeader?.includes(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "")) {
    return new Response("Unauthorized", { status: 401 });
  }

  const newPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!newPassword) {
    return new Response("ADMIN_PASSWORD secret not set", { status: 500 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Update the password hash using bcrypt via crypt()
  const { error } = await supabase.rpc("update_admin_password_from_secret", {
    _new_password: newPassword,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
