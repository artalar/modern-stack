import { noop, urlAtom, withChangeHook } from '@reatom/core'

const originalHref = window.location.href
export const setupStorybookUrl = () => {
	// Configure urlAtom for Storybook: routing state works internally but
	// the iframe URL stays fixed so Storybook remains happy.
	// @ts-expect-error - Expose urlAtom globally for debugging and Storybook controls
	window.urlAtom = urlAtom
	urlAtom.sync.set(() => noop)
	urlAtom.extend(withChangeHook(() => void window.history.replaceState({}, '', originalHref)))
}
