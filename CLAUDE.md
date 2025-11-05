# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a **full-stack TypeScript monorepo** built with Turborepo, featuring Next.js 16 (App Router), Express.js, tRPC for type-safe APIs, Better Auth for authentication, and Prisma for database management. The entire stack uses Bun as the runtime and package manager.

**Tech Stack**:

- **Frontend**: Next.js 16 + React 19 + TanStack Query + Tailwind CSS v4
- **Backend**: Express 5 with Bun runtime (cluster mode in production)
- **API**: tRPC v11 (type-safe RPC with SuperJSON)
- **Auth**: Better Auth v1.2 (email/password, ready for OAuth)
- **Database**: PostgreSQL + Prisma ORM
- **UI**: Radix UI primitives + shadcn/ui components
- **Monorepo**: Turborepo with Bun workspaces

**Packages**: `@lovico/auth`, `@lovico/trpc`, `@lovico/store`, `@lovico/ui`, `@lovico/common`, `@lovico/backend-common`

## Essential Commands

```bash
bun dev              # Start all apps (Next.js + Express) in parallel
bun dev:web          # Start only Next.js frontend (port 3000)
bun dev:server       # Start only Express backend
bun build            # Build all apps and packages

# Database
bun db:generate      # Generate Prisma client (MUST run after schema changes)
bun db:migrate       # Create and run migrations
bun db:studio        # Open Prisma Studio GUI
bun db:reset         # Reset database and run seeds

# Code Quality
bun lint             # Lint all workspaces
bun check-types      # Type-check all workspaces
bun test             # Run tests with Bun test runner
```

## Architecture

### tRPC End-to-End Type Safety

**Context Creation** (`packages/trpc/src/trpc.ts`):
Every tRPC request gets `{ session, prisma }`:

- **session**: Extracted from Better Auth headers (null if not authenticated)
- **prisma**: Database client from `@lovico/store`

**Procedures**:

- `publicProcedure` - No authentication required
- `protectedProcedure` - Requires session (throws UNAUTHORIZED if null)

**Example Router** (`packages/trpc/src/routers/user.ts`):

```typescript
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { z } from 'zod'

export const userRouter = router({
  // Public: no session required
  getUser: publicProcedure.input(z.object({ id: z.string() })).query(({ input, ctx }) => {
    return ctx.prisma.user.findUnique({ where: { id: input.id } })
  }),

  // Protected: ctx.session guaranteed to exist
  createUser: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: {
          name: input.name,
          createdBy: ctx.session.user.id, // session exists here
        },
      })
    }),
})
```

**Client Usage**:

**Server Components** (`apps/web/app/*/page.tsx`):

```typescript
import { trpcCaller } from '@/trpc/server'
import { HydrateClient, prefetch } from '@/trpc/server'

export default async function Page() {
  // Option 1: Direct call (immediate data)
  const user = await trpcCaller().user.getUser({ id: '123' })

  // Option 2: Prefetch for client hydration
  await prefetch.user.getAllUsers()

  return (
    <HydrateClient>
      {/* Client components can now use this cached data */}
      <UserList initialData={user} />
    </HydrateClient>
  )
}
```

**Client Components** (`apps/web/components/*.tsx`):

```typescript
'use client'
import { trpc } from '@/trpc/client'

export function UserList() {
  const { data, isLoading } = trpc.user.getAllUsers.useQuery()
  const createMutation = trpc.user.createUser.useMutation()

  if (isLoading) return <div>Loading...</div>
  return <div>{data?.map(u => u.name)}</div>
}
```

### Authentication Flow

**Better Auth Setup** (`packages/auth/src/index.ts`):

- PostgreSQL via Prisma adapter
- Email/password enabled (autoSignIn: false)
- Sessions stored in DB with token, expiry, IP, user agent
- Social providers ready (GitHub, Google - commented out)

**Integration**:

1. **Express**: Handler at `/api/auth/*` in `apps/server/src/app.ts`
2. **tRPC**: Session extracted from headers in `createTRPCContext()`
3. **Client**: `authClient` from `@lovico/auth/client` provides hooks

**Client Usage**:

```typescript
import { authClient } from '@lovico/auth/client'

// In React component
const session = authClient.useSession()
await authClient.signIn.email({ email, password })
await authClient.signOut()
```

### Database with Prisma

**Singleton Pattern** (`packages/store/src/index.ts`):

- Development: Global singleton prevents multiple instances during hot reload
- Production: Fresh instance per request
- Import: `import { prisma } from '@lovico/store'`

**After Schema Changes**:

