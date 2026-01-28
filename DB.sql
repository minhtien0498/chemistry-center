-- =====================================================
-- EXTENSION
-- =====================================================
create extension if not exists "pgcrypto";

-- =====================================================
-- COURSES
-- =====================================================
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),

  -- original (giữ tương thích FE)
  name text,
  shortdescription text,
  description text,
  image text,
  duration text,
  level text,
  price text,
  tag text,
  curriculum text,
  registration text,
  students text,
  rating text,

  -- optimized columns
  price_value numeric,
  rating_value numeric(2,1),
  student_count int,
  tags text[],

  isshow boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- PUBLICATIONS
-- =====================================================
create table if not exists publications (
  id uuid primary key default gen_random_uuid(),

  -- original
  title text,
  authors text,
  journal text,
  year text,
  type text,
  doi text,
  abstract text,
  keywords text,
  url text,
  citation text,
  pdffile text,

  -- optimized
  authors_list text[],
  keyword_list text[],
  publish_year int,

  isshow boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- RESOURCES
-- =====================================================
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  link text,
  isshow boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- RESEARCH TEAM
-- =====================================================
create table if not exists research_team (
  id uuid primary key default gen_random_uuid(),
  name text,
  role text,
  bio text,
  image text,
  linkedin text,
  researchgate text,
  email text,
  isshow boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- RESEARCH
-- =====================================================
create table if not exists research (
  id uuid primary key default gen_random_uuid(),
  title text,
  description text,
  details text,
  status text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =====================================================
-- RESEARCH MEMBERS (MANY-TO-MANY)
-- =====================================================
create table if not exists research_members (
  research_id uuid references research(id) on delete cascade,
  member_id uuid references research_team(id) on delete cascade,
  role text,
  primary key (research_id, member_id)
);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================
create trigger trg_courses_updated
before update on courses
for each row execute function set_updated_at();

create trigger trg_publications_updated
before update on publications
for each row execute function set_updated_at();

create trigger trg_resources_updated
before update on resources
for each row execute function set_updated_at();

create trigger trg_research_team_updated
before update on research_team
for each row execute function set_updated_at();

create trigger trg_research_updated
before update on research
for each row execute function set_updated_at();

-- =====================================================
-- ROW LEVEL SECURITY (PUBLIC READ)
-- =====================================================
alter table courses enable row level security;
alter table publications enable row level security;
alter table resources enable row level security;
alter table research_team enable row level security;

create policy "public read courses"
on courses for select
using (isshow = true);

create policy "public read publications"
on publications for select
using (isshow = true);

create policy "public read resources"
on resources for select
using (isshow = true);

create policy "public read research team"
on research_team for select
using (isshow = true);
 

-- =====================================================
-- ROW LEVEL SECURITY (WRITE ACCESS)
-- =====================================================
-- COURSES
create policy "public insert courses"
on courses for insert
with check (true);

create policy "public update courses"
on courses for update
using (true);

create policy "public delete courses"
on courses for delete
using (true);

-- PUBLICATIONS
create policy "public insert publications"
on publications for insert
with check (true);

create policy "public update publications"
on publications for update
using (true);

create policy "public delete publications"
on publications for delete
using (true);

-- RESOURCES
create policy "public insert resources"
on resources for insert
with check (true);

create policy "public update resources"
on resources for update
using (true);

create policy "public delete resources"
on resources for delete
using (true);

-- RESEARCH TEAM
create policy "public insert research team"
on research_team for insert
with check (true);

create policy "public update research team"
on research_team for update
using (true);

create policy "public delete research team"
on research_team for delete
using (true);

-- RESEARCH
create policy "public insert research"
on research for insert
with check (true);

create policy "public update research"
on research for update
using (true);

create policy "public delete research"
on research for delete
using (true);

-- RESEARCH MEMBERS
alter table research_members enable row level security;

create policy "public select research members"
on research_members for select
using (true);

create policy "public insert research members"
on research_members for insert
with check (true);

create policy "public update research members"
on research_members for update
using (true);

create policy "public delete research members"
on research_members for delete
using (true);
