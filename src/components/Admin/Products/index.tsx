"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  slug: string;
  price: number;
  discounted_price: number | null;
  status: string;
  sku: string | null;
  category_id: string | null;
  product_media?: { storage_path: string }[];
};

type Category = { id: string; name: string };

type ProductForm = {
  title: string;
  slug: string;
  price: string;
  status: string;
  category_id: string;
  image_url: string;
};

const emptyForm: ProductForm = {
  title: "",
  slug: "",
  price: "",
  status: "draft",
  category_id: "",
  image_url: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);

  const loadCatalog = async () => {
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch("/api/admin/products"),
      fetch("/api/admin/categories"),
    ]);
    const productsResult = await productsResponse.json();
    const categoriesResult = await categoriesResponse.json();

    if (!productsResponse.ok || !categoriesResponse.ok) {
      setError(productsResult.error || categoriesResult.error || "Unable to load catalog");
      return;
    }

    setProducts(productsResult.products || []);
    setCategories(categoriesResult.categories || []);
  };

  useEffect(() => {
    loadCatalog();
  }, []);

  const saveProduct = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    const response = await fetch("/api/admin/products", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { ...form, image_url: undefined, id: editingId } : { ...form, image_url: undefined }),
    });
    const result = await response.json();

    if (!response.ok) {
      setError(result.error || "Unable to save product");
    } else {
      const productId = result.product?.id || editingId;
      if (imageFile && productId) {
        const uploadData = new FormData();
        uploadData.append("product_id", productId);
        uploadData.append("file", imageFile);
        const uploadResponse = await fetch("/api/admin/media", {
          method: "POST",
          body: uploadData,
        });
        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          setError(uploadResult.error || "Product saved, but image upload failed");
          setSaving(false);
          return;
        }

        const mediaResponse = await fetch("/api/admin/products", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: productId,
            title: form.title,
            slug: form.slug,
            price: form.price,
            status: form.status,
            category_id: form.category_id,
            image_url: uploadResult.publicUrl,
          }),
        });

        if (!mediaResponse.ok) {
          const mediaResult = await mediaResponse.json();
          setError(mediaResult.error || "Product saved, but media record failed");
          setSaving(false);
          return;
        }
      }

      setEditingId(null);
      setImageFile(null);
      setForm(emptyForm);
      await loadCatalog();
    }
    setSaving(false);
  };

  const editProduct = (product: Product) => {
    setEditingId(product.id);
    setForm({
      title: product.title,
      slug: product.slug,
      price: String(product.price),
      status: product.status,
      category_id: product.category_id || "",
      image_url: product.product_media?.[0]?.storage_path || "",
    });
    setImageFile(null);
    setError("");
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;

    setError("");
    const response = await fetch(`/api/admin/products?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    const result = response.status === 204 ? null : await response.json();

    if (!response.ok) {
      setError(result?.error || "Unable to delete product");
      return;
    }

    if (editingId === id) {
      setEditingId(null);
      setImageFile(null);
      setForm(emptyForm);
    }
    await loadCatalog();
  };

  return (
    <section className="bg-gray-2 py-16">
      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue">Operations</p>
            <h1 className="text-3xl font-semibold text-dark">Product management</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/inventory" className="rounded-md border border-gray-3 bg-white px-4 py-2 text-sm font-medium text-dark-2 shadow-1 hover:text-blue">Inventory</Link>
            <span className="rounded-md bg-white px-4 py-2 text-sm text-dark-2 shadow-1">{products.length} products</span>
          </div>
        </div>

        <div className="grid gap-7.5 lg:grid-cols-[360px_1fr]">
          <form onSubmit={saveProduct} className="rounded-xl bg-white p-6 shadow-1">
            <h2 className="mb-5 text-xl font-medium text-dark">{editingId ? "Edit product" : "Add product"}</h2>
            <div className="flex flex-col gap-4">
              <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Product title" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <input required value={form.slug} onChange={(event) => setForm({ ...form, slug: event.target.value })} placeholder="URL slug" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <input required min="0" step="0.01" type="number" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} placeholder="Price" className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue" />
              <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue"><option value="draft">Draft</option><option value="active">Active</option><option value="archived">Archived</option></select>
              <select value={form.category_id} onChange={(event) => setForm({ ...form, category_id: event.target.value })} className="rounded-md border border-gray-3 px-4 py-3 outline-none focus:border-blue"><option value="">No category</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select>
              <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setImageFile(event.target.files?.[0] || null)} className="rounded-md border border-gray-3 px-4 py-3 text-sm outline-none focus:border-blue" />
              {form.image_url && <p className="text-xs text-dark-2">Current image is set. Choose a new file to replace it.</p>}
              <button disabled={saving} className="rounded-md bg-blue px-5 py-3 font-medium text-white disabled:opacity-60">{saving ? "Saving..." : editingId ? "Save changes" : "Create product"}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setImageFile(null); setForm(emptyForm); }} className="rounded-md border border-gray-3 px-5 py-3 font-medium text-dark-2">Cancel edit</button>}
              {error && <p className="text-sm text-red">{error}</p>}
            </div>
          </form>

          <div className="overflow-hidden rounded-xl bg-white shadow-1">
            <div className="border-b border-gray-3 px-6 py-5"><h2 className="text-xl font-medium text-dark">Catalog</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-gray-1 text-dark-2"><tr><th className="px-6 py-4 font-medium">Product</th><th className="px-6 py-4 font-medium">SKU</th><th className="px-6 py-4 font-medium">Price</th><th className="px-6 py-4 font-medium">Status</th><th className="px-6 py-4 font-medium">Actions</th></tr></thead>
                <tbody>
                  {products.map((product) => <tr key={product.id} className="border-t border-gray-3"><td className="px-6 py-4"><p className="font-medium text-dark">{product.title}</p><p className="text-xs text-dark-2">/{product.slug}</p></td><td className="px-6 py-4 text-dark-2">{product.sku || "-"}</td><td className="px-6 py-4 text-dark">${Number(product.price).toFixed(2)}</td><td className="px-6 py-4 capitalize text-dark-2">{product.status}</td><td className="px-6 py-4"><div className="flex gap-3"><button type="button" onClick={() => editProduct(product)} className="font-medium text-blue hover:underline">Edit</button><button type="button" onClick={() => deleteProduct(product.id)} className="font-medium text-red hover:underline">Delete</button></div></td></tr>)}
                  {!products.length && <tr><td colSpan={5} className="px-6 py-10 text-center text-dark-2">No products found.</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
