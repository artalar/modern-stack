import { assert, wrap } from '@reatom/core'
import { bindField, reatomComponent } from '@reatom/react'
import { Fragment, type ReactNode } from 'react'

import { Counter } from '#counter/Counter.tsx'
import { Button } from '#shared/components/ui'
import { styled } from '#styled-system/jsx'
import { container } from '#styled-system/patterns'

import { rootRoute } from './routes'

function PageShell({ children }: { children: ReactNode }): ReactNode {
	return (
		<main className={container({ maxW: '4xl', p: '8' })}>
			<styled.h1 fontSize="4xl" fontWeight="bold" mb="6">
				Modern Stack
			</styled.h1>
			{children}
		</main>
	)
}

const FieldError = reatomComponent(function FieldError({
	field,
}: {
	field: { validation: () => { triggered: boolean; error: string | undefined } }
}) {
	const { triggered, error } = field.validation()
	if (!triggered || !error) {
		return null
	}
	return (
		<styled.p color="red.700" fontSize="sm">
			{error}
		</styled.p>
	)
}, 'FieldError')

export const App = reatomComponent(function App() {
	const match = rootRoute()

	if (!match) {
		return null
	}

	const pending = rootRoute.loader.pending()
	const ready = rootRoute.loader.ready()
	const error = rootRoute.loader.error()

	if (!ready && pending === 0 && !error) {
		void wrap(rootRoute.loader()).catch(() => undefined)
	}

	if (error) {
		return (
			<PageShell>
				<styled.p color="red.700">Failed to load counters.</styled.p>
			</PageShell>
		)
	}

	if (!ready) {
		return (
			<PageShell>
				<styled.p>Loading counters...</styled.p>
			</PageShell>
		)
	}

	const data = rootRoute.loader.data()
	assert(data, 'Root route data is required')
	const {
		counters,
		createCounterForm,
		submitCreateCounter,
		submitCreateCounterForm,
		deleteCounter,
	} = data
	const handleCreateCounterSubmit = wrap(submitCreateCounterForm)
	const counterItems = counters()
	const isCreateSubmitting = !submitCreateCounter.ready()
	const createSubmitError =
		createCounterForm.validation().errors.length === 0
			? submitCreateCounter.error()?.message
			: undefined
	const { error: _nameError, ...nameFieldProps } = bindField(createCounterForm.fields.name)
	const { error: _initialValueError, ...initialValueFieldProps } = bindField(
		createCounterForm.fields.initialValue,
	)

	return (
		<PageShell>
			<styled.section mb="8">
				<styled.h2 fontSize="2xl" fontWeight="semibold" mb="4">
					Create counter
				</styled.h2>
				<styled.form display="grid" gap="3" maxW="sm" onSubmit={handleCreateCounterSubmit}>
					<styled.label display="grid" gap="1" fontSize="sm" fontWeight="medium">
						Counter name
						<styled.input
							{...nameFieldProps}
							placeholder="e.g. Tertiary counter"
							px="3"
							py="2"
							borderWidth="1px"
							borderColor="orange.400"
							borderRadius="md"
							bg="white"
						/>
					</styled.label>
					<FieldError field={createCounterForm.fields.name} />

					<styled.label display="grid" gap="1" fontSize="sm" fontWeight="medium">
						Initial value
						<styled.input
							{...initialValueFieldProps}
							placeholder="0"
							px="3"
							py="2"
							borderWidth="1px"
							borderColor="orange.400"
							borderRadius="md"
							bg="white"
						/>
					</styled.label>
					<FieldError field={createCounterForm.fields.initialValue} />

					<Button
						type="submit"
						loading={isCreateSubmitting}
						loadingText="Adding counter..."
						variant="surface"
						colorPalette="gray"
					>
						Add counter
					</Button>
					{createSubmitError && (
						<styled.p color="red.700" fontSize="sm">
							{createSubmitError}
						</styled.p>
					)}
				</styled.form>
			</styled.section>

			{counterItems.map((counter, index) => (
				<Fragment key={counter.id}>
					<styled.div
						display="flex"
						alignItems="center"
						justifyContent="space-between"
						gap="3"
						mb="4"
						mt={index > 0 ? '8' : '0'}
					>
						<styled.h2 fontSize="2xl" fontWeight="semibold">
							{counter.label}
						</styled.h2>
						<Button
							type="button"
							variant="surface"
							colorPalette="gray"
							onClick={wrap(() => {
								void wrap(deleteCounter(counter.id)).catch(() => undefined)
							})}
						>
							Delete
						</Button>
					</styled.div>
					<Counter countAtom={counter.countAtom} />
				</Fragment>
			))}
		</PageShell>
	)
})
