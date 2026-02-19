import { Card } from '#shared/components'
import { styled } from '#styled-system/jsx'

export function ArticleNotFound({ articleId }: { articleId: string }) {
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
				Article not found
			</styled.h2>
			<styled.p color="red.subtle.fg">No article exists for id "{articleId}".</styled.p>
		</Card.Root>
	)
}
