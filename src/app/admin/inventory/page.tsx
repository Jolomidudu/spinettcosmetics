import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminInventory from "@/components/Admin/Inventory";

export default async function AdminInventoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  return <AdminInventory />;
}
