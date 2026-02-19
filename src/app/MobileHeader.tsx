import { reatomComponent } from '@reatom/react'

import { ArticleDetailMobileHeader } from '#pages/articles'
import { ChatConversationMobileHeader } from '#pages/chat'
import { ConnectionDetailMobileHeader } from '#pages/connections'
import { MobileHeaderTitle } from '#widgets/layout'

import {
	articleDetailRoute,
	articlesRoute,
	calculatorRoute,
	chatConversationRoute,
	chatRoute,
	connectionDetailRoute,
	connectionsRoute,
	dashboardRoute,
	itemsRoute,
	pricingRoute,
	settingsRoute,
	timelineRoute,
	timerRoute,
	usageRoute,
} from './routes'

/**
 * Routes with child routes use `.exact()` so their condition is mutually exclusive
 * with their children — ordering of cases does not matter.
 */
export const MobileHeader = reatomComponent(() => {
	if (articleDetailRoute.match()) return <ArticleDetailMobileHeader />
	if (connectionDetailRoute.match()) return <ConnectionDetailMobileHeader />
	if (chatConversationRoute.match()) return <ChatConversationMobileHeader />
	if (dashboardRoute.match()) return <MobileHeaderTitle label="Dashboard" />
	if (articlesRoute.exact()) return <MobileHeaderTitle label="Articles" />
	if (connectionsRoute.exact()) return <MobileHeaderTitle label="Connections" />
	if (itemsRoute.match()) return <MobileHeaderTitle label="Items" />
	if (chatRoute.exact()) return <MobileHeaderTitle label="Chat" />
	if (timelineRoute.match()) return <MobileHeaderTitle label="Timeline" />
	if (calculatorRoute.match()) return <MobileHeaderTitle label="Calculator" />
	if (timerRoute.match()) return <MobileHeaderTitle label="Timer" />
	if (settingsRoute.match()) return <MobileHeaderTitle label="Settings" />
	if (usageRoute.match()) return <MobileHeaderTitle label="Usage" />
	if (pricingRoute.match()) return <MobileHeaderTitle label="Pricing" />
	return null
}, 'MobileHeader')
