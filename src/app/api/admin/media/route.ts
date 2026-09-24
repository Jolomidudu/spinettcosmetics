import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxFileSize = 5 * 1024 * 1024;

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

export async function POST(request: Request) {
  const { supabase, response } = await requireAdmin();
  if (response) return response;

  const formData = await request.formData();
  const productId = String(formData.get("product_id") ?? "").trim();
  const file = formData.get("file");

  if (!productId || !(file instanceof File)) {
    return NextResponse.json({ error: "Product and image file are required" }, { status: 400 });
  }

  if (!allowedTypes.has(file.type) || file.size > maxFileSize) {
    return NextResponse.json({ error: "Use a JPG, PNG, WEBP, or AVIF image up to 5 MB" }, { status: 400 });
  }

  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `${productId}/${crypto.randomUUID()}.${extension}`;
  const contents = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from("product-media")
    .upload(path, contents, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 });
  }

  const { data } = supabase.storage.from("product-media").getPublicUrl(path);
  return NextResponse.json({ path, publicUrl: data.publicUrl }, { status: 201 });
}
