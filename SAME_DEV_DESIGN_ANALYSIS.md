# 🎨 same.dev Dashboard Design Analysis

**Comprehensive visual breakdown for pixel-perfect replication**

---

## 📐 Overall Layout Architecture

### Homepage (Image 1 - Landing)
```
┌─────────────────────────────────────────────────────────────────┐
│ [Logo] same                                    Docs   [Avatar]  │ ← Header
├───────────┬─────────────────────────────────────────────────────┤
│           │                                                     │
│ Sidebar   │            Centered Content Area                   │
│ (200px)   │            "Make anything"                         │
│           │            Hero + Prompt Input                     │
│           │            Gallery Grid Below                      │
│           │                                                     │
└───────────┴─────────────────────────────────────────────────────┘
```

### Project Dashboard (Images 2, 3, 6 - Main Interface)
```
┌─────────────────────────────────────────────────────────────────┐
│ [Project Name ▼]          Preview  Code      Pro  Integrations │ ← Top Bar (56px)
├───────────┬─────────────────────────────────┬───────────────────┤
│           │                                 │                   │
│ File Tree │    Preview/Code Area           │   Chat Panel      │
│ (240px)   │    (Largest Panel)             │   (400px)         │
│           │                                 │                   │
│ [Search]  │                                 │ [Project Name ▼] │
│           │                                 │                   │
│ src/      │                                 │ [User Message]    │
│  app/     │    [White Canvas for Preview]  │                   │
│   page.tsx│         OR                     │ [Logo]            │
│           │    [Code with Line Numbers]    │                   │
│           │                                 │ [Activity Log]    │
│           │                                 │                   │
│           │                                 │ [Add context]     │
│           │                                 │ [Prompt Input]    │
│           │                                 │ [Model Selector]  │
└───────────┴─────────────────────────────────┴───────────────────┘
```

---

## 🎨 Color Palette (Exact Values)

### Dark Theme (Primary)
```css
/* Backgrounds */
--bg-primary: #0a0a0a;           /* Main background (almost black) */
--bg-secondary: #1a1a1a;         /* Sidebar, panels, cards */
--bg-tertiary: #262626;          /* Hover states, inputs */

/* Text */
--text-primary: #ffffff;         /* Main text */
--text-secondary: #a3a3a3;       /* Muted text, labels */
--text-tertiary: #737373;        /* Disabled, placeholders */

/* Borders */
--border-subtle: rgba(255, 255, 255, 0.05);  /* Very subtle dividers */
--border-medium: rgba(255, 255, 255, 0.1);   /* Input borders */
--border-strong: rgba(255, 255, 255, 0.2);   /* Focus states */

/* Accent Colors */
--accent-blue: #3b82f6;          /* Primary CTA, Pro badge */
--accent-purple: #8b5cf6;        /* Sparkles, started icon */
--accent-green: #10b981;         /* Success, checkmarks */
--accent-yellow: #f59e0b;        /* File icons, warnings */
--accent-pink: #ec4899;          /* CSS files */

/* File Type Colors */
--file-tsx: #3b82f6;             /* TypeScript React - Blue */
--file-ts: #2563eb;              /* TypeScript - Darker blue */
--file-jsx: #fbbf24;             /* JavaScript React - Yellow */
--file-js: #f59e0b;              /* JavaScript - Orange */
--file-css: #ec4899;             /* CSS - Pink */
--file-json: #10b981;            /* JSON - Green */
--file-md: #8b5cf6;              /* Markdown - Purple */
--file-html: #fb923c;            /* HTML - Orange */
```

### Overlays & Effects
```css
/* Hover States */
--hover-overlay: rgba(255, 255, 255, 0.05);

/* Active/Selected States */
--active-overlay: rgba(255, 255, 255, 0.1);

/* Focus/Ring */
--focus-ring: rgba(59, 130, 246, 0.5);
```

---

## 📝 Typography System

### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
             "Helvetica Neue", Arial, sans-serif;
