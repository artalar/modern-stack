import { retryComputed, wrap } from '@reatom/core'

import { fetchTimelineEvents } from '#entities/timeline-event'
import { rootRoute } from '#shared/router'

import { TimelinePage } from '../ui/TimelinePage'
import { TimelinePageError } from '../ui/TimelinePageError'
import { TimelinePageLoading } from '../ui/TimelinePageLoading'

export const timelineRoute = rootRoute.reatomRoute(
	{
		path: 'timeline',
		loader: fetchTimelineEvents,
		render: (self) => {
			const loaderStatus = self.loader.status()
			const data = self.loader.data()
			if (loaderStatus.isFirstPending || (loaderStatus.isPending && data == null)) {
				return <TimelinePageLoading />
			}
			if (data == null) {
				return <TimelinePageError onRetry={wrap(() => retryComputed(self.loader))} />
			}
			return <TimelinePage events={data} />
		},
	},
	'timeline',
)
