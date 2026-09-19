import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, title, slug, description, price, discounted_price, sku, size, routine_step, finish, ingredients, benefits, skin_types, concerns, labels, categories(name, slug), product_media(storage_path, alt_text, sort_order)",
    )
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Unable to load products" },
      { status: 500 },
    );
  }

  return NextResponse.json({ products: data });
}
