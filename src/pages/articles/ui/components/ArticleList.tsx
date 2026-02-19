import type { Article } from '#entities/article'

import { styled } from '#styled-system/jsx'

import { ArticleListItem } from './ArticleListItem'

type ArticleListProps = {
	articles: Article[]
	selectedId: string | undefined
	getArticleHref: (articleId: string) => string
}

export function ArticleList({ articles, selectedId, getArticleHref }: ArticleListProps) {
	return (
		<>
			<styled.h3 fontSize="sm" fontWeight="semibold" p="4" color="gray.11">
				Articles
			</styled.h3>
			{articles.map((article) => (
				<ArticleListItem
					key={article.id}
					article={article}
					href={getArticleHref(article.id)}
					isSelected={selectedId === article.id}
				/>
			))}
		</>
	)
}
