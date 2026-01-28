-- Enable CRUD operations for 'courses'
create policy "public insert courses" on courses for insert with check (true);
create policy "public update courses" on courses for update using (true);
create policy "public delete courses" on courses for delete using (true);

-- Enable CRUD operations for 'publications'
create policy "public insert publications" on publications for insert with check (true);
create policy "public update publications" on publications for update using (true);
create policy "public delete publications" on publications for delete using (true);

-- Enable CRUD operations for 'resources'
create policy "public insert resources" on resources for insert with check (true);
create policy "public update resources" on resources for update using (true);
create policy "public delete resources" on resources for delete using (true);

-- Enable CRUD operations for 'research_team'
create policy "public insert research_team" on research_team for insert with check (true);
create policy "public update research_team" on research_team for update using (true);
create policy "public delete research_team" on research_team for delete using (true);

-- Enable CRUD operations for 'research'
create policy "public insert research" on research for insert with check (true);
create policy "public update research" on research for update using (true);
create policy "public delete research" on research for delete using (true);
