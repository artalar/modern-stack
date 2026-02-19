import { noop, urlAtom, withChangeHook } from '@reatom/core'

// Configure urlAtom for Storybook: routing state works internally but
// the iframe URL stays fixed so Storybook remains happy.
// Must run before reatom.init (clearStack) since it needs a context frame.
const originalHref = window.location.href
urlAtom.sync.set(() => noop)
urlAtom.extend(
	withChangeHook(() => {
		window.history.replaceState({}, '', originalHref)
	}),
)
