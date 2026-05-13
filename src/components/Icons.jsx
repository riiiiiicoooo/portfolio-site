import React from 'react';

const DOMAIN_ICONS = {
  "Developer Security": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><path d="M24 14l-10 5v8c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12v-8l-10-5z" stroke="#166534" strokeWidth="2" fill="none"/><path d="M20 25l3 3 5-6" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  "ML Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><circle cx="24" cy="18" r="3" stroke="#6b21a8" strokeWidth="2"/><circle cx="16" cy="30" r="3" stroke="#6b21a8" strokeWidth="2"/><circle cx="32" cy="30" r="3" stroke="#6b21a8" strokeWidth="2"/><path d="M22 20.5l-4 7M26 20.5l4 7M19 30h10" stroke="#8b5cf6" strokeWidth="1.5"/></svg>
  ),
  "Legal AI": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M16 14h16M16 20h16M16 26h10" stroke="#1e40af" strokeWidth="2" strokeLinecap="round"/><path d="M32 24l-4 4-2-2" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="13" y="11" width="22" height="22" rx="3" stroke="#1e40af" strokeWidth="2" fill="none"/></svg>
  ),
  "Consumer Platform": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fef3c7"/><path d="M15 33V20l9-7 9 7v13H15z" stroke="#92400e" strokeWidth="2" fill="none"/><rect x="21" y="25" width="6" height="8" rx="1" stroke="#f59e0b" strokeWidth="2" fill="none"/></svg>
  ),
  "Sales Enablement": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M14 34l6-8 5 4 9-14" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="34" cy="16" r="2" fill="#1e40af"/></svg>
  ),
  "Financial Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><path d="M24 14v20M18 18h12M16 24h16M18 30h12" stroke="#166534" strokeWidth="2" strokeLinecap="round"/><circle cx="24" cy="24" r="11" stroke="#22c55e" strokeWidth="2" fill="none"/></svg>
  ),
  "AI Compliance": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fef3c7"/><path d="M24 14l-10 5v8c0 5.55 4.27 10.74 10 12 5.73-1.26 10-6.45 10-12v-8l-10-5z" stroke="#92400e" strokeWidth="2" fill="none"/><path d="M21 24h6M24 21v6" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round"/></svg>
  ),
  "DevOps": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><path d="M16 16h16v16H16z" stroke="#6b21a8" strokeWidth="2" rx="2" fill="none"/><path d="M20 22l3 3 5-5" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 12v4M24 32v4M12 24h4M32 24h4" stroke="#6b21a8" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  "API Monitoring": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M14 28l5-8 4 4 6-10 5 6" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="34" cy="20" r="3" stroke="#1e40af" strokeWidth="2" fill="none"/></svg>
  ),
  "Real Estate Analytics": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#f0fdf4"/><rect x="14" y="20" width="8" height="14" rx="1" stroke="#166534" strokeWidth="2" fill="none"/><rect x="26" y="14" width="8" height="20" rx="1" stroke="#166534" strokeWidth="2" fill="none"/><path d="M17 24h2M17 28h2M29 18h2M29 22h2M29 26h2" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
  "Wealth Management": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><circle cx="24" cy="24" r="10" stroke="#6b21a8" strokeWidth="2" fill="none"/><path d="M24 18v12M20 22h8M20 26h8" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round"/></svg>
  ),
  "Legal Operations": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#fef3c7"/><path d="M24 14v4M16 22h16M14 34h20" stroke="#92400e" strokeWidth="2" strokeLinecap="round"/><path d="M18 22l-4 8h8zM30 22l-4 8h8z" stroke="#f59e0b" strokeWidth="2" fill="none" strokeLinejoin="round"/></svg>
  ),
  "Marketplace": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#dbeafe"/><path d="M14 20l2-6h16l2 6" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 20v14h20V20" stroke="#1e40af" strokeWidth="2" fill="none"/><rect x="20" y="26" width="8" height="8" rx="1" stroke="#3b82f6" strokeWidth="2" fill="none"/></svg>
  ),
  "AI Infrastructure": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ede9fe"/><circle cx="24" cy="24" r="6" stroke="#6d28d9" strokeWidth="2" fill="none"/><circle cx="14" cy="14" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><circle cx="34" cy="14" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><circle cx="14" cy="34" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><circle cx="34" cy="34" r="3" stroke="#8b5cf6" strokeWidth="1.5" fill="none"/><line x1="18" y1="20" x2="16" y2="17" stroke="#7c3aed" strokeWidth="1.5"/><line x1="30" y1="20" x2="32" y2="17" stroke="#7c3aed" strokeWidth="1.5"/><line x1="18" y1="28" x2="16" y2="31" stroke="#7c3aed" strokeWidth="1.5"/><line x1="30" y1="28" x2="32" y2="31" stroke="#7c3aed" strokeWidth="1.5"/></svg>
  ),
  "Clinical AI": (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" rx="12" fill="#ecfdf5"/><path d="M24 14v20M14 24h20" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/><circle cx="24" cy="24" r="10" stroke="#047857" strokeWidth="2" fill="none"/><path d="M18 18l2.5 2.5M30 18l-2.5 2.5M18 30l2.5-2.5M30 30l-2.5-2.5" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/></svg>
  ),
};

export default DOMAIN_ICONS;
