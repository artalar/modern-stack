import { Card } from '#shared/components'
import { styled } from '#styled-system/jsx'

export function ConnectionNotFound({ connectionId }: { connectionId: string }) {
	return (
		<Card.Root
			role="alert"
			p="8"
			borderWidth="1px"
			borderColor="red.subtle.fg"
			borderRadius="xl"
			bg="red.subtle.bg"
			m="8"
		>
			<styled.h2 fontSize="xl" fontWeight="semibold" color="red.subtle.fg" mb="2">
				Connection not found
			</styled.h2>
			<styled.p color="red.subtle.fg">No connection exists for id "{connectionId}".</styled.p>
		</Card.Root>
	)
}
