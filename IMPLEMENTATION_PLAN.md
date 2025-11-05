# Dashboard & Chat Interface Implementation Plan

## 📊 Executive Summary

This plan transforms your codebase into a production-ready Lovable/Bolt-style web builder platform with:
- Professional dashboard with project navigation
- AI-powered chat interface using Vercel AI SDK Elements
- File tree with syntax-highlighted code viewer
- Polished UI with animations, loading states, and accessibility

## 🎯 What You Already Have (Discovered in Codebase)

✅ **Solid Foundation:**
- 37+ shadcn components in `packages/ui` (resizable, sidebar, dialog, etc.)
- Custom OKLch theme system (light/dark mode)
- Advanced prompt input with file attachments (`apps/web/components/ai-elements/prompt-input.tsx`)
- Web preview component with iframe sandbox (`apps/web/components/ai-elements/web-preview.tsx`)
- Resizable panels system (`react-resizable-panels`)
- tRPC type-safe API layer
- Better Auth integration
- File tree visualization component

✅ **Existing Pages:**
- Landing page with floating chat
- Auth pages (login/signup with modal support)
- Dashboard at `/dashboard` (stats cards, data table)
- Project dashboard at `/dashboard/[id]` (resizable chat + preview)
- Chat page at `/chat/[roomId]`

## 🚧 What Needs to Be Built

### 1. Dashboard Sidebar Navigation (PROMPT 1)
**What:** Professional sidebar with project list, navigation, and user profile
**Why:** Users need to navigate between projects and access settings
**Complexity:** Medium (3-4 hours)
**Dependencies:** None

### 2. AI SDK Elements Integration (PROMPT 2)
**What:** Replace custom chat components with Vercel AI SDK Elements
**Why:** Optimized for LLM streaming, reduces maintenance, battle-tested
**Complexity:** High (6-8 hours)
**Dependencies:** Prompt 1 complete

### 3. File Tree with Code Viewer (PROMPT 3)
**What:** Read-only file explorer with syntax-highlighted code preview
**Why:** Users need to see generated code structure and content
**Complexity:** Medium (4-6 hours)
**Dependencies:** Prompt 2 complete

### 4. UI Polish & Refinements (PROMPT 4)
**What:** Loading states, animations, accessibility, mobile responsiveness
**Why:** Production-ready UX with professional polish
**Complexity:** Medium (4-5 hours)
**Dependencies:** Prompts 1-3 complete

**Total Estimated Time:** 17-23 hours (2-3 days for one developer)

## 📋 How to Use These Prompts

### Option A: Execute with AI Agents (Recommended)

Each prompt in `AGENT_PROMPTS.md` is designed for autonomous agent execution:

```bash
# Prompt 1: Dashboard Sidebar
# Copy the entire "PROMPT 1" section from AGENT_PROMPTS.md
# Paste into Claude/GPT-4 with file access to your codebase

# Prompt 2: AI SDK Elements Integration
# After Prompt 1 is complete, execute this

# Prompt 3: File Tree with Code Viewer
# After Prompt 2 is complete, execute this

# Prompt 4: UI Polish
# After Prompt 3 is complete, execute this
```

### Option B: Manual Implementation

Use prompts as detailed implementation guides:
1. Read "Implementation Requirements" for step-by-step instructions
2. Follow file paths and code examples
3. Check "Acceptance Criteria" before moving to next prompt
4. Run "Testing Steps" to verify completion

## 🎨 Design Principles (Embedded in Prompts)

All prompts follow these principles:
- **Consistency:** Use existing OKLch theme and shadcn components
- **Accessibility:** WCAG AA compliance, keyboard navigation, ARIA labels
- **Performance:** Lazy loading, virtualization, optimized re-renders
- **Mobile-First:** Responsive design with touch-friendly interactions
- **Type Safety:** Full TypeScript coverage with tRPC end-to-end types

## 🏗️ Architecture Decisions

### Why AI SDK Elements?
Your current custom components (`prompt-input.tsx` = 1348 lines) are complex to maintain. AI SDK Elements:
- Built on shadcn/ui (consistent styling)
- Optimized for streaming responses
- Battle-tested by Vercel team
- Reduces codebase size by ~60%
- Automatic loading/error states

