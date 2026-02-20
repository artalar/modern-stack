import { Button } from '#shared/components'
import { styled } from '#styled-system/jsx'

import { breakdown, percentage, totalGB, usedGB } from '../model/data'

function BreakdownRow({ label, gb, total }: { label: string; gb: number; total: number }) {
	const pct = Math.round((gb / total) * 100)
	return (
		<styled.div display="flex" alignItems="center" gap="3" py="2">
			<styled.div flex="1" fontSize="sm">
				{label}
			</styled.div>
			<styled.div fontSize="sm" color="gray.11" w="16" textAlign="right">
				{gb} GB
			</styled.div>
			<styled.div w="24" h="1.5" bg="gray.4" borderRadius="full" overflow="hidden">
				<styled.div h="full" bg="blue.9" borderRadius="full" style={{ width: `${pct}%` }} />
			</styled.div>
		</styled.div>
	)
}

export function UsagePage() {
	return (
		<styled.div p="8" maxW="600px">
			<styled.h1 fontSize="2xl" fontWeight="bold" mb="8">
				Usage
			</styled.h1>

			<styled.div mb="8">
				<styled.div display="flex" alignItems="center" justifyContent="space-between" mb="2">
					<styled.span fontWeight="medium">Storage</styled.span>
					<styled.div display="flex" alignItems="center" gap="3">
						<styled.span fontSize="sm" color="gray.11">
							{usedGB} GB of {totalGB} GB used
						</styled.span>
						<Button size="xs" variant="outline" asChild>
							<styled.a href="/pricing">Manage plan</styled.a>
						</Button>
					</styled.div>
				</styled.div>
				<styled.div w="full" h="3" bg="gray.4" borderRadius="full" overflow="hidden" mb="1">
					<styled.div
						h="full"
						bg={percentage >= 90 ? 'red.9' : percentage >= 70 ? 'orange.9' : 'blue.9'}
						borderRadius="full"
						style={{ width: `${percentage}%` }}
					/>
				</styled.div>
				<styled.div fontSize="sm" color="gray.11">
					{percentage}% used
				</styled.div>
			</styled.div>

			<styled.div mb="8">
				<styled.h2 fontSize="lg" fontWeight="semibold" mb="3">
					Breakdown
				</styled.h2>
				<styled.div borderWidth="1px" borderColor="gray.4" borderRadius="lg" px="4" divideY="1px">
					<BreakdownRow label="Documents" gb={breakdown.documents} total={totalGB} />
					<BreakdownRow label="Media" gb={breakdown.media} total={totalGB} />
					<BreakdownRow label="Other" gb={breakdown.other} total={totalGB} />
				</styled.div>
			</styled.div>

			<styled.p fontSize="sm" color="gray.11">
				Storage usage resets on the 1st of each month.
			</styled.p>
		</styled.div>
	)
}
