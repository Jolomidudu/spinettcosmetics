import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, status, total, created_at, order_items(title_snapshot, quantity, unit_price)",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Unable to load your orders" },
      { status: 500 },
    );
  }

  const orders = (data ?? []).map((order) => {
    const firstItem = order.order_items?.[0];
    return {
      id: order.id,
      status: order.status,
      total: Number(order.total ?? 0),
      created_at: order.created_at,
      title:
        firstItem?.title_snapshot ||
        (order.order_items?.length ? "Multiple items" : "Order"),
    };
  });

  return NextResponse.json({ orders });
}
