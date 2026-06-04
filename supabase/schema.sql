-- Him Tatwa Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable Row Level Security
alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;

-- ═══════════════════════════════════════════
-- PROFILES (extends Supabase auth.users)
-- ═══════════════════════════════════════════
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ═══════════════════════════════════════════
-- PRODUCTS
-- ═══════════════════════════════════════════
create table if not exists public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  price integer not null,
  mrp integer not null,
  size text,
  supply_duration text,
  tag text,
  image_url text,
  images text[] default '{}',
  benefits text[] default '{}',
  ingredients text,
  usage_instructions text,
  certifications text[] default '{}',
  in_stock boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "Anyone can view products" on public.products
  for select using (true);

-- Insert products
insert into public.products (name, slug, description, short_description, price, mrp, size, supply_duration, tag, image_url, benefits, ingredients, usage_instructions, certifications) values
  ('Him Tatwa Liquid Shilajit — 30ml', 'him-tatwa-liquid-shilajit-30ml', 'Experience the purest form of Himalayan Shilajit, carefully sourced from altitudes above 16,000 feet.', 'Premium liquid Shilajit — 2-3 month supply', 1299, 1699, '30ml', '2–3 months', 'Most Popular', '/images/product-30ml.png', ARRAY['Boost Energy & Stamina','Enhance Brain Function','Increase Testosterone Naturally','Slow Aging & Rejuvenate','Easy Liquid Dropper — 3-5 drops daily'], 'Pure Himalayan Shilajit Extract — zero additives', 'Add 3–5 drops to warm water or milk daily', ARRAY['Lab Tested','FSSAI Certified','No Additives','GMP Certified']),
  ('Him Tatwa Liquid Shilajit — 15ml', 'him-tatwa-liquid-shilajit-15ml', 'The perfect introduction to Himalayan Shilajit in a convenient liquid dropper format.', 'Starter pack — 1-1.5 month supply', 799, 999, '15ml', '1–1.5 months', 'Starter Pack', '/images/product-15ml.png', ARRAY['Boost Energy & Stamina','Enhance Brain Function','Increase Testosterone Naturally','Slow Aging & Rejuvenate','Easy Liquid Dropper — 3-5 drops daily'], 'Pure Himalayan Shilajit Extract — zero additives', 'Add 3–5 drops to warm water or milk daily', ARRAY['Lab Tested','FSSAI Certified','No Additives','GMP Certified']);

-- ═══════════════════════════════════════════
-- ORDERS
-- ═══════════════════════════════════════════
create table if not exists public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  order_number text unique not null,
  items jsonb not null default '[]',
  subtotal integer not null,
  discount integer default 0,
  shipping integer default 0,
  total integer not null,
  status text default 'pending' check (status in ('pending','confirmed','shipped','delivered','cancelled')),
  payment_status text default 'pending' check (payment_status in ('pending','paid','failed','refunded')),
  payment_id text,
  razorpay_order_id text,
  shipping_address jsonb,
  coupon_code text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders" on public.orders
  for select using (auth.uid() = user_id);

create policy "Authenticated users can insert orders" on public.orders
  for insert with check (auth.uid() = user_id);

create policy "Service role can update orders" on public.orders
  for update using (true);

-- ═══════════════════════════════════════════
-- COUPONS
-- ═══════════════════════════════════════════
create table if not exists public.coupons (
  id uuid default gen_random_uuid() primary key,
  code text unique not null,
  discount_type text not null check (discount_type in ('percentage','fixed')),
  discount_value integer not null,
  min_order_value integer default 0,
  max_discount integer,
  usage_limit integer default 100,
  used_count integer default 0,
  is_active boolean default true,
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

alter table public.coupons enable row level security;

create policy "Anyone can read active coupons" on public.coupons
  for select using (is_active = true);

-- Sample coupon
insert into public.coupons (code, discount_type, discount_value, min_order_value, max_discount, usage_limit, expires_at) values
  ('WELCOME10', 'percentage', 10, 500, 200, 1000, '2027-12-31'::timestamptz),
  ('FLAT100', 'fixed', 100, 799, null, 500, '2027-12-31'::timestamptz);

-- ═══════════════════════════════════════════
-- ADDRESSES
-- ═══════════════════════════════════════════
create table if not exists public.addresses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  full_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text,
  city text not null,
  state text not null,
  pincode text not null,
  is_default boolean default false,
  created_at timestamptz default now()
);

alter table public.addresses enable row level security;

create policy "Users can manage own addresses" on public.addresses
  for all using (auth.uid() = user_id);
