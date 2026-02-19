import type { RequestHandler } from 'msw'

import { articleHandlers } from '#entities/article/mocks/handlers'
import { connectionHandlers } from '#entities/connection/mocks/handlers'
import { conversationHandlers } from '#entities/conversation/mocks/handlers'
import { dashboardHandlers } from '#entities/dashboard/mocks/handlers'
import { itemHandlers } from '#entities/item/mocks/handlers'
import { timelineEventHandlers } from '#entities/timeline-event/mocks/handlers'

export const handlersArray = [
	...dashboardHandlers,
	...articleHandlers,
	...connectionHandlers,
	...itemHandlers,
	...conversationHandlers,
	...timelineEventHandlers,
] satisfies RequestHandler[]
