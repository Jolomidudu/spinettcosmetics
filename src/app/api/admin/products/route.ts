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
    .from("products")
    .select("id, title, slug, price, discounted_price, status, sku, category_id, product_media(id, storage_path, alt_text, sort_order), created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Unable to load products" }, { status: 500 });
  }

  return NextResponse.json({ products: data });
}

export async function POST(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? "").trim();
  const price = Number(body.price);

  if (!title || !slug || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Title, slug, and a valid non-negative price are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("products")
    .insert({
      title,
      slug,
      price,
      discounted_price: body.discounted_price ? Number(body.discounted_price) : null,
      sku: body.sku ? String(body.sku).trim() : null,
      description: body.description ? String(body.description).trim() : null,
      status: body.status === "active" || body.status === "archived" ? body.status : "draft",
      category_id: body.category_id || null,
    })
    .select("id, title, slug, price, discounted_price, status, sku, category_id, product_media(id, storage_path, alt_text, sort_order), created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (body.image_url) {
    await supabase.from("product_media").delete().eq("product_id", data.id).eq("sort_order", 0);
    const { error: mediaError } = await supabase.from("product_media").insert({
      product_id: data.id,
      storage_path: String(body.image_url).trim(),
      alt_text: title,
      sort_order: 0,
    });

    if (mediaError) {
      return NextResponse.json({ error: mediaError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ product: data }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const body = await request.json();
  const id = String(body.id ?? "").trim();
  const title = String(body.title ?? "").trim();
  const slug = String(body.slug ?? "").trim();
  const price = Number(body.price);

  if (!id || !title || !slug || !Number.isFinite(price) || price < 0) {
    return NextResponse.json(
      { error: "Product id, title, slug, and a valid non-negative price are required" },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("products")
    .update({
      title,
      slug,
      price,
      status: body.status === "active" || body.status === "archived" ? body.status : "draft",
      category_id: body.category_id || null,
    })
    .eq("id", id)
    .select("id, title, slug, price, discounted_price, status, sku, category_id, product_media(id, storage_path, alt_text, sort_order), created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  if (body.image_url) {
    await supabase.from("product_media").delete().eq("product_id", data.id).eq("sort_order", 0);
    const { error: mediaError } = await supabase.from("product_media").insert({
      product_id: data.id,
      storage_path: String(body.image_url).trim(),
      alt_text: title,
      sort_order: 0,
    });

    if (mediaError) {
      return NextResponse.json({ error: mediaError.message }, { status: 400 });
    }
  }

  return NextResponse.json({ product: data });
}

export async function DELETE(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Product id is required" }, { status: 400 });
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return new NextResponse(null, { status: 204 });
}
