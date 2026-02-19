import { retryComputed, wrap } from '@reatom/core'

import { fetchItems } from '#entities/item'
import { rootRoute } from '#shared/router'

import { ItemsPage } from '../ui/ItemsPage'
import { ItemsPageError } from '../ui/ItemsPageError'
import { ItemsPageLoading } from '../ui/ItemsPageLoading'

export const itemsRoute = rootRoute.reatomRoute(
	{
		path: 'items',
		loader: fetchItems,
		render: (self) => {
			const loaderStatus = self.loader.status()
			const data = self.loader.data()
			if (loaderStatus.isFirstPending || (loaderStatus.isPending && data == null)) {
				return <ItemsPageLoading />
			}
			if (data == null) {
				return <ItemsPageError onRetry={wrap(() => retryComputed(self.loader))} />
			}
			return <ItemsPage items={data} />
		},
	},
	'items',
)
