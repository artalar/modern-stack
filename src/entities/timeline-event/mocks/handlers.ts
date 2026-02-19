import { assert } from '@reatom/core'
import { HttpResponse, delay, http } from 'msw'

import { timelineEventsMockData } from '#entities/timeline-event/mocks/data'
import { composeApiUrl } from '#shared/api'
import { Error404 } from '#shared/mocks'

import { TIMELINE_EVENTS_API_PATH } from '../api/timelineEventsApi'

export const timelineEventHandlers = [
	http.get(composeApiUrl(TIMELINE_EVENTS_API_PATH), async () => {
		await delay()

		return HttpResponse.json(timelineEventsMockData.map(({ description: _, ...rest }) => rest))
	}),
	http.get(composeApiUrl(`${TIMELINE_EVENTS_API_PATH}/:timelineEventId`), async ({ params }) => {
		await delay()

		const timelineEventId = params['timelineEventId']
		const timelineEvent = timelineEventsMockData.find(
			(timelineEvent) => timelineEvent.id === timelineEventId,
		)
		assert(
			timelineEvent,
			`Timeline event with id ${timelineEventId} not found in mock data`,
			Error404,
		)

		return HttpResponse.json(timelineEvent)
	}),
]
