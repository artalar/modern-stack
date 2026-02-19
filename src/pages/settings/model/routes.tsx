import { rootRoute } from '#shared/router'

import { SettingsPage } from '../ui/SettingsPage'

export const settingsRoute = rootRoute.reatomRoute(
	{
		path: 'settings',
		render: () => <SettingsPage />,
	},
	'settings',
)
