-- Talents Radar marketing site — all lead forms (early access + demo requests)
-- Run in Supabase SQL Editor or via `supabase db push` after linking the project.

create table if not exists public.website_form_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Which UI submitted this row
  form_type text not null
    constraint website_form_submissions_form_type_check
    check (form_type in ('early_access', 'demo_request', 'contact')),

  first_name text not null,
  last_name text,
  email text not null,
  company text,
  role text,

  -- Where the lead comes from (UI hint / campaign tag)
  source text not null default 'homepage',

  -- Extra context (path, referrer, UTM params you append client-side, etc.)
  metadata jsonb not null default '{}'::jsonb
);

comment on table public.website_form_submissions is 'Marketing-site form posts: early access, Book a Demo, Contact.';
comment on column public.website_form_submissions.form_type is 'early_access | demo_request | contact';
comment on column public.website_form_submissions.last_name is 'Demo form only; null for early_access.';
comment on column public.website_form_submissions.metadata is 'Optional JSON e.g. {"path":"/","referrer":"..."}';

create index if not exists website_form_submissions_created_at_idx
  on public.website_form_submissions (created_at desc);

create index if not exists website_form_submissions_form_type_idx
  on public.website_form_submissions (form_type);

create index if not exists website_form_submissions_email_idx
  on public.website_form_submissions (lower(email));

-- Contact number for Book a Demo (null for early_access / contact)
alter table public.website_form_submissions add column if not exists phone text;
comment on column public.website_form_submissions.phone is 'Contact number for demo requests; null for other form types.';

-- Free-text message from Contact form
alter table public.website_form_submissions add column if not exists message text;
comment on column public.website_form_submissions.message is 'User message from Contact modal; null for other form types.';

-- Existing DBs: widen form_type check to allow contact (safe to re-run)
alter table public.website_form_submissions drop constraint if exists website_form_submissions_form_type_check;
alter table public.website_form_submissions add constraint website_form_submissions_form_type_check
  check (form_type in ('early_access', 'demo_request', 'contact'));

alter table public.website_form_submissions enable row level security;

-- Public site posts with anon key only — inserts allowed, reads denied for anon.
drop policy if exists "website_form_submissions_anon_insert" on public.website_form_submissions;
create policy "website_form_submissions_anon_insert"
  on public.website_form_submissions
  for insert
  to anon
  with check (true);

-- Reads: Table Editor / SQL in Dashboard uses the service role (bypasses RLS).
-- Add a narrow SELECT policy only if a trusted backend role needs API access.
