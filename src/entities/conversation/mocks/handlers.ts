import { assert } from '@reatom/core'
import { HttpResponse, delay, http } from 'msw'

import { conversationsMockData } from '#entities/conversation/mocks/data'
import { composeApiUrl } from '#shared/api'
import { Error404 } from '#shared/mocks'

import {
	CONVERSATIONS_API_PATH,
	CONVERSATIONS_UNREAD_COUNT_API_PATH,
} from '../api/conversationsApi'

export const conversationHandlers = [
	http.get(composeApiUrl(CONVERSATIONS_API_PATH), async () => {
		await delay()

		return HttpResponse.json(conversationsMockData.map(({ messages: _, ...rest }) => rest))
	}),
	http.get(composeApiUrl(CONVERSATIONS_UNREAD_COUNT_API_PATH), async () => {
		await delay()

		const unreadCount = conversationsMockData.reduce(
			(totalUnread, conversation) => totalUnread + conversation.unread,
			0,
		)

		return HttpResponse.json({ unreadCount })
	}),
	http.get(composeApiUrl(`${CONVERSATIONS_API_PATH}/:conversationId`), async ({ params }) => {
		await delay()

		const conversationId = params['conversationId']
		const conversation = conversationsMockData.find(
			(conversation) => conversation.id === conversationId,
		)
		assert(conversation, `Conversation with id ${conversationId} not found in mock data`, Error404)

		return HttpResponse.json(conversation)
	}),
]
