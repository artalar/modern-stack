import { computed, withAsyncData, withConnectHook } from '@reatom/core'

import { fetchConversationsUnreadCount } from '#entities/conversation/api/conversationsApi'

export const conversationUnreadCountAtom = computed(
	() => fetchConversationsUnreadCount(),
	'conversationUnreadCountAtom',
).extend(
	withAsyncData(),
	withConnectHook((target) => {
		if (!target.ready()) target.retry()
	}),
)
