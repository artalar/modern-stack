import type { ChartPoint } from '#entities/dashboard'

import { Card } from '#shared/components'
import { styled } from '#styled-system/jsx'

export function BarChart({ chartData }: { chartData: ChartPoint[] }) {
	const maxChartValue = Math.max(1, ...chartData.map((point) => point.value))
	return (
		<Card.Root p="5" borderWidth="1px" borderColor="gray.4" borderRadius="xl" bg="gray.1">
			<styled.div fontSize="sm" fontWeight="semibold" mb="4">
				Weekly Traffic
			</styled.div>
			<styled.div display="flex" alignItems="flex-end" gap="2" h="140px">
				{chartData.map((point) => (
					<styled.div
						key={point.label}
						flex="1"
						display="flex"
						flexDirection="column"
						alignItems="center"
						gap="1"
						h="100%"
						justifyContent="flex-end"
					>
						<styled.div
							w="100%"
							bg="colorPalette.9"
							borderRadius="sm"
							style={{ height: `${(point.value / maxChartValue) * 100}%` }}
							transition="height 0.3s"
						/>
						<styled.span fontSize="xs" color="gray.11">
							{point.label}
						</styled.span>
					</styled.div>
				))}
			</styled.div>
		</Card.Root>
	)
}
