import type { RouteChild } from '@reatom/core'

import { computed, reatomRoute, type RouteAtom } from '@reatom/core'
import { createElement, Fragment } from 'react'

export type RouteMeta = {
	back?: { href: string; label: string }
}

export const withRouteMeta =
	<T extends RouteAtom<any, any, any>>(meta: (route: T) => RouteMeta) =>
	(route: T) => ({ meta: computed(() => meta(route)) })

type OutletHost<TChild> = {
	outlet: () => Iterable<TChild | false | null | undefined>
}

export function getFirstOutletChild(
	host: OutletHost<RouteChild>,
	fallback: RouteChild = createElement(Fragment),
): RouteChild {
	for (const child of host.outlet()) {
		if (child) return child
	}
	return fallback
}

export const rootRoute = reatomRoute(
	{ path: '', render: (self) => getFirstOutletChild(self, createElement(Fragment)) },
	'rootRoute',
)