/* San Francisco (macOS) / Segoe UI (Windows) */
```

### Font Sizes
```css
/* Headers */
--text-2xl: 24px;   /* Page title "Make anything" */
--text-xl: 20px;    /* Section headers */
--text-lg: 16px;    /* Large body text */

/* Body */
--text-base: 14px;  /* Default body text */
--text-sm: 13px;    /* Secondary text */
--text-xs: 12px;    /* Captions, metadata */
--text-2xs: 11px;   /* Tiny labels (Favorites, Recents) */

/* Code */
--text-code: 13px;  /* Monospace code */
```

### Font Weights
```css
--font-normal: 400;    /* Body text */
--font-medium: 500;    /* UI elements, buttons */
--font-semibold: 600;  /* Headers, emphasis */
--font-bold: 700;      /* Rarely used, only for strong emphasis */
```

### Line Heights
```css
--leading-tight: 1.25;   /* Headers */
--leading-normal: 1.5;   /* Body text */
--leading-relaxed: 1.6;  /* Paragraphs */
--leading-code: 1.6;     /* Code blocks */
```

---

## 📏 Spacing Scale

### Base Unit: 4px (0.25rem)

```css
/* Spacing Values */
--space-1: 4px;    /* 0.25rem - Tiny gaps */
--space-2: 8px;    /* 0.5rem - Small gaps, icon spacing */
--space-3: 12px;   /* 0.75rem - Default gaps */
--space-4: 16px;   /* 1rem - Component padding */
--space-5: 20px;   /* 1.25rem */
--space-6: 24px;   /* 1.5rem - Section spacing */
--space-8: 32px;   /* 2rem - Large sections */
--space-12: 48px;  /* 3rem - Extra large spacing */
```

### Applied Spacing
```css
/* Padding */
.sidebar-item { padding: 8px 12px; }          /* space-2 space-3 */
.panel-content { padding: 16px; }             /* space-4 */
.chat-message { padding: 12px 16px; }         /* space-3 space-4 */

/* Gaps */
.icon-text-gap { gap: 8px; }                  /* space-2 */
.component-gap { gap: 12px; }                 /* space-3 */
.section-gap { gap: 24px; }                   /* space-6 */

/* Margins */
.section-bottom { margin-bottom: 24px; }      /* space-6 */
```

---

## 🧩 Component Breakdown

### 1. Sidebar (Left Panel - 200px width)

**Structure:**
```
┌────────────────────────┐
│ [Logo] Lovico          │ ← Brand header (56px height)
├────────────────────────┤
│ [New Project]          │ ← Primary CTA button
│                        │
│ Favorites ▼            │ ← Collapsible section
│   No favorites yet.    │
│                        │
│ Recents ▼              │ ← Collapsible section
│ 📄 New Project         │
│ 📅 Appointment Boo...  │
│ 🟧 C-Auth Wi-Fi PWA    │
│                        │
│ All Projects        →  │
│                        │
│ [Spacer - fills space] │
│                        │
│ ┌──────────────────┐   │
│ │ [Avatar]         │   │ ← User profile
│ │ Manash Pratim    │   │
│ │ manash@gmail.com │   │
│ │              Free│   │
│ └──────────────────┘   │
└────────────────────────┘
```

**Styling Details:**
```css
/* Sidebar Container */
.sidebar {
  width: 200px;
  background: #1a1a1a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
}

/* Logo Header */
.sidebar-header {
  height: 56px;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  gap: 8px;
}

/* New Project Button */
.new-project-button {
  margin: 12px;
  padding: 8px 16px;
  background: #ffffff;
  color: #000000;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: background 200ms;
}

.new-project-button:hover {
  background: rgba(255, 255, 255, 0.9);
}

/* Section Headers (Favorites, Recents) */
.section-header {
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #a3a3a3;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: color 200ms;
}

.section-header:hover {
  color: #ffffff;
}

/* Project Items */
.project-item {
  padding: 8px 12px;
  margin: 0 8px;
  border-radius: 6px;
  font-size: 12px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 200ms;
  cursor: pointer;
}

