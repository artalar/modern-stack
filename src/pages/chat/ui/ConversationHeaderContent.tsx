import type { Conversation } from '#entities/conversation'

import { Avatar } from '#shared/components'
import { styled } from '#styled-system/jsx'

export function ConversationHeaderContent({ conversation }: { conversation: Conversation }) {
	return (
		<styled.div display="flex" alignItems="center" gap="3">
			<Avatar.Root w="8" h="8">
				<Avatar.Fallback
					name={conversation.name}
					bg="colorPalette.3"
					fontSize="xs"
					fontWeight="bold"
					color="colorPalette.11"
				/>
			</Avatar.Root>
			<styled.div>
				<styled.div fontWeight="medium" fontSize="sm">
					{conversation.name}
				</styled.div>
				<styled.div fontSize="xs" color="gray.11">
					{conversation.online ? 'Online' : 'Offline'}
				</styled.div>
			</styled.div>
		</styled.div>
	)
}
