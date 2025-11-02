import 'server-only' // <-- ensure this file cannot be imported from the client
import superjson from 'superjson'
import React, { cache } from 'react'
import { headers } from 'next/headers'
import { API_URL } from '@/utils/config'
import { auth } from '@lovico/auth/server'
import { createCaller } from '@lovico/trpc'
import { prisma as db } from '@lovico/store'
import type { AppRouter } from '@lovico/trpc'
import { makeQueryClient } from './query-client'
import { createTRPCClient, httpLink } from '@trpc/client'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import {
  createTRPCOptionsProxy,
  TRPCQueryOptions,
} from '@trpc/tanstack-react-query'

export const getQueryClient = cache(makeQueryClient)

export const trpcCaller = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return createCaller({ session, db })
})

function getUrl() {
  // const base = (() => {
  //   // if (typeof window !== 'undefined') return ''
  //   return config.getConfig('apiBaseUrl')
  // })()
  return `${API_URL}/api/trpc`
}

export const trpc = createTRPCOptionsProxy({
  client: createTRPCClient<AppRouter>({
    links: [httpLink({ url: getUrl(), transformer: superjson })],
  }),
  queryClient: getQueryClient,
})

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  )
}
export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient()
  if (queryOptions.queryKey[1]?.type === 'infinite') {
    void queryClient.prefetchInfiniteQuery(queryOptions as any)
  } else {
    void queryClient.prefetchQuery(queryOptions)
  }
}
