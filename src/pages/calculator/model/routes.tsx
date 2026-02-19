import { rootRoute } from '#shared/router'

import { CalculatorPage } from '../ui/CalculatorPage'

export const calculatorRoute = rootRoute.reatomRoute(
	{
		path: 'calculator',
		render: () => <CalculatorPage />,
	},
	'calculator',
)
