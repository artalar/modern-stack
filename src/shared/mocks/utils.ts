import { noop } from '@reatom/core'
import { HttpResponse, type JsonBodyType } from 'msw'

export function getParam(param: string | readonly string[] | undefined) {
	if (typeof param === 'string') {
		return param
	}
	if (Array.isArray(param)) {
		return param[0]
	}
	return undefined
}

function toHttpError(status: number, payload: JsonBodyType = { error: [] }) {
	return HttpResponse.json(payload, { status })
}

function createHttpErrorClass(status: number, name: string) {
	return class extends Error {
		readonly response: Response

		constructor(...args: ConstructorParameters<typeof Error>) {
			super(...args)
			this.name = name
			this.response = toHttpError(status, { error: { message: args[0] } })
		}
	}
}

export const Error400 = createHttpErrorClass(400, 'Error400')
export const Error404 = createHttpErrorClass(404, 'Error404')
export const Error500 = createHttpErrorClass(500, 'Error500')

export function to400(payload?: JsonBodyType) {
	return toHttpError(400, payload)
}

export function to404(payload?: JsonBodyType) {
	return toHttpError(404, payload)
}

export function to500(payload?: JsonBodyType) {
	return toHttpError(500, payload)
}

export async function neverResolve(): Promise<never> {
	return new Promise(noop)
}
