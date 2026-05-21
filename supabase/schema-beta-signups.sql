-- Early access signups (Radar AI, RetainIQ) — marketing site
-- Run in Supabase SQL Editor after linking the project.

create table if not exists public.beta_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  first_name text not null,
  last_name text,
  company text,
  email text not null,

  product_interest text not null
    constraint beta_signups_product_interest_check
    check (product_interest in ('Radar AI', 'RetainIQ')),

  source_page text,
  utm_source text,
  utm_campaign text,
  utm_medium text
);

comment on table public.beta_signups is 'Early access requests from Talents Radar marketing site.';
comment on column public.beta_signups.product_interest is 'Radar AI | RetainIQ';

create index if not exists beta_signups_created_at_idx on public.beta_signups (created_at desc);
create index if not exists beta_signups_product_interest_idx on public.beta_signups (product_interest);
create index if not exists beta_signups_email_idx on public.beta_signups (lower(email));

alter table public.beta_signups enable row level security;

drop policy if exists "beta_signups_anon_insert" on public.beta_signups;
create policy "beta_signups_anon_insert"
  on public.beta_signups
  for insert
  to anon
  with check (true);
