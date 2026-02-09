import { reatomNumber } from '@reatom/core'
import { reatomComponent } from '@reatom/react'

import { Counter } from '#counter/Counter.tsx'
import { styled } from '#styled-system/jsx'
import { container } from '#styled-system/patterns'

const counterAtom1 = reatomNumber(10, 'counter1')
const counterAtom2 = reatomNumber(20, 'counter2')

export const App = reatomComponent(function App() {
	return (
		<main className={container({ maxW: '4xl', p: '8' })}>
			<styled.h1 fontSize="4xl" fontWeight="bold" mb="6">
				Modern Stack
			</styled.h1>
			<styled.h2 fontSize="2xl" fontWeight="semibold" mb="4">
				Main counter
			</styled.h2>
			<Counter countAtom={counterAtom1} />
			<styled.h2 fontSize="2xl" fontWeight="semibold" mb="4" mt="8">
				Secondary counter
			</styled.h2>
			<Counter countAtom={counterAtom2} />
		</main>
	)
})
