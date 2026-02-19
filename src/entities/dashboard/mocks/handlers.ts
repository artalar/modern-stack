import { HttpResponse, delay, http } from 'msw'

import { DASHBOARD_API_PATH } from '#entities/dashboard/api/dashboardApi'
import { dashboardMockData } from '#entities/dashboard/mocks/data'
import { composeApiUrl } from '#shared/api'

export const dashboardHandlers = [
	http.get(composeApiUrl(DASHBOARD_API_PATH), async () => {
		await delay()

		return HttpResponse.json(dashboardMockData)
	}),
]
