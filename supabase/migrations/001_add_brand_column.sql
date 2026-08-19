-- Multi-brand support.
--
-- The same codebase is deployed under several brands, all writing to this one
-- database. Each row records which deployment produced it so an admin dashboard
-- can show its own submissions (or all of them, via ?scope=all).
--
-- RUN THIS BEFORE DEPLOYING ANY BRAND. The API routes log Supabase insert
-- errors but still return 201, so deploying first would make submissions
-- disappear silently while the visitor sees a success message.
--
-- Existing rows predate the second brand, so they default to first-of-all.

alter table public.reservations
  add column if not exists brand text not null default 'first-of-all';

alter table public.waitlist
  add column if not exists brand text not null default 'first-of-all';

create index if not exists reservations_brand_idx on public.reservations (brand);
create index if not exists waitlist_brand_idx on public.waitlist (brand);
