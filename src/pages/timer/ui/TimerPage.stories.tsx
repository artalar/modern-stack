import preview from '#.storybook/preview'
import { createMyself, type Locator } from '#shared/test'

import { TimerPage } from './TimerPage'

type Canvas = Parameters<Locator>[0]

const loc = {
	heading: (canvas: Canvas) => canvas.findByRole('heading', { name: 'Timer' }),
	display: (canvas: Canvas) => canvas.findByText(/\d{2}:\d{2}/),
	startBtn: (canvas: Canvas) => canvas.findByRole('button', { name: 'Start' }),
	pauseBtn: (canvas: Canvas) => canvas.findByRole('button', { name: 'Pause' }),
	resetBtn: (canvas: Canvas) => canvas.findByRole('button', { name: 'Reset' }),
	durationBtn: (canvas: Canvas, label: string) => canvas.findByRole('button', { name: label }),
} satisfies Record<string, Locator | ((canvas: Canvas, label: string) => Promise<HTMLElement>)>

const I = createMyself((I) => ({
	seeTime: async (time: string) => {
		await I.seeText(loc.display, time)
	},
}))

const meta = preview.meta({
	component: TimerPage,
	parameters: { layout: 'centered' },
	loaders: [(ctx) => void I.init(ctx)],
})

export default meta

export const Default = meta.story({})

Default.test('renders timer and starts/pauses/resets', async () => {
	await I.see(loc.heading)
	await I.seeTime('05:00')

	await I.click(loc.startBtn)
	await I.see(loc.pauseBtn)

	// We can't easily wait for a tick in storybook-test without mocked timers
	// but we can verify the button toggles.

	await I.click(loc.pauseBtn)
	await I.see(loc.startBtn)

	await I.click(loc.resetBtn)
	await I.seeTime('05:00')
})

Default.test('changes duration', async () => {
	await I.click((canvas) => loc.durationBtn(canvas, '1m'))
	await I.seeTime('01:00')

	await I.click((canvas) => loc.durationBtn(canvas, '10m'))
	await I.seeTime('10:00')

	await I.click((canvas) => loc.durationBtn(canvas, '5m'))
	await I.seeTime('05:00')
})
