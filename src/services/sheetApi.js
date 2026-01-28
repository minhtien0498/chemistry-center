
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
export async function fetchTableData(tableName) {
  const table = getTableName(tableName);

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching data from ${table}:`, error);
    return [];
  }

  return data;
}

// Aliases for compatibility/clarity
export function fetchCourses() { return fetchTableData(SHEET_NAMES.courses); }
export function fetchTeam() { return fetchTableData(SHEET_NAMES.researchteam); }
export function fetchResearch() { return fetchTableData(SHEET_NAMES.research); }
export function fetchMaterials() { return fetchTableData(SHEET_NAMES.resources); }
export function fetchPublications() { return fetchTableData(SHEET_NAMES.publications); }

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