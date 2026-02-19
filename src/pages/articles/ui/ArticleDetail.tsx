import type { Article } from '#entities/article'

import { styled } from '#styled-system/jsx'

import { ArticleStatusBadge } from './components/ArticleStatusBadge'

export function ArticleDetail({ article }: { article: Article }) {
	return (
		<styled.div p="8">
			<styled.div display="flex" alignItems="center" gap="3" mb="6">
				<styled.h1 fontSize="2xl" fontWeight="bold">
					{article.title}
				</styled.h1>
				<ArticleStatusBadge status={article.status} />
			</styled.div>
			<styled.p color="gray.11" fontSize="sm" lineHeight="relaxed">
				{article.description}
			</styled.p>
			<styled.div display="grid" gap="4" mt="6">
				{article.content.map((paragraph, index) => (
					<styled.p key={index} color="gray.11" fontSize="sm" lineHeight="relaxed">
						{paragraph}
					</styled.p>
				))}
			</styled.div>
		</styled.div>
	)
}