### Why Read-Only Code Viewer?
Based on your requirements:
- No editing needed (users don't modify generated code)
- Simplifies implementation (no Monaco editor overhead)
- Faster performance (lightweight syntax highlighter)
- Better mobile experience

### Why 4 Separate Prompts?
Breaking down into focused tasks:
- **Reduces context overhead** (each prompt <8k tokens)
- **Enables parallel work** (multiple agents/developers)
- **Easier debugging** (isolate issues to specific prompt)
- **Clearer progress tracking** (25% → 50% → 75% → 100%)

## 🛠️ Technical Stack (Per Prompts)

### New Dependencies to Install:
```json
{
  "ai": "^5.0.86",
  "@ai-sdk/ui-react": "latest",
  "@ai-sdk/anthropic": "latest",
  "shiki": "^1.0.0",
  "react-markdown": "latest",
  "remark-gfm": "latest",
  "rehype-highlight": "latest"
}
```

### Database Schema Changes:
```prisma
model Message {
  id        String   @id @default(cuid())
  projectId String
  role      String   // "user" | "assistant"
  content   String   @db.Text
  createdAt DateTime @default(now())
}

model File {
  id        String   @id @default(cuid())
  projectId String
  path      String   // Full path (src/App.tsx)
  content   String   @db.Text
  language  String
  createdAt DateTime @default(now())
}
```

### New API Routes:
- `POST /api/chat` - Stream LLM responses (Prompt 2)

### New tRPC Routers:
- `message` router - Save/fetch messages (Prompt 2)
- `file` router - Save/fetch generated files (Prompt 3)
- Enhanced `project` router - Recent projects, create (Prompt 1)

## 🎯 Success Criteria (Final Deliverable)

After all 4 prompts are complete:

### Functionality:
- [ ] Users can create projects from dashboard
- [ ] Sidebar shows recent 10 projects
- [ ] Chat interface streams LLM responses
- [ ] File attachments work (drag-drop, paste)
- [ ] Generated code appears in file tree
- [ ] Code viewer shows syntax highlighting
- [ ] Web preview updates when code generated
- [ ] All data persists to database
- [ ] Logout redirects to login

### Performance:
- [ ] Dashboard loads in <2s
- [ ] Chat messages stream smoothly (no lag)
- [ ] File tree handles 100+ files without lag
- [ ] Lighthouse Performance ≥90

### Accessibility:
- [ ] Keyboard navigation works (tab, arrow keys, shortcuts)
- [ ] Screen reader friendly (ARIA labels)
- [ ] Color contrast ≥4.5:1 (WCAG AA)
- [ ] Lighthouse Accessibility ≥90

### Mobile:
- [ ] Works on 375px viewport (iPhone SE)
- [ ] Touch targets ≥44x44px
- [ ] Sidebar becomes drawer on mobile
- [ ] Panels stack vertically on mobile

### Code Quality:
- [ ] Zero TypeScript errors
- [ ] Zero console warnings
- [ ] All components typed
- [ ] tRPC routers type-safe
- [ ] ESLint passes
- [ ] Prettier formatted

## 🚀 Deployment Checklist (After Implementation)

1. **Environment Variables:**
   ```bash
   # apps/server/.env
   ANTHROPIC_API_KEY=sk-ant-...

   # apps/web/.env
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com
   ```

2. **Database Migration:**
   ```bash
   bun db:generate
   bun db:migrate
   ```

3. **Build & Test:**
   ```bash
   bun build
   bun lint
   bun check-types
   ```

4. **Production Deployment:**
   - Frontend: Vercel (Next.js)
   - Backend: Railway/Fly.io (Express)
   - Database: Neon/Supabase (PostgreSQL)

## 📚 Reference Documentation

**Embedded in Prompts:**
- AI SDK Elements: https://ai-sdk.dev/elements/
- shadcn Blocks: https://ui.shadcn.com/blocks
- shadcn Block Viewer: https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/block-viewer.tsx
- Vercel AI SDK: https://ai-sdk.dev/docs
- Shiki: https://shiki.matsu.io/

**Your Codebase:**
- `CLAUDE.md` - Tech stack and patterns
- `packages/ui/src/components/` - All shadcn components
- `packages/trpc/src/` - tRPC routers and context

## 🔧 Troubleshooting Guide

### Common Issues:

**Issue:** "Cannot find module '@ai-sdk/ui-react'"
**Fix:** Run `bun install` in `apps/web` directory

**Issue:** TypeScript errors in chat components
**Fix:** Ensure `ai` package types are installed, restart TypeScript server

**Issue:** File tree not rendering
**Fix:** Check FileTree data structure matches FileNode type

**Issue:** Sidebar not persisting collapsed state
**Fix:** Verify localStorage is working, check browser console

**Issue:** Dark mode colors look wrong
**Fix:** Review `packages/ui/src/styles/globals.css`, ensure CSS variables defined

**Issue:** Web preview not loading
**Fix:** Check iframe sandbox attributes, verify CORS headers

## 🎉 Next Steps After Implementation

1. **Add OAuth Providers:** Uncomment GitHub/Google in `packages/auth/src/index.ts`
2. **Add Command Palette:** Implement Cmd+K search (use `cmdk` package)
3. **Add Collaboration:** Real-time editing with WebSockets
4. **Add Templates:** Pre-built project templates
5. **Add Export:** Deploy to Vercel/Netlify from dashboard
6. **Add Usage Tracking:** Token counting and billing
7. **Add Analytics:** PostHog/Plausible integration

## 📞 Support

If you encounter issues during implementation:
1. Check `AGENT_PROMPTS.md` for detailed requirements
2. Review existing code patterns in similar components
3. Consult `CLAUDE.md` for tech stack guidelines
4. Check shadcn/ui docs for component usage

## 📝 License & Credits

This implementation plan uses:
- shadcn/ui components (MIT License)
- Vercel AI SDK (Apache 2.0)
- Better Auth (MIT License)
- All other dependencies per package.json

---

**Ready to start?** Open `AGENT_PROMPTS.md` and copy **PROMPT 1** to begin! 🚀
