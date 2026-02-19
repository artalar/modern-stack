import { assert } from '@reatom/core'
import { HttpResponse, delay, http } from 'msw'

import { articlesMockData } from '#entities/article/mocks/data'
import { composeApiUrl } from '#shared/api'
import { Error404 } from '#shared/mocks'

import { ARTICLES_API_PATH } from '../api/articlesApi'

export const articleHandlers = [
	http.get(composeApiUrl(ARTICLES_API_PATH), async () => {
		await delay()

		return HttpResponse.json(
			articlesMockData.map(({ content, ...rest }) => ({ ...rest, content: [content[0]] })),
		)
	}),
	http.get(composeApiUrl(`${ARTICLES_API_PATH}/:articleId`), async ({ params }) => {
		await delay()

		const articleId = params['articleId']
		const article = articlesMockData.find((article) => article.id === articleId)
		assert(article, `Article with id ${articleId} not found in mock data`, Error404)

		return HttpResponse.json(article)
	}),
]
