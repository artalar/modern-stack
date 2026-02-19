import { assert } from '@reatom/core'
import { HttpResponse, delay, http } from 'msw'

import { connectionsMockData } from '#entities/connection/mocks/data'
import { composeApiUrl } from '#shared/api'
import { Error404 } from '#shared/mocks'

import { CONNECTIONS_API_PATH } from '../api/connectionsApi'

export const connectionHandlers = [
	http.get(composeApiUrl(CONNECTIONS_API_PATH), async () => {
		await delay()

		return HttpResponse.json(connectionsMockData.map(({ details: _, ...rest }) => rest))
	}),
	http.get(composeApiUrl(`${CONNECTIONS_API_PATH}/:connectionId`), async ({ params }) => {
		await delay()

		const connectionId = params['connectionId']
		const connection = connectionsMockData.find((connection) => connection.id === connectionId)
		assert(connection, `Connection with id ${connectionId} not found in mock data`, Error404)

		return HttpResponse.json(connection)
	}),
]
