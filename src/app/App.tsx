import { withConnectHook } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { styled } from '#styled-system/jsx'
import { AppShell } from '#widgets/layout'

import { MobileHeader } from './MobileHeader'
import { OrgSwitcher } from './OrgSwitcher'
import { dashboardRoute, rootRoute } from './routes'
import { SidebarFooterNavigation } from './SidebarFooterNavigation'
import { SidebarNavigation } from './SidebarNavigation'

rootRoute.extend(
	withConnectHook((target) => {
		return target.exact.subscribe((isExact) => {
			if (isExact) {
				dashboardRoute.go(undefined, true)
			}
		})
	}),
)

export const App = reatomComponent(() => {
	return (
		<AppShell
			sidebarHeader={
				<styled.h2 fontSize="lg" fontWeight="bold">
					Modern Stack
				</styled.h2>
			}
			sidebarContent={<SidebarNavigation />}
			sidebarFooter={
				<styled.div display="flex" flexDirection="column" gap="3">
					<SidebarFooterNavigation />
					<OrgSwitcher />
				</styled.div>
			}
			mobileHeader={<MobileHeader />}
		>
			{rootRoute.render()}
		</AppShell>
	)
}, 'App')
