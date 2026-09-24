"use client";

import { FormEvent, useEffect, useState } from "react";

type Product = { id: string; title: string };
type Variant = {
  id: string;
  product_id: string;
  name: string;
  sku: string | null;
  price: number | null;
  stock_quantity: number;
  products?: { title?: string } | null;
};

export default function AdminInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [form, setForm] = useState({ product_id: "", name: "", sku: "", price: "", stock_quantity: "0" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const [productsResponse, inventoryResponse] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/inventory"),
    ]);
    const productsResult = await productsResponse.json();
    const inventoryResult = await inventoryResponse.json();

    if (!productsResponse.ok || !inventoryResponse.ok) {
      setError(productsResult.error || inventoryResult.error || "Unable to load inventory");
      return;
    }

    setProducts(productsResult.products || []);
    setVariants(inventoryResult.variants || []);
    if (!form.product_id && productsResult.products?.[0]) {
      setForm((current) => ({ ...current, product_id: productsResult.products[0].id }));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const createVariant = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/admin/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to create variant");
    } else {
      setForm((current) => ({ ...current, name: "", sku: "", price: "", stock_quantity: "0" }));
      await load();
    }
    setSaving(false);
  };

  const updateStock = async (variant: Variant) => {
    const value = window.prompt("New stock quantity", String(variant.stock_quantity));
    if (value === null) return;

    const response = await fetch("/api/admin/inventory", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: variant.id, stock_quantity: value }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to update stock");
      return;
    }
    await load();
  };

  return (
    <section className="bg-gray-2 py-16">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue">Operations</p>
          <h1 className="text-3xl font-semibold text-dark">Inventory management</h1>
        </div>

        <div className="grid gap-7.5 lg:grid-cols-[360px_1fr]">
          <form onSubmit={createVariant} className="rounded-xl bg-white p-6 shadow-1">
            <h2 className="mb-5 text-xl font-medium text-dark">Add variant</h2>
            <div className="flex flex-col gap-4">
              <select
                required
                value={form.product_id}
                onChange={(event) => setForm({ ...form, product_id: event.target.value })}
                className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue"
              >
                <option value="">Select product</option>
                {products.map((product) => <option key={product.id} value={product.id}>{product.title}</option>)}
              </select>
              <input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Variant name" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <input value={form.sku} onChange={(event) => setForm({ ...form, sku: event.target.value })} placeholder="SKU" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <input min="0" step="0.01" type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Variant price (optional)" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <input required min="0" step="1" type="number" value={form.stock_quantity} onChange={(event) => setForm({ ...form, stock_quantity: event.target.value })} placeholder="Stock quantity" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <button disabled={saving} className="rounded-md bg-blue px-5 py-3 font-medium text-white disabled:opacity-60">{saving ? "Saving..." : "Add variant"}</button>
              {error && <p className="text-sm text-red">{error}</p>}
            </div>
          </form>

          <div className="overflow-hidden rounded-xl bg-white shadow-1">
            <div className="border-b border-gray-3 px-6 py-5"><h2 className="text-xl font-medium text-dark">Stock levels</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-gray-1 text-dark-2"><tr><th className="px-6 py-4 font-medium">Product</th><th className="px-6 py-4 font-medium">Variant</th><th className="px-6 py-4 font-medium">SKU</th><th className="px-6 py-4 font-medium">Stock</th><th className="px-6 py-4 font-medium">Action</th></tr></thead>
                <tbody>
                  {variants.map((variant) => <tr key={variant.id} className="border-t border-gray-3"><td className="px-6 py-4 text-dark">{variant.products?.title || "Product"}</td><td className="px-6 py-4 text-dark-2">{variant.name}</td><td className="px-6 py-4 text-dark-2">{variant.sku || "-"}</td><td className={`px-6 py-4 font-medium ${variant.stock_quantity === 0 ? "text-red" : "text-dark"}`}>{variant.stock_quantity}</td><td className="px-6 py-4"><button type="button" onClick={() => updateStock(variant)} className="font-medium text-blue hover:underline">Adjust stock</button></td></tr>)}
                  {!variants.length && <tr><td colSpan={5} className="px-6 py-10 text-center text-dark-2">No variants found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
