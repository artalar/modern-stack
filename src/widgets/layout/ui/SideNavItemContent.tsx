import type { ComponentType, ReactNode } from 'react'

import { css } from '#styled-system/css'
import { styled } from '#styled-system/jsx'

type Props = {
	Icon: ComponentType<{ className?: string }>
	label: string
	trailing?: ReactNode
}

export function SideNavItemContent({ Icon, label, trailing }: Props) {
	return (
		<styled.span display="inline-flex" alignItems="center" gap="2" w="100%" minW="0">
			<Icon className={css({ w: '4', h: '4', flexShrink: '0' })} />
			<styled.span flex="1" minW="0" truncate>
				{label}
			</styled.span>
			{trailing}
		</styled.span>
	)
}
