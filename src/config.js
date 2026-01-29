// src/config.js - Centralized configuration for the application

// Validate required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key);

if (missingVars.length > 0) {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Missing required environment variables:', missingVars);
  }
}

// Google Apps Script API Endpoint
export const SHEET_API_URL = process.env.NEXT_PUBLIC_SHEET_API_URL;

// Google Sheets ID (for gviz fallback) - Keeping for reference or legacy support if needed
export const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;

// Supabase Configuration
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

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
  email: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@chemistry-center.com",
  password: process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"
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