create extension if not exists "pgcrypto";

create type public.user_role as enum ('customer', 'admin');
create type public.product_status as enum ('draft', 'active', 'archived');
create type public.order_status as enum ('pending', 'paid', 'processing', 'packed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text not null unique,
  description text,
  status public.product_status not null default 'draft',
  price numeric(12,2) not null check (price >= 0),
  discounted_price numeric(12,2) check (discounted_price is null or discounted_price >= 0),
  sku text unique,
  routine_step text,
  finish text,
  ingredients text[] not null default '{}',
  benefits text[] not null default '{}',
  skin_types text[] not null default '{}',
  concerns text[] not null default '{}',
  labels text[] not null default '{}',
  size text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_variants (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  name text not null,
  sku text unique,
  price numeric(12,2) check (price is null or price >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  created_at timestamptz not null default now()
);

create table public.product_media (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text,
  full_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text,
  postal_code text,
  country text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status public.order_status not null default 'pending',
  currency text not null default 'USD',
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  shipping_total numeric(12,2) not null default 0 check (shipping_total >= 0),
  tax_total numeric(12,2) not null default 0 check (tax_total >= 0),
  discount_total numeric(12,2) not null default 0 check (discount_total >= 0),
  total numeric(12,2) not null default 0 check (total >= 0),
  shipping_address jsonb,
  payment_reference text,
  tracking_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  variant_id uuid references public.product_variants(id) on delete set null,
  title_snapshot text not null,
  unit_price numeric(12,2) not null check (unit_price >= 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now()
);

create table public.inventory_movements (
  id uuid primary key default gen_random_uuid(),
  variant_id uuid not null references public.product_variants(id) on delete cascade,
  quantity_delta integer not null,
  reason text not null,
  order_id uuid references public.orders(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value numeric(12,2) not null check (discount_value > 0),
  active boolean not null default true,
  starts_at timestamptz,
  ends_at timestamptz,
  usage_limit integer,
  usage_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create index products_status_idx on public.products(status);
create index products_category_idx on public.products(category_id);
create index product_media_product_idx on public.product_media(product_id, sort_order);
create index orders_user_idx on public.orders(user_id, created_at desc);
create index orders_status_idx on public.orders(status, created_at desc);
create index order_items_order_idx on public.order_items(order_id);

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_media enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.inventory_movements enable row level security;
alter table public.coupons enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where profiles.id = auth.uid() and profiles.role = 'admin'
  );
$$;

create policy "Anyone can view active products"
  on public.products for select using (status = 'active');
create policy "Admins can manage products"
  on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "Anyone can view categories"
  on public.categories for select using (true);
create policy "Admins can manage categories"
  on public.categories for all using (public.is_admin()) with check (public.is_admin());
create policy "Anyone can view active product media"
  on public.product_media for select using (
    exists (select 1 from public.products where products.id = product_media.product_id and products.status = 'active')
  );
create policy "Admins can manage product media"
  on public.product_media for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage product variants"
  on public.product_variants for all using (public.is_admin()) with check (public.is_admin());
create policy "Users can view their profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update their profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Admins can manage profiles"
  on public.profiles for all using (public.is_admin()) with check (public.is_admin());
create policy "Users can manage their addresses"
  on public.addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Admins can manage addresses"
  on public.addresses for all using (public.is_admin()) with check (public.is_admin());
create policy "Users can view their orders"
  on public.orders for select using (auth.uid() = user_id);
create policy "Admins can manage orders"
  on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "Users can view their order items"
  on public.order_items for select using (
    exists (select 1 from public.orders where orders.id = order_items.order_id and orders.user_id = auth.uid())
  );
create policy "Admins can manage order items"
  on public.order_items for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage inventory movements"
  on public.inventory_movements for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage coupons"
  on public.coupons for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins can manage site settings"
  on public.site_settings for all using (public.is_admin()) with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('product-media', 'product-media', true)
on conflict (id) do nothing;

create policy "Anyone can view product media files"
  on storage.objects for select using (bucket_id = 'product-media');
create policy "Admins can upload product media files"
  on storage.objects for insert with check (bucket_id = 'product-media' and public.is_admin());
create policy "Admins can update product media files"
  on storage.objects for update using (bucket_id = 'product-media' and public.is_admin());
create policy "Admins can delete product media files"
  on storage.objects for delete using (bucket_id = 'product-media' and public.is_admin());

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();
