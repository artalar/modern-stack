import { styled } from '#styled-system/jsx'

import { ConversationListLoading } from './components/ConversationListLoading'
import { MessageThreadLoadingState } from './MessageThreadLoadingState'

export function ChatPageLoading({ showDetail }: { showDetail: boolean }) {
	return (
		<div role="status" aria-label="Loading chat page">
			<div inert>
				<styled.div display={{ base: 'none', md: 'flex' }}>
					<styled.div
						w="320px"
						flexShrink={0}
						borderRightWidth="1px"
						borderColor="gray.4"
						h="100dvh"
						position="sticky"
						top="0"
						overflowY="auto"
					>
						<ConversationListLoading />
					</styled.div>
					<styled.div flex="1" minW="0">
						<MessageThreadLoadingState />
					</styled.div>
				</styled.div>

				<styled.div display={{ base: 'block', md: 'none' }}>
					{showDetail ? <MessageThreadLoadingState /> : <ConversationListLoading />}
				</styled.div>
			</div>
		</div>
	)
}
