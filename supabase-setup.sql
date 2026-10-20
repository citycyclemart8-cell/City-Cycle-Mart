-- Run once in Supabase SQL Editor. Invite only the store owner in Authentication > Users;
-- disable public sign-ups. Every authenticated account is an administrator for this project.
create table if not exists public.products (
  id bigint primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  constraint products_data_id_matches check ((data->>'id')::bigint = id)
);

alter table public.products enable row level security;
revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products" on public.products for select to anon, authenticated using (true);
drop policy if exists "Signed-in admins can insert products" on public.products;
create policy "Signed-in admins can insert products" on public.products for insert to authenticated with check (true);
drop policy if exists "Signed-in admins can update products" on public.products;
create policy "Signed-in admins can update products" on public.products for update to authenticated using (true) with check (true);
drop policy if exists "Signed-in admins can delete products" on public.products;
create policy "Signed-in admins can delete products" on public.products for delete to authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 6291456, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = true, file_size_limit = 6291456,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif'];

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images" on storage.objects for select to public using (bucket_id = 'product-images');
drop policy if exists "Signed-in admins can upload product images" on storage.objects;
create policy "Signed-in admins can upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images');
drop policy if exists "Signed-in admins can update product images" on storage.objects;
create policy "Signed-in admins can update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images') with check (bucket_id = 'product-images');
drop policy if exists "Signed-in admins can delete product images" on storage.objects;
create policy "Signed-in admins can delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images');
