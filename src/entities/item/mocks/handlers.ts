import { assert } from '@reatom/core'
import { HttpResponse, delay, http } from 'msw'

import { itemsMockData } from '#entities/item/mocks/data'
import { composeApiUrl } from '#shared/api'
import { Error404 } from '#shared/mocks'

import { ITEMS_API_PATH } from '../api/itemsApi'

export const itemHandlers = [
	http.get(composeApiUrl(ITEMS_API_PATH), async () => {
		await delay()

		return HttpResponse.json(itemsMockData)
	}),
	http.get(composeApiUrl(`${ITEMS_API_PATH}/:itemId`), async ({ params }) => {
		await delay()

		const itemId = params['itemId']
		const item = itemsMockData.find((item) => item.id === itemId)
		assert(item, `Item with id ${itemId} not found in mock data`, Error404)

		return HttpResponse.json(item)
	}),
]
