import { createClient } from "@supabase/supabase-js";
import type { Database, Json } from "@/integrations/supabase/types";

export async function fetchSiteContent(): Promise<Record<string, Json>> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return {};

  const client = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await client.from("site_content").select("key, value");
  if (error || !data) return {};

  const map: Record<string, Json> = {};
  for (const row of data) map[row.key] = row.value;
  return map;
}
