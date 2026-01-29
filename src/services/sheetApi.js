
import supabase from './supabaseClient';
import { SHEET_NAMES } from '../config';

// Mapping between "Sheet Name" (legacy) and "Supabase Table"
const TABLE_MAPPING = {
  [SHEET_NAMES.courses]: 'courses',
  [SHEET_NAMES.publications]: 'publications',
  [SHEET_NAMES.resources]: 'resources',
  [SHEET_NAMES.research]: 'research',
  [SHEET_NAMES.researchteam]: 'research_team',
};

function getTableName(sheetName) {
  return TABLE_MAPPING[sheetName] || sheetName.toLowerCase();
}

/**
 * Fetch data from Supabase.
 * Returns array of objects.
 */
export async function fetchTableData(tableName, limit = null) {
  const table = getTableName(tableName);

  let query = supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error(`[Supabase Error] Fetching ${table} failed:`, error.message);
    return [];
  }

  if (!data) {
    console.warn(`[Supabase Warning] No data returned for ${table}`);
    return [];
  }

  return data;
}

// Aliases for compatibility/clarity
export function fetchCourses(limit) { return fetchTableData(SHEET_NAMES.courses, limit); }
export function fetchTeam(limit) { return fetchTableData(SHEET_NAMES.researchteam, limit); }
export function fetchResearch(limit) { return fetchTableData(SHEET_NAMES.research, limit); }
export function fetchMaterials(limit) { return fetchTableData(SHEET_NAMES.resources, limit); }
export function fetchPublications(limit) { return fetchTableData(SHEET_NAMES.publications, limit); }

// CRUD Operations

export async function addRowToSheet(sheetName, rowData) {
  const table = getTableName(sheetName);
  const { id, ...payload } = rowData;

  const { data, error } = await supabase
    .from(table)
    .insert([payload])
    .select();

  if (error) throw error;
  return { status: "success", data };
}

export async function updateRowInSheet(sheetName, rowData) {
  const table = getTableName(sheetName);
  const { id, ...payload } = rowData;

  if (!id) throw new Error("Missing ID for update");

  const { data, error } = await supabase
    .from(table)
    .update(payload)
    .eq('id', id)
    .select();

  if (error) throw error;
  return { status: "success", data };
}

export async function deleteRowFromSheet(sheetName, rowData) {
  const table = getTableName(sheetName);
  const { id } = rowData;

  if (!id) throw new Error("Missing ID for delete");

  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { status: "success" };
}

export async function getSheetHeaders(sheetName) {
  const data = await fetchTableData(sheetName);
  if (data && data.length > 0) {
    return Object.keys(data[0]);
  }
  return [];
}