import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { supabase, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || profile?.role !== "admin") {
    return { supabase, response: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { supabase, response: null };
}

export async function GET() {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, description")
    .order("name");

  if (error) return NextResponse.json({ error: "Unable to load categories" }, { status: 500 });
  return NextResponse.json({ categories: data });
}

export async function POST(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const slug = String(body.slug ?? "").trim();

  if (!name || !slug) {
    return NextResponse.json({ error: "Category name and slug are required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("categories")
    .insert({ name, slug, description: body.description ? String(body.description).trim() : null })
    .select("id, name, slug, description")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ category: data }, { status: 201 });
}
