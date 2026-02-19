import { rootRoute } from '#shared/router'

import { TimerPage } from '../ui/TimerPage'

export const timerRoute = rootRoute.reatomRoute(
	{
		path: 'timer',
		render: () => <TimerPage />,
	},
	'timer',
)
