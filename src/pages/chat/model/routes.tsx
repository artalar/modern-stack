import type { ReactElement } from 'react'

import { retryComputed, wrap } from '@reatom/core'

import { fetchConversationById, fetchConversations } from '#entities/conversation'
import { getFirstOutletChild, rootRoute } from '#shared/router'

import { ChatPage } from '../ui/ChatPage'
import { ChatPageError } from '../ui/ChatPageError'
import { ChatPageLoading } from '../ui/ChatPageLoading'
import { MessageThread } from '../ui/MessageThread'
import { MessageThreadLoadingState } from '../ui/MessageThreadLoadingState'
import { MessageThreadNoSelection } from '../ui/MessageThreadNoSelection'
import { MessageThreadNotFound } from '../ui/MessageThreadNotFound'

export const chatRoute = rootRoute.reatomRoute(
	{
		path: 'chat',
		loader: fetchConversations,
		render: (self): ReactElement => {
			const selectedConversationId = chatConversationRoute()?.conversationId
			const loaderStatus = self.loader.status()
			const data = self.loader.data()
			if (loaderStatus.isFirstPending || (loaderStatus.isPending && data == null)) {
				return <ChatPageLoading showDetail={selectedConversationId !== undefined} />
			}
			if (data == null) {
				return <ChatPageError onRetry={wrap(() => retryComputed(self.loader))} />
			}

			return (
				<ChatPage
					conversations={data}
					selectedConversationId={selectedConversationId}
					getConversationHref={(conversationId: string) =>
						chatConversationRoute.path({ conversationId })
					}
					detail={getFirstOutletChild(self, <MessageThreadNoSelection />)}
				/>
			)
		},
	},
	'chat',
)

export const chatConversationRoute = chatRoute.reatomRoute(
	{
		path: ':conversationId',
		loader: ({ conversationId }) => fetchConversationById(conversationId),
		render: (self) => {
			const isLoadingConversation = self.loader.pending() > 0
			if (isLoadingConversation) {
				return <MessageThreadLoadingState />
			}

			const conversation = self.loader.data()
			return conversation ? (
				<MessageThread conversation={conversation} />
			) : (
				<MessageThreadNotFound conversationId={self().conversationId} />
			)
		},
	},
	'chatConversation',
)
