import { reatomNumber, wrap } from '@reatom/core'
import { reatomFactoryComponent } from '@reatom/react'

export const Counter = reatomFactoryComponent<{ initial?: number }>(({ initial = 0 }, { name }) => {
	const countAtom = reatomNumber(initial, `${name}.count`)

	return () => (
		<div>
			<span>{countAtom()}</span>
			<button onClick={wrap(() => countAtom.decrement())}>-</button>
			<button onClick={wrap(() => countAtom.increment())}>+</button>
		</div>
	)
})
