import { Button, Card } from '#shared/components'
import { styled } from '#styled-system/jsx'

type ArticlesPageErrorProps = {
	onRetry?: () => void
}

export function ArticlesPageError({ onRetry }: ArticlesPageErrorProps) {
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
			<styled.h2 fontSize="lg" fontWeight="semibold" color="red.subtle.fg" mb="2">
				Could not load articles
			</styled.h2>
			<styled.p color="red.subtle.fg" mb="4">
				We couldn&apos;t load the article list. Try again in a moment.
			</styled.p>
			{onRetry && (
				<Button
					variant="outline"
					size="sm"
					color="red.subtle.fg"
					borderColor="red.subtle.fg"
					w="fit-content"
					onClick={onRetry}
				>
					Try again
				</Button>
			)}
		</Card.Root>
	)
}
