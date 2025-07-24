// src/services/sheetApi.js
const SHEET_ID = '11qHP1J0WlSyEZ3AD5jqKRs7oaCafkrUAHFVdJ-E_BeY';

export async function fetchSheetGviz(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;
  const response = await fetch(url);
  const text = await response.text();
  const jsonString = text.substring(47).slice(0, -2);
  const data = JSON.parse(jsonString);

  const headers = data.table.cols.map(col => col.label.toLowerCase());
  const rows = data.table.rows.map(row => {
    const obj = {};
    row.c.forEach((cell, idx) => {
      obj[headers[idx]] = cell ? cell.v : null;
    });
    return obj;
  });
  return rows;
}

export function fetchCourses() { return fetchSheetGviz('Courses'); }
export function fetchTeam() { return fetchSheetGviz('ResearchTeam'); }
export function fetchResearch() { return fetchSheetGviz('Research'); }
export function fetchMaterials() { return fetchSheetGviz('Resources'); }
export function fetchPublications() { return fetchSheetGviz('Publications'); } 