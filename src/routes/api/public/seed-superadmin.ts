import { createFileRoute } from "@tanstack/react-router";

const EMAIL = "superadmin@superadmin.com";
const PASSWORD = "123456789";

export const Route = createFileRoute("/api/public/seed-superadmin")({
  server: {
    handlers: {
      POST: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const { data: existingRoles } = await supabaseAdmin
          .from("user_roles")
          .select("user_id")
          .eq("role", "superadmin");
        if (existingRoles && existingRoles.length > 0) {
          return Response.json({ ok: true, status: "already-seeded" });
        }

        let userId: string | null = null;
        const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
          email: EMAIL,
          password: PASSWORD,
          email_confirm: true,
        });
        if (created?.user) {
          userId = created.user.id;
        } else if (error) {
          const { data: list } = await supabaseAdmin.auth.admin.listUsers();
          userId = list?.users.find((u) => u.email === EMAIL)?.id ?? null;
        }
        if (!userId) return Response.json({ ok: false, error: "no user" }, { status: 500 });

        await supabaseAdmin.from("user_roles").insert({ user_id: userId, role: "superadmin" });
        return Response.json({ ok: true, status: "seeded" });
      },
    },
  },
});
