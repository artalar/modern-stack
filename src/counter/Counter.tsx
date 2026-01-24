import { useState } from 'react'

export function Counter({ initial = 0 }: { initial?: number }) {
	const [count, setCount] = useState(initial)

	return (
		<div>
			<span>{count}</span>
			<button onClick={() => setCount((c) => c - 1)}>-</button>
			<button onClick={() => setCount((c) => c + 1)}>+</button>
		</div>
	)
}
