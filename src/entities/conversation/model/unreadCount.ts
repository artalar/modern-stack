import { atom, withConnectHook, wrap } from '@reatom/core'

import { fetchConversationsUnreadCount } from '#entities/conversation/api/conversationsApi'

export const conversationUnreadCountAtom = atom<number | null>(
	null,
	'conversationUnreadCountAtom',
).extend(
	withConnectHook(async () => {
		const unreadCount = await wrap(fetchConversationsUnreadCount())
		conversationUnreadCountAtom.set(unreadCount)
	}),
)
