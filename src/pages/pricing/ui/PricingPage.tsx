import { styled } from '#styled-system/jsx'

const plans = [
	{ name: 'Free', price: '$0/mo', features: ['1 GB storage', '3 users', 'Community support'] },
	{
		name: 'Pro',
		price: '$12/mo',
		features: ['10 GB storage', '10 users', 'Priority support'],
		highlighted: true,
	},
	{
		name: 'Team',
		price: '$29/mo',
		features: ['100 GB storage', 'Unlimited users', 'Dedicated support'],
	},
]

function PlanCard({
	name,
	price,
	features,
	highlighted,
}: {
	name: string
	price: string
	features: string[]
	highlighted?: boolean
}) {
	return (
		<styled.div
			p="6"
			borderWidth="1px"
			borderColor={highlighted ? 'blue.9' : 'gray.4'}
			borderRadius="lg"
			bg={highlighted ? 'blue.subtle.bg' : 'transparent'}
			display="flex"
			flexDirection="column"
			gap="4"
		>
			<styled.div>
				<styled.div fontSize="lg" fontWeight="semibold" mb="1">
					{name}
				</styled.div>
				<styled.div fontSize="2xl" fontWeight="bold">
					{price}
				</styled.div>
			</styled.div>
			<styled.ul listStyleType="none" p="0" m="0" display="flex" flexDirection="column" gap="2">
				{features.map((f) => (
					<styled.li
						key={f}
						fontSize="sm"
						color="gray.11"
						display="flex"
						alignItems="center"
						gap="2"
					>
						<styled.span color="green.9">✓</styled.span>
						{f}
					</styled.li>
				))}
			</styled.ul>
			<styled.button
				type="button"
				mt="auto"
				px="4"
				py="2"
				borderRadius="md"
				fontSize="sm"
				fontWeight="medium"
				cursor="pointer"
				bg={highlighted ? 'blue.9' : 'gray.4'}
				color={highlighted ? 'white' : 'gray.12'}
				_hover={{ bg: highlighted ? 'blue.10' : 'gray.5' }}
				border="none"
			>
				{highlighted ? 'Upgrade to Pro' : `Get ${name}`}
			</styled.button>
		</styled.div>
	)
}

export function PricingPage() {
	return (
		<styled.div p="8" maxW="800px">
			<styled.h1 fontSize="2xl" fontWeight="bold" mb="2">
				Pricing
			</styled.h1>
			<styled.p fontSize="sm" color="gray.11" mb="8">
				Choose the plan that works best for you.
			</styled.p>

			<styled.div
				display="grid"
				gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
				gap="4"
			>
				{plans.map((plan) => (
					<PlanCard key={plan.name} {...plan} />
				))}
			</styled.div>
		</styled.div>
	)
}
