import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const newPassword = Deno.env.get("ADMIN_PASSWORD");
  if (!newPassword) {
    return new Response("ADMIN_PASSWORD secret not set", { status: 500 });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error } = await supabase.rpc("update_admin_password_from_secret", {
    _new_password: newPassword,
  });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true, message: "Admin password rotated successfully" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
