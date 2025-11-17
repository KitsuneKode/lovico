# 🎨 Modern Design System - Clean & Professional

## Design Philosophy

**Goal**: Create a beautiful, modern, professional dashboard that feels fast, clean, and delightful to use.

**Inspiration**: Linear, Vercel, GitHub, Notion - modern SaaS tools with excellent UX.

---

## Color Palette (Modern & Vibrant)

### Backgrounds
```css
--bg-app: #fafafa;              /* Light gray background */
--bg-surface: #ffffff;          /* White cards/panels */
--bg-elevated: #ffffff;         /* Elevated surfaces */
--bg-hover: #f5f5f5;           /* Hover state */
--bg-active: #eeeeee;          /* Active/pressed state */
```

### Dark Mode (Primary)
```css
--dark-bg-app: #0d0d0d;        /* Almost black */
--dark-bg-surface: #1a1a1a;    /* Dark surface */
--dark-bg-elevated: #232323;   /* Elevated surface */
--dark-bg-hover: #2a2a2a;      /* Hover state */
--dark-bg-active: #333333;     /* Active state */
```

### Text (High Contrast)
```css
--text-primary: #0a0a0a;       /* Main text - almost black */
--text-secondary: #6b7280;     /* Secondary text - gray-500 */
--text-tertiary: #9ca3af;      /* Tertiary text - gray-400 */
--text-placeholder: #d1d5db;   /* Placeholder - gray-300 */

/* Dark mode */
--dark-text-primary: #ffffff;
--dark-text-secondary: #a3a3a3;
--dark-text-tertiary: #737373;
--dark-text-placeholder: #525252;
```

### Accent Colors (Vibrant)
```css
--accent-primary: #6366f1;     /* Indigo-500 - main CTA */
--accent-primary-hover: #4f46e5; /* Indigo-600 */
--accent-success: #10b981;     /* Green-500 */
--accent-warning: #f59e0b;     /* Amber-500 */
--accent-error: #ef4444;       /* Red-500 */
--accent-info: #3b82f6;        /* Blue-500 */
```

### Borders
```css
--border-subtle: #e5e7eb;      /* Gray-200 */
--border-medium: #d1d5db;      /* Gray-300 */
--border-strong: #9ca3af;      /* Gray-400 */

/* Dark mode */
--dark-border-subtle: rgba(255, 255, 255, 0.08);
--dark-border-medium: rgba(255, 255, 255, 0.12);
--dark-border-strong: rgba(255, 255, 255, 0.16);
```

---

## Typography (Readable & Modern)

### Font Family
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
```

### Font Sizes (Larger, more readable)
```css
--text-xs: 12px;      /* Small labels */
--text-sm: 14px;      /* Body text */
--text-base: 16px;    /* Default */
--text-lg: 18px;      /* Large body */
--text-xl: 20px;      /* Small headings */
--text-2xl: 24px;     /* Headings */
--text-3xl: 30px;     /* Large headings */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-none: 1;
--leading-tight: 1.25;
--leading-snug: 1.375;
--leading-normal: 1.5;
--leading-relaxed: 1.625;
--leading-loose: 2;
```

---

## Spacing (Generous & Comfortable)

### Base: 4px
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
```

---

## Shadows (Depth & Elevation)

```css
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
--shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
--shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);

/* Dark mode - lighter shadows */
--dark-shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
--dark-shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
--dark-shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.5);
```

---

## Border Radius (Smooth & Modern)

```css
--radius-sm: 6px;
--radius-base: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 24px;
--radius-full: 9999px;
```

---

## Components Design

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary:hover {
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}

.btn-secondary:hover {
  background: rgba(99, 102, 241, 0.15);
}
```

### Cards
```css
.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 200ms;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: #d1d5db;
}
```

### Input Fields
```css
.input {
  background: white;
  border: 1.5px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  transition: all 150ms;
}

.input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

---

## Layout Specifications

### Sidebar
```
Width: 280px (was 200px - too narrow)
Padding: 24px (was 12px - too cramped)
Background: #ffffff (light) / #1a1a1a (dark)
Border: 1px solid #e5e7eb
```

### Top Bar
```
Height: 64px (was 56px - too short)
Padding: 0 32px (more spacious)
Background: white with subtle shadow
Border-bottom: 1px solid #e5e7eb
```

### File Tree
```
Width: 280px (was 240px)
Padding: 16px
Item height: 36px (was 28px - too cramped)
Font size: 14px (was 12px - too small)
```

### Chat Panel
```
Width: 420px (was 400px)
Padding: 24px (more breathing room)
Message spacing: 16px (was 12px)
Font size: 15px (was 13px - more readable)
```

### Code Viewer
```
Line height: 24px (was 21px - more readable)
Font size: 14px (was 13px)
Padding: 24px (was 16px)
```

---

## Animations & Transitions

### Timing Functions
```css
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0.0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0.0, 0.2, 1);
--ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Durations
```css
--duration-fast: 150ms;
--duration-base: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;
```

### Hover Effects
```css
/* Lift on hover */
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

/* Scale on hover */
.hover-scale:hover {
  transform: scale(1.02);
}

/* Glow on hover */
.hover-glow:hover {
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}
```

---

## Micro-Interactions

### Message Appear
```css
@keyframes messageIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message {
  animation: messageIn 300ms ease-out;
}
```

### Button Press
```css
.button:active {
  transform: scale(0.98);
}
```

### Loading Skeleton
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.skeleton {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%;
}
```

---

## Accessibility

### Focus States
```css
*:focus-visible {
  outline: 2px solid #6366f1;
  outline-offset: 2px;
}
```

### Color Contrast
- All text meets WCAG AA (4.5:1 minimum)
- Interactive elements meet WCAG AAA (7:1)
- Error states use red with sufficient contrast

### Keyboard Navigation
- All interactive elements focusable
- Tab order follows visual order
- Escape closes modals/dropdowns
- Enter activates buttons

---

## Implementation Priority

### Phase 1: Foundation (30 min)
1. Update theme colors to new palette
2. Update typography scales
3. Update spacing system
4. Add shadow utilities

### Phase 2: Components (1 hour)
1. Redesign sidebar with better spacing
2. Redesign chat messages (modern bubbles)
3. Redesign code viewer
4. Redesign file tree

### Phase 3: Polish (30 min)
1. Add smooth animations
2. Add hover effects
3. Add loading states
4. Test and refine

---

## Success Metrics

- **Readability**: Can read all text comfortably
- **Spacing**: Nothing feels cramped
- **Visual Hierarchy**: Clear structure at a glance
- **Interactions**: Smooth, delightful animations
- **Professional**: Looks like a modern SaaS product
- **Accessibility**: Meets WCAG AA standards

This design system will make the dashboard feel modern, professional, and delightful to use!
