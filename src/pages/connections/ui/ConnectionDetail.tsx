import type { Connection } from '#entities/connection'

import { styled } from '#styled-system/jsx'

import { ConnectionStatusBadge } from './components/ConnectionStatusBadge'
import { ConnectionTypeBadge } from './components/ConnectionTypeBadge'

export function ConnectionDetail({ connection }: { connection: Connection }) {
	return (
		<styled.div p="8">
			<styled.div display="flex" alignItems="center" gap="3" mb="6">
				<styled.h1 fontSize="2xl" fontWeight="bold">
					{connection.name}
				</styled.h1>
				<ConnectionTypeBadge type={connection.type} />
				<ConnectionStatusBadge status={connection.status} />
			</styled.div>
			<styled.p color="gray.11" fontSize="sm" lineHeight="relaxed">
				{connection.description}
			</styled.p>
			<styled.div display="grid" gap="4" mt="6">
				{connection.details.map((paragraph, index) => (
					<styled.p key={index} color="gray.11" fontSize="sm" lineHeight="relaxed">
						{paragraph}
					</styled.p>
				))}
			</styled.div>
		</styled.div>
	)
}
