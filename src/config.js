// src/config.js - Centralized configuration for the application

// Validate required environment variables
const requiredEnvVars = {
  REACT_APP_SHEET_API_URL: process.env.REACT_APP_SHEET_API_URL,
  REACT_APP_SHEET_ID: process.env.REACT_APP_SHEET_ID,
  REACT_APP_ADMIN_EMAIL: process.env.REACT_APP_ADMIN_EMAIL,
  REACT_APP_ADMIN_PASSWORD: process.env.REACT_APP_ADMIN_PASSWORD,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars);
  console.error('Please check your .env file and ensure all required variables are set.');
  console.error('You can copy .env.example to .env and fill in the values.');
}

// Google Apps Script API Endpoint
export const SHEET_API_URL = process.env.REACT_APP_SHEET_API_URL;

// Google Sheets ID (for gviz fallback)
export const SHEET_ID = process.env.REACT_APP_SHEET_ID;

// Standard sheet names mapping
export const SHEET_NAMES = {
  courses: "Courses",
  publications: "Publications", 
  resources: "Resources",
  research: "Research",
  researchteam: "ResearchTeam"
};

// Application configuration
export const APP_CONFIG = {
  title: "Chemistry Center HCMUS",
  description: "Trung tâm Hóa học - Đại học Khoa học Tự nhiên TP.HCM",
  version: "1.0.0"
};

// Admin configuration (these should ideally come from .env)
export const ADMIN_CONFIG = {
  email: process.env.REACT_APP_ADMIN_EMAIL || "admin@chemistry-center.com",
  password: process.env.REACT_APP_ADMIN_PASSWORD || "admin123"
};

// API configuration
export const API_CONFIG = {
  timeout: 10000, // 10 seconds
  retryAttempts: 3
};

// Table configuration for admin dashboard
export const TABLE_CONFIG = {
  pageSize: 10,
  scrollX: 1200,
  actionColumnWidth: 180
}; 