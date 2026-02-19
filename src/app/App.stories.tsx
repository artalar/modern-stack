import preview from '#.storybook/preview'

import { App } from './App'

const meta = preview.meta({
	component: App,
	parameters: { layout: 'fullscreen' },
})

export default meta

export const Default = meta.story({})

export const Mobile = meta.story({
	globals: { viewport: { value: 'sm', isRotated: false } },
})
