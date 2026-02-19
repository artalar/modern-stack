// Inspired by codecept.js
import { expect, waitFor, within } from 'storybook/test'

type Canvas = ReturnType<typeof within>

export type Locator = (canvas: Canvas) => HTMLElement | null | Promise<HTMLElement | null>
export type DefiniteLocator = (canvas: Canvas) => HTMLElement | Promise<HTMLElement>
export type ArrayLocator = (canvas: Canvas) => Array<HTMLElement> | Promise<Array<HTMLElement>>
export type AnyLocator = Locator | ArrayLocator

type UserEvent = {
	click: (element: Element) => Promise<void>
	type: (element: Element, text: string, options?: object) => Promise<void>
	tab: () => Promise<void>
	clear: (element: Element) => Promise<void>
}

type TestCtx = {
	canvas: Canvas
	userEvent: UserEvent
	canvasElement: HTMLElement
}

export type BaseI = {
	resolveLocator: <T extends AnyLocator>(locator: T) => Promise<Awaited<ReturnType<T>>>
	see: (locator: Locator) => Promise<HTMLElement>
	dontSee: (locator: Locator) => Promise<void>
	seeText: (locator: Locator, text: string | RegExp) => Promise<void>
	seeInField: (locator: DefiniteLocator, value: string | number) => Promise<void>
	click: (locator: DefiniteLocator) => Promise<void>
	fill: (locator: DefiniteLocator, value: string) => Promise<void>
	clear: (locator: DefiniteLocator) => Promise<void>
	selectOption: (locator: DefiniteLocator, value: string | RegExp) => Promise<void>
}

export const createMyself = <T extends Record<string, unknown>>(extension: (base: BaseI) => T) => {
	let _ctx: TestCtx | null = null

	function ctx(): TestCtx {
		if (_ctx === null) throw new Error('I.init(ctx) must be called before using I methods')
		return _ctx
	}

	async function resolveLocator<L extends AnyLocator>(locator: L): Promise<Awaited<ReturnType<L>>> {
		return (await locator(ctx().canvas)) as Awaited<ReturnType<L>>
	}

	const click = async (locator: DefiniteLocator) => {
		const el = await resolveLocator(locator)
		await ctx().userEvent.click(el)
	}

	const base: BaseI = {
		resolveLocator,
		see: async (locator) => {
			const el = await resolveLocator(locator)
			expect(el).toBeInTheDocument()
			if (el === null) throw new Error('Element not found by locator')
			return el
		},
		dontSee: async (locator) => {
			expect(await resolveLocator(locator)).toBeNull()
		},
		seeText: async (locator, text) => {
			const el = await resolveLocator(locator)
			if (el === null) throw new Error('Element not found by locator')
			expect(el).toHaveTextContent(text)
		},
		seeInField: async (locator, value) => {
			const el = await resolveLocator(locator)
			if (el === null) throw new Error('Element not found by locator')
			expect(el).toHaveValue(value)
		},
		click,
		fill: async (locator, value) => {
			const { userEvent } = ctx()
			await waitFor(async () => {
				const el = await resolveLocator(locator)
				if (!(el instanceof HTMLInputElement)) throw new Error('Element is not an HTMLInputElement')
				await userEvent.click(el)
				await userEvent.type(el, value, {
					initialSelectionStart: 0,
					initialSelectionEnd: el.value.length,
				})
				expect(el.value).toBe(value)
			})
			await userEvent.tab()
		},
		selectOption: async (locator, value) => {
			const { canvasElement } = ctx()
			const rootCanvas = within(canvasElement.ownerDocument.body)
			await click(locator)
			await click((_canvas) => rootCanvas.getByRole('option', { name: value }))
		},
		clear: async (locator) => {
			const { userEvent } = ctx()
			await waitFor(async () => {
				const el = await resolveLocator(locator)
				if (!(el instanceof HTMLInputElement)) throw new Error('Element is not an HTMLInputElement')
				await userEvent.click(el)
				await userEvent.clear(el)
				expect(el.value).toBe('')
			})
		},
	}

	const custom = extension(base)

	return Object.assign({}, base, custom, {
		init: (context: TestCtx) => {
			_ctx = context
		},
	})
}