.project-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.project-item-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.project-item-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* User Profile (Bottom) */
.user-profile {
  padding: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: start;
  gap: 10px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
}

.user-info {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 11px;
  font-weight: 500;
  color: #ffffff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  font-size: 10px;
  color: #a3a3a3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-badge {
  padding: 2px 6px;
  font-size: 9px;
  background: rgba(255, 255, 255, 0.1);
  color: #a3a3a3;
  border-radius: 4px;
  flex-shrink: 0;
}
```

---

### 2. Top Bar (Header - 56px height)

**Desktop Layout:**
```
┌────────────────────────────────────────────────────────────────────┐
│ [Project Name ▼]  Preview  Code    [Visual Edit]  Pro  Integrations Deploy  [User] │
└────────────────────────────────────────────────────────────────────┘
```

**Styling:**
```css
.top-bar {
  height: 56px;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Project Name Dropdown */
.project-dropdown {
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 200ms;
}

.project-dropdown:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* View Mode Tabs */
.view-tabs {
  display: flex;
  gap: 4px;
}

.view-tab {
  padding: 6px 12px;
  font-size: 12px;
  color: #a3a3a3;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 200ms;
  cursor: pointer;
}

.view-tab:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.view-tab.active {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}

/* Pro Badge Button */
.pro-badge {
  padding: 6px 12px;
  background: #3b82f6;
  color: #ffffff;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  transition: background 200ms;
}

.pro-badge:hover {
  background: #2563eb;
}
```

---

### 3. File Tree Panel (Left - 240px width when visible)

**Structure:**
```
┌──────────────────────┐
│ 🔍 Search            │ ← Search input
├──────────────────────┤
│                      │
│ ▼ appointment-booking│ ← Root folder (expanded)
│   ▼ src              │
│     ▼ app            │
│       📄 layout.tsx  │ ← File (selected: highlighted)
│       📄 page.tsx    │
│     📁 components    │ ← Folder (collapsed)
│   📄 package.json    │
│   📄 tsconfig.json   │
│   📄 README.md       │
│                      │
└──────────────────────┘
```

**Styling:**
```css
.file-tree {
  width: 240px;
  background: #1a1a1a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
}

/* Search Bar */
.file-tree-search {
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.search-input {
  width: 100%;
  padding: 6px 8px 6px 32px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 12px;
  color: #ffffff;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 14px;
  height: 14px;
  color: #a3a3a3;
}

/* Tree Items */
.tree-item {
  padding: 4px 8px 4px calc(var(--depth) * 12px + 8px);
  font-size: 12px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 200ms;
  cursor: pointer;
}

.tree-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tree-item.selected {
  background: rgba(255, 255, 255, 0.1);
}

/* Chevron Icon */
.tree-chevron {
  width: 12px;
  height: 12px;
  color: #a3a3a3;
  transition: transform 150ms;
}

.tree-item.expanded .tree-chevron {
  transform: rotate(90deg);
}

/* File/Folder Icons */
.tree-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.tree-icon.folder {
  color: #3b82f6;
}

.tree-icon.file-tsx { color: #3b82f6; }
.tree-icon.file-css { color: #ec4899; }
.tree-icon.file-json { color: #10b981; }
.tree-icon.file-md { color: #8b5cf6; }
```

---

### 4. Code Viewer (Center Panel - Largest)

**Structure:**
```
┌────────────────────────────────────────────────────┐
│ appointment-booking/src/app  layout.tsx  [Copy]    │ ← File tab bar
├────────────────────────────────────────────────────┤
│                                                    │
│  1 │ import type { Metadata } from 'next'         │
│  2 │ import './globals.css'                       │
│  3 │                                              │
│  4 │ export const metadata: Metadata = {         │
│  5 │   title: 'Appointment Booking',             │
│  6 │   description: 'Book appointments easily',  │
│  7 │ }                                            │
│  8 │                                              │
│  9 │ export default function RootLayout({        │
│ 10 │   children,                                  │
│ 11 │ }: {                                         │
│ 12 │   children: React.ReactNode                  │
│ 13 │ }) {                                         │
│ 14 │   return (                                   │
│ 15 │     <html lang="en">                         │
│ 16 │       <body>{children}</body>                │
│ 17 │     </html>                                  │
│ 18 │   )                                          │
│ 19 │ }                                            │
│    │                                              │
└────────────────────────────────────────────────────┘
```

**Styling:**
```css
.code-viewer {
  background: #0a0a0a;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* File Tab */
.code-tab {
  height: 40px;
  padding: 0 16px;
  background: #0a0a0a;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.code-tab-path {
  font-size: 11px;
  color: #a3a3a3;
}

.code-tab-name {
  font-size: 12px;
  color: #ffffff;
  font-weight: 500;
  margin-left: 8px;
}

.copy-button {
  padding: 4px 10px;
  font-size: 11px;
  color: #a3a3a3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 200ms;
}

.copy-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

/* Code Content */
.code-content {
  flex: 1;
  overflow: auto;
  font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.code-line {
  display: flex;
  min-height: 21px;
  transition: background 100ms;
}

.code-line:hover {
  background: rgba(255, 255, 255, 0.03);
}

.line-number {
  width: 48px;
  padding-right: 16px;
  text-align: right;
  color: #737373;
  user-select: none;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.line-content {
  padding: 0 16px;
  color: #e5e5e5;
  white-space: pre;
  overflow: visible;
}

/* Syntax Highlighting (Basic) */
.token.keyword { color: #c792ea; }
.token.function { color: #82aaff; }
.token.string { color: #c3e88d; }
.token.number { color: #f78c6c; }
.token.comment { color: #737373; font-style: italic; }
.token.operator { color: #89ddff; }
```

---

### 5. Chat Panel (Right - 400px width)

**Structure:**
```
┌────────────────────────────────────┐
│ Appointment Bookin... ▼    + ⏱    │ ← Header
├────────────────────────────────────┤
│                                    │
│ create a booking system for...    │ ← User message (right)
│                     ↩ Rollback    │
│                                    │
│        [L]                         │ ← Logo divider
│                                    │
│ ✨ Started appointment-booking     │ ← Activity log
│    with nextjs-shadcn              │
│                                    │
│ 📁 Listed directory                │
│    appointment-booking (23 items) →│
│                                    │
│ 📄 Read package.json      (1-200) →│
│                                    │
│ 📄 Read layout.tsx        (1-400) →│
│                                    │
│ ✅ Read file cancelled             │
│                                    │
│ [Spacer - fills remaining space]  │
│                                    │
├────────────────────────────────────┤
│ ➕ Add context                     │ ← Add context button
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Tell Same what you want        │ │ ← Prompt input
│ │                                │ │
│ │                                │ │
│ │ + gemini-2.5-pro    ⚙ 📎 ➤    │ │
│ └────────────────────────────────┘ │
└────────────────────────────────────┘
```

**Styling:**
```css
.chat-panel {
  width: 400px;
  background: #1a1a1a;
  border-left: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
}

/* Chat Header */
.chat-header {
  height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-project-name {
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-actions {
  display: flex;
  gap: 4px;
}

.icon-button {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a3a3a3;
  transition: all 200ms;
}

.icon-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

/* Messages Area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* User Message */
.user-message {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.user-message-bubble {
  max-width: 85%;
  padding: 10px 14px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 13px;
  color: #ffffff;
  text-align: right;
}

.rollback-button {
  font-size: 11px;
  color: #737373;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 200ms;
}

.rollback-button:hover {
  color: #a3a3a3;
}

/* Logo Divider */
.logo-divider {
  display: flex;
  justify-content: center;
  padding: 12px 0;
}

.logo-badge {
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #ffffff;
}

/* Activity Log Item */
.activity-item {
  display: flex;
  align-items: start;
  gap: 10px;
  padding: 8px 0;
  transition: background 200ms;
  border-radius: 6px;
  margin: 0 -8px;
  padding: 8px;
}

.activity-item:hover {
  background: rgba(255, 255, 255, 0.03);
}

.activity-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.activity-icon.started { color: #8b5cf6; }
.activity-icon.directory { color: #3b82f6; }
.activity-icon.file { color: #f59e0b; }
.activity-icon.success { color: #10b981; }

.activity-content {
  flex: 1;
  min-width: 0;
}

.activity-title {
  font-size: 13px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 6px;
}

.activity-details {
  font-size: 11px;
  color: #a3a3a3;
}

.activity-arrow {
  width: 14px;
  height: 14px;
  color: #737373;
  opacity: 0;
  transition: opacity 200ms;
}

.activity-item:hover .activity-arrow {
  opacity: 1;
}

/* Input Area */
.chat-input-area {
  padding: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.add-context-button {
  padding: 8px 12px;
  font-size: 12px;
  color: #a3a3a3;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 200ms;
}

.add-context-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

/* Prompt Input */
.prompt-wrapper {
  position: relative;
}

.prompt-input {
  width: 100%;
  min-height: 80px;
  padding: 12px 12px 48px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 13px;
  color: #ffffff;
  resize: none;
  transition: border-color 200ms;
}

.prompt-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.2);
}

.prompt-input::placeholder {
  color: #737373;
}

/* Input Controls */
.input-controls {
  position: absolute;
  bottom: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.model-selector {
  padding: 4px 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 11px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;
}

.input-actions {
  display: flex;
  gap: 4px;
}

.input-icon-button {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a3a3a3;
  transition: all 200ms;
}

.input-icon-button:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.05);
}

.send-button {
  background: #3b82f6;
  color: #ffffff;
}

.send-button:hover {
  background: #2563eb;
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## ⚡ Interactions & Animations

### Hover States
```css
/* Universal hover transition */
* {
  transition-property: background-color, color, border-color, transform;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover overlays */
.hover-subtle:hover {
  background: rgba(255, 255, 255, 0.05);
}

.hover-medium:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Button hover lift */
.button:hover {
  transform: translateY(-1px);
}
```

### Focus States
```css
/* Focus ring */
*:focus-visible {
  outline: 2px solid rgba(59, 130, 246, 0.5);
  outline-offset: 2px;
}

/* Input focus */
input:focus,
textarea:focus {
  border-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
```

### Expand/Collapse
```css
/* Smooth height transition */
.collapsible-content {
  overflow: hidden;
  transition: height 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Chevron rotation */
.chevron {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.expanded .chevron {
  transform: rotate(90deg);
}
```

### Panel Resizing
```css
/* Resize handle */
.resize-handle {
  width: 1px;
  background: rgba(255, 255, 255, 0.05);
  cursor: col-resize;
  transition: background 200ms;
}

.resize-handle:hover {
  background: rgba(59, 130, 246, 0.5);
}

.resize-handle:active {
  background: #3b82f6;
}
```

---

## 📱 Responsive Behavior

### Breakpoints
```css
/* Mobile */
@media (max-width: 768px) {
  /* Stack panels vertically */
  /* Sidebar becomes drawer */
  /* Hide file tree by default */
}

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  /* 2-panel layout: Preview + Chat */
  /* File tree toggleable */
}

/* Desktop */
@media (min-width: 1025px) {
  /* Full 3-panel layout */
  /* All panels visible */
}
```

### Mobile Adaptations
```
Mobile Layout (< 768px):
┌─────────────────────────┐
│ [☰] Project   [User]    │ ← Hamburger menu
├─────────────────────────┤
│                         │
│   Preview/Code Area     │
│   (Full Width)          │
│                         │
├─────────────────────────┤
│ [Chat Toggle Button]    │ ← Bottom sheet trigger
└─────────────────────────┘
```

---

## 🎯 Key Design Principles

### 1. **Extreme Minimalism**
- Only 2 background colors (#0a0a0a, #1a1a1a)
- Borders at 5% white opacity (barely visible)
- No shadows, no gradients (except Pro badge)
- Text is either white (#ffffff) or gray (#a3a3a3)

### 2. **Information Density**
- Compact spacing (12px default)
- Small font sizes (12-13px primary)
- Efficient use of space
- No wasted whitespace

### 3. **Icon-First Communication**
- Every activity has an icon (✨📁📄✅)
- File types have color-coded icons
- Visual hierarchy through icons
- Reduces need for text labels

### 4. **Subtle Interactivity**
- 5% white overlay on hover
- 10% white overlay on active
- 200ms transitions everywhere
- No jarring animations

### 5. **Professional Polish**
- Consistent 4px spacing grid
- Rounded corners (6-8px)
- Proper text truncation (ellipsis)
- Clean borders and dividers

---

## 🔍 Detailed Measurements

### Panel Widths
```
Sidebar:          200px (fixed)
File Tree:        240px (resizable, 15% - 25%)
Preview/Code:     Flexible (largest panel, 35% - 60%)
Chat Panel:       400px (resizable, 25% - 40%)
```

### Heights
```
Top Bar:          56px (fixed)
Sidebar Header:   56px (fixed)
Chat Header:      56px (fixed)
Code Tab:         40px (fixed)
```

### Border Radius
```
Buttons:          6px
Inputs:           8px
Cards:            8px
Badges:           4px
Avatars:          50% (circle)
Message Bubbles:  12px
```

### Icon Sizes
```
Small Icons:      12px (chevrons, arrows)
Default Icons:    14px (file icons)
Large Icons:      16px (activity icons)
Button Icons:     16px (toolbar)
```

---

## 🎨 Homepage Gallery Grid (Image 1 & 5)

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  padding: 48px 24px;
}

.gallery-card {
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform 200ms, box-shadow 200ms;
}

.gallery-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.gallery-card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.gallery-card-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.gallery-card-title {
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: 4px;
}

.gallery-card-meta {
  font-size: 11px;
  color: #a3a3a3;
  display: flex;
  align-items: center;
  gap: 8px;
}
```

---

## ✅ Implementation Checklist

### Colors
- [ ] Background: #0a0a0a (main), #1a1a1a (panels)
- [ ] Text: #ffffff (primary), #a3a3a3 (secondary)
- [ ] Borders: rgba(255, 255, 255, 0.05)
- [ ] Accent: #3b82f6 (blue)
- [ ] File icons: Color-coded by type

### Typography
- [ ] System font stack (-apple-system, Segoe UI)
- [ ] Base size: 13-14px
- [ ] Weights: 400 (normal), 500 (medium), 600 (semibold)
- [ ] Line height: 1.5-1.6

### Layout
- [ ] 3-panel resizable layout
- [ ] Sidebar: 200px fixed
- [ ] File tree: 240px resizable
- [ ] Chat: 400px resizable
- [ ] Top bar: 56px height

### Components
- [ ] Collapsible sidebar sections
- [ ] File tree with search
- [ ] Activity log with icons
- [ ] Code viewer with line numbers
- [ ] Prompt input with model selector

### Interactions
- [ ] 200ms transitions on hover
- [ ] 5% white overlay hover effect
- [ ] Smooth panel resizing
- [ ] Expand/collapse animations
- [ ] Copy button feedback

### Polish
- [ ] Consistent 4px spacing grid
- [ ] 6-8px border radius
- [ ] Proper text truncation
- [ ] Loading states
- [ ] Empty states

---

## 📦 What's Different from Current Implementation

Based on the analysis, here are gaps to fix:

1. **Sidebar width**: Currently 200px ✅ (correct)
2. **File tree icons**: Need color coding by file type ⚠️
3. **Activity log**: Need proper icons (✨📁📄✅) ⚠️
4. **Chat header**: Missing + and ⏱ buttons ⚠️
5. **Code tab**: Need breadcrumb path before filename ⚠️
6. **Prompt input**: Need visual separation for controls ⚠️
7. **User message**: Should be right-aligned with border ⚠️
8. **Logo divider**: Missing between user message and activities ⚠️

---

This analysis provides pixel-perfect specifications for replicating same.dev's dashboard design!
