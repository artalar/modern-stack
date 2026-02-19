import { reatomBoolean, wrap } from '@reatom/core'
import { reatomComponent } from '@reatom/react'
import { Menu, X } from 'lucide-react'
import { type ReactNode } from 'react'

import { Drawer, IconButton } from '#shared/components'
import { css } from '#styled-system/css'
import { styled } from '#styled-system/jsx'

import { GlobalLoader } from './GlobalLoader'

type AppShellProps = {
	sidebarHeader: ReactNode
	sidebarContent: ReactNode
	sidebarFooter: ReactNode
	mobileHeader: ReactNode
	children: ReactNode
}

const sidebarAtom = reatomBoolean(false)

export const AppShell = reatomComponent(
	({ sidebarHeader, sidebarContent, sidebarFooter, mobileHeader, children }: AppShellProps) => {
		const sidebarPanel = (isMobile: boolean) => (
			<>
				<styled.div display="flex" alignItems="center" justifyContent="space-between" mb="3">
					<styled.div flex="1" px="2">
						{sidebarHeader}
					</styled.div>
					{isMobile ? (
						<IconButton
							variant="plain"
							size="sm"
							display={{ base: 'inline-flex', md: 'none' }}
							onClick={wrap(sidebarAtom.setFalse)}
						>
							<X className={css({ w: '4', h: '4' })} />
						</IconButton>
					) : null}
				</styled.div>
				<styled.div
					flex="1"
					minH="0"
					overflowY="auto"
					display="flex"
					flexDirection="column"
					gap="1"
				>
					{sidebarContent}
				</styled.div>
				{sidebarFooter && (
					<styled.div mt="auto" pt="3" borderTopWidth="1px" borderColor="gray.4">
						{sidebarFooter}
					</styled.div>
				)}
			</>
		)

		return (
			<styled.div display="flex" minH="100dvh" position="relative">
				<Drawer.Root
					open={sidebarAtom()}
					onOpenChange={wrap(({ open }) => void sidebarAtom.set(open))}
					placement="start"
				>
					<Drawer.Backdrop display={{ base: 'block', md: 'none' }} />
					<Drawer.Positioner display={{ base: 'flex', md: 'none' }}>
						<Drawer.Content maxW="220px" p="4" gap="1">
							{sidebarPanel(true)}
						</Drawer.Content>
					</Drawer.Positioner>
				</Drawer.Root>

				<styled.aside
					w="240px"
					flexShrink={0}
					bg="gray.2"
					borderRightWidth="1px"
					borderColor="gray.4"
					display={{ base: 'none', md: 'flex' }}
					flexDirection="column"
					p="4"
					gap="1"
					position={{ md: 'sticky' }}
					top="0"
					alignSelf={{ md: 'flex-start' }}
					h="100dvh"
					overflowY="auto"
				>
					{sidebarPanel(false)}
				</styled.aside>

				<styled.div display="flex" flex="1" flexDirection="column" minW="0">
					<styled.header
						display={{ base: 'flex', md: 'none' }}
						alignItems="center"
						gap="2"
						p="3"
						borderBottomWidth="1px"
						borderColor="gray.4"
						className={css({
							'&:has(> a)': {
								'& > button:first-child': {
									display: 'none',
								},
							},
						})}
					>
						<IconButton variant="plain" size="sm" onClick={wrap(sidebarAtom.setTrue)}>
							<Menu className={css({ w: '5', h: '5' })} />
						</IconButton>
						{mobileHeader}
					</styled.header>
					{children}
				</styled.div>
				<GlobalLoader />
			</styled.div>
		)
	},
	'AppShell',
)
