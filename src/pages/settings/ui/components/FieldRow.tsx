import type { ReactNode } from 'react'

import { styled } from '#styled-system/jsx'

type FieldRowProps = {
	label: string
	description?: string
	children: ReactNode
}

export function FieldRow({ label, description, children }: FieldRowProps) {
	return (
		<styled.div
			display="flex"
			flexDirection={{ base: 'column', md: 'row' }}
			gap={{ base: '1', md: '4' }}
			alignItems={{ md: 'center' }}
		>
			<styled.div flex="1" minW="0">
				<styled.label fontWeight="medium" fontSize="sm">
					{label}
				</styled.label>
				{description && (
					<styled.p fontSize="xs" color="gray.11" mt="0.5">
						{description}
					</styled.p>
				)}
			</styled.div>
			<styled.div w={{ md: '300px' }} flexShrink={0}>
				{children}
			</styled.div>
		</styled.div>
	)
}
