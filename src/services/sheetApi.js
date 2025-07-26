// src/services/sheetApi.js
import axios from 'axios';
import { SHEET_ID, SHEET_NAMES, SHEET_API_URL } from '../config';

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

export function fetchCourses() { return fetchSheetGviz(SHEET_NAMES.courses); }
export function fetchTeam() { return fetchSheetGviz(SHEET_NAMES.researchteam); }
export function fetchResearch() { return fetchSheetGviz(SHEET_NAMES.research); }
export function fetchMaterials() { return fetchSheetGviz(SHEET_NAMES.resources); }
export function fetchPublications() { return fetchSheetGviz(SHEET_NAMES.publications); }

// CRUD qua Apps Script endpoint cho admin

// Đọc data (GET) và lọc dữ liệu sạch
export async function fetchSheetData(sheetName) {
  const url = `${SHEET_API_URL}?sheetName=${encodeURIComponent(sheetName)}`;
  const res = await fetch(url);
  const json = await res.json();
  if (!res.ok || json.status !== "success") throw new Error(json.message || "API Error");
  // Lọc bỏ các trường key rỗng và dòng trống
  const cleanData = (json.data || []).map(row => {
    const obj = {};
    Object.keys(row).forEach(k => {
      if (k && k.trim() !== "" && row[k] !== undefined) obj[k] = row[k];
    });
    return obj;
  }).filter(row => Object.keys(row).length > 0);
  console.log(sheetName)
    console.log(cleanData)
  return cleanData;
}

// CRUD (POST)
export async function callSheetApi(action, data = {}, sheetName = "Sheet1") {
  const res = await fetch(SHEET_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sheetName, action, data }),
  });
  const json = await res.json();
  if (!res.ok || json.status !== "success") throw new Error(json.message || "API Error");
  return json;
}
export async function addRowToSheet(sheetName, rowData) {
  return callSheetApi("insert", rowData, sheetName);
}
export async function updateRowInSheet(sheetName, rowData) {
  return callSheetApi("update", rowData, sheetName);
}
export async function deleteRowFromSheet(sheetName, rowData) {
  return callSheetApi("delete", rowData, sheetName);
}
export async function getSheetHeaders(sheetName) {
  const data = await fetchSheetGviz(sheetName); // Lấy headers từ gviz cho ổn định
  return data.length > 0 ? Object.keys(data[0]) : [];
}
export async function getAllSheetData() {
  const sheets = Object.values(SHEET_NAMES);
  const results = {};
  for (const sheet of sheets) {
    try {
      results[sheet] = await fetchSheetData(sheet);
    } catch (error) {
      results[sheet] = [];
    }
  }
  return results;
} 