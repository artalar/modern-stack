import { assert } from '@reatom/core'
import { http, HttpResponse } from 'msw'

import { composeApiUrl } from '#shared/api'
import { Error400, Error404, getParam } from '#shared/mocks/utils'

import { createCounter, deleteCounter, getCounter, listCounters, updateCounterValue } from './store'

function toErrorResponse(error: unknown): Response {
	if (error instanceof Error400 || error instanceof Error404) {
		return error.response
	}
	throw error
}

export const listCountersHandler = http.get(composeApiUrl('/counters'), async () =>
	HttpResponse.json({ data: listCounters() }),
)

export const getCounterHandler = http.get(
	composeApiUrl('/counters/:counterId'),
	async ({ params }) => {
		try {
			const counterId = getParam(params['counterId'])
			assert(counterId, 'Counter id is required.', Error400)

			const counter = getCounter(counterId)
			assert(counter, `Counter "${counterId}" was not found.`, Error404)

			return HttpResponse.json({ data: counter })
		} catch (error) {
			return toErrorResponse(error)
		}
	},
)

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null
}

async function readJson(request: Request): Promise<Record<string, unknown> | null> {
	try {
		const body = await request.json()
		return isRecord(body) ? body : null
	} catch {
		return null
	}
}

export const createCounterHandler = http.post(composeApiUrl('/counters'), async ({ request }) => {
	try {
		const payload = await readJson(request)
		assert(payload, 'Request body must be valid JSON.', Error400)

		const label = payload['label']
		assert(
			typeof label === 'string' && label.trim().length > 0,
			'Field "label" is required.',
			Error400,
		)

		const value = payload['value']
		assert(
			typeof value === 'number' && Number.isFinite(value),
			'Field "value" must be a finite number.',
			Error400,
		)

		const createdCounter = createCounter({ label: label.trim(), value })
		return HttpResponse.json({ data: createdCounter }, { status: 201 })
	} catch (error) {
		return toErrorResponse(error)
	}
})

export const updateCounterValueHandler = http.patch(
	composeApiUrl('/counters/:counterId'),
	async ({ params, request }) => {
		try {
			const counterId = getParam(params['counterId'])
			assert(counterId, 'Counter id is required.', Error400)

			const payload = await readJson(request)
			assert(payload, 'Request body must be valid JSON.', Error400)

			const value = payload['value']
			assert(
				typeof value === 'number' && Number.isFinite(value),
				'Field "value" must be a finite number.',
				Error400,
			)

			const counter = updateCounterValue(counterId, value)
			assert(counter, `Counter "${counterId}" was not found.`, Error404)

			return HttpResponse.json({ data: counter })
		} catch (error) {
			return toErrorResponse(error)
		}
	},
)

export const deleteCounterHandler = http.delete(
	composeApiUrl('/counters/:counterId'),
	async ({ params }) => {
		try {
			const counterId = getParam(params['counterId'])
			assert(counterId, 'Counter id is required.', Error400)

			const isDeleted = deleteCounter(counterId)
			assert(isDeleted, `Counter "${counterId}" was not found.`, Error404)

			return new HttpResponse(null, { status: 204 })
		} catch (error) {
			return toErrorResponse(error)
		}
	},
)
