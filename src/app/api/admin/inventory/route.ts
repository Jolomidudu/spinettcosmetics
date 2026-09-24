import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    .from("product_variants")
    .select("id, product_id, name, sku, price, stock_quantity, products(title)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Unable to load inventory" }, { status: 500 });
  }

  return NextResponse.json({ variants: data });
}

export async function POST(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const productId = String(body.product_id ?? "").trim();
  const name = String(body.name ?? "").trim();
  const stockQuantity = Number(body.stock_quantity ?? 0);

  if (!productId || !name || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
    return NextResponse.json(
      { error: "Product, variant name, and a non-negative whole-number stock quantity are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("product_variants")
    .insert({
      product_id: productId,
      name,
      sku: body.sku ? String(body.sku).trim() : null,
      price: body.price === "" || body.price == null ? null : Number(body.price),
      stock_quantity: stockQuantity,
    })
    .select("id, product_id, name, sku, price, stock_quantity, products(title)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ variant: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const id = String(body.id ?? "").trim();
  const stockQuantity = Number(body.stock_quantity);

  if (!id || !Number.isInteger(stockQuantity) || stockQuantity < 0) {
    return NextResponse.json(
      { error: "Variant id and a non-negative whole-number stock quantity are required" },
      { status: 400 },
    );
  }

  const { data: current, error: currentError } = await supabase
    .from("product_variants")
    .select("stock_quantity")
    .eq("id", id)
    .single();

  if (currentError || !current) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }

  const { data, error } = await supabase
    .from("product_variants")
    .update({ stock_quantity: stockQuantity })
    .eq("id", id)
    .select("id, product_id, name, sku, price, stock_quantity, products(title)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (stockQuantity !== current.stock_quantity) {
    await supabase.from("inventory_movements").insert({
      variant_id: id,
      quantity_delta: stockQuantity - current.stock_quantity,
      reason: "Admin stock adjustment",
    });
  }

  return NextResponse.json({ variant: data });
}
