import { apiClient } from '#shared/api'

export type CounterEntity = {
	id: string
	label: string
	value: number
}

type CountersListResponse = {
	data: CounterEntity[]
}

export async function getCounters(): Promise<CounterEntity[]> {
	const response = await apiClient.get<CountersListResponse>('/counters')
	return response.data
}

type CounterResponse = {
	data: CounterEntity
}

export async function createCounter(input: {
	label: string
	value: number
}): Promise<CounterEntity> {
	const response = await apiClient.post<CounterResponse>('/counters', { body: input })
	return response.data
}

export async function updateCounterValue(counterId: string, value: number): Promise<CounterEntity> {
	const response = await apiClient.patch<CounterResponse>(`/counters/${counterId}`, {
		body: { value },
	})
	return response.data
}

export async function deleteCounter(counterId: string): Promise<void> {
	await apiClient.delete<null>(`/counters/${counterId}`)
}