1. Edit `packages/store/prisma/schema.prisma`
2. Run `bun db:generate` (regenerates TypeScript types)
3. Run `bun db:migrate` (creates and applies migration)
4. Types automatically available in tRPC routers via `ctx.prisma`

### Next.js App Router Patterns

**Server Components** (default, no `'use client'`):

```typescript
// Direct tRPC calls, no HTTP overhead
const data = await trpcCaller().user.getUser({ id })

// Prefetch for client hydration
await prefetch.user.getAllUsers()
return <HydrateClient><ClientComponent /></HydrateClient>
```

**Client Components** (`'use client'`):

```typescript
// React Query hooks
const { data } = trpc.user.getUser.useQuery({ id })
const mutation = trpc.user.create.useMutation()
```

**Important**: `@lovico/ui` package is transpiled in `next.config.js` for client compatibility

### Express Backend

**Cluster Mode** (`apps/server/src/server.ts`):

- Development: Single worker with `--watch` (auto-restart)
- Production: One worker per CPU core
- Graceful shutdown: 10s timeout for in-flight requests

**Middleware Stack** (`apps/server/src/app.ts`):

1. Helmet (security headers)
2. Morgan (HTTP logging via Winston)
3. CORS (ALLOWED_ORIGINS)
4. Better Auth: `/api/auth/*`
5. tRPC: `/api/trpc`
6. Health check: `/health`

## UI Components

### Shadcn/UI Components (PRIMARY APPROACH)

**ALWAYS use shadcn/ui components whenever possible.** Do not duplicate components that already exist.

**Adding Components** (from `apps/web` directory):

```bash
bunx --bun shadcn@latest add <component-name> -c apps/web
```

Examples:

```bash
bunx --bun shadcn@latest add button -c apps/web
bunx --bun shadcn@latest add dialog -c apps/web
bunx --bun shadcn@latest add form -c apps/web
```

**Use shadcn MCP server to search for available components.**

**Where Components Live**:

- shadcn components: `apps/web/components/ui/` (after adding)
- Shared UI package: `packages/ui/src/components/` (Radix UI + Tailwind)
- Check both locations before creating new components

**Shadcn Docs**: https://ui.shadcn.com/docs/components

### Component Libraries Used:

- **shadcn/ui**: Primary component library (Radix UI + Tailwind)
- **Radix UI**: Low-level primitives
- **Lucide React**: Icons
- **Tailwind CSS v4**: Styling
- **Motion (Framer Motion)**: Animations

## Important Constraints

### Package Manager

- **Bun ONLY**: Enforced by preinstall script (`only-allow bun`)
- Use `bunx` instead of `npx`
- Use `bun install` instead of `npm install`
- Use `bun run` instead of `npm run`

### Module Format

- **ESM ONLY**: All packages use `"type": "module"`
- No CommonJS in this monorepo

### Development Workflow

1. After Prisma schema changes: `bun db:generate` → `bun db:migrate`
2. After package changes: Restart dev servers
3. Before commits: Husky runs lint-staged (ESLint + Prettier)

### Type Safety

- TypeScript strict mode enabled
- tRPC provides end-to-end type inference (no manual API typing)
- Zod validates all inputs/outputs

### Protected Routes

Always use `protectedProcedure` for authenticated endpoints:

```typescript
export const privateRouter = router({
  getUserData: protectedProcedure.query(({ ctx }) => {
    // ctx.session.user.id is guaranteed to exist
    return ctx.prisma.user.findUnique({ where: { id: ctx.session.user.id } })
  }),
})
```

## Common Workflows

### Adding a New tRPC Route

1. Create router: `packages/trpc/src/routers/myRouter.ts`
2. Add to `packages/trpc/src/routers/_app.ts`:

```typescript
import { myRouter } from './myRouter'
export const appRouter = router({
  // ...existing routers
  my: myRouter,
})
```

3. Use in Next.js (types auto-complete):

```typescript
// Server: await trpcCaller().my.getData()
// Client: trpc.my.getData.useQuery()
```

### Adding a Database Model

1. Edit `packages/store/prisma/schema.prisma`
2. Run `bun db:generate && bun db:migrate`
3. Types immediately available in tRPC via `ctx.prisma.newModel.*`

### Adding UI Components

**First choice**: Use shadcn/ui

```bash
bunx --bun shadcn@latest add button -c apps/web
```

**If custom needed**: Create in `packages/ui/src/components/` and export

## Environment Variables

Required in `apps/server/.env`:

```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/lovico
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:4000
PORT=4000
ALLOWED_ORIGINS=http://localhost:3000
```

Required in `apps/web/.env`:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:4000
```
