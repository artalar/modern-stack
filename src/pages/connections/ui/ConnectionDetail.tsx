import type { Connection } from '#entities/connection'

import { Button, toaster } from '#shared/components'
import { styled } from '#styled-system/jsx'

import { ConnectionStatusBadge } from './components/ConnectionStatusBadge'
import { ConnectionTypeBadge } from './components/ConnectionTypeBadge'

export function ConnectionDetail({ connection }: { connection: Connection }) {
	const handleTest = () => {
		const id = toaster.create({ title: 'Testing connection…', type: 'loading', closable: false })
		setTimeout(() => {
			toaster.update(id, {
				title: 'Connection successful',
				description: connection.name,
				type: 'success',
			})
		}, 1500)
	}

	const handleReconnect = () => {
		const id = toaster.create({ title: 'Reconnecting…', type: 'loading', closable: false })
		setTimeout(() => {
			toaster.update(id, {
				title: 'Reconnected successfully',
				description: connection.name,
				type: 'success',
			})
		}, 1500)
	}

	return (
		<styled.div p="8">
			<styled.div display="flex" alignItems="center" gap="3" mb="6" flexWrap="wrap">
				<styled.h1 fontSize="2xl" fontWeight="bold" flex="1">
					{connection.name}
				</styled.h1>
				<ConnectionTypeBadge type={connection.type} />
				<ConnectionStatusBadge status={connection.status} />
				{connection.status === 'error' && (
					<Button size="sm" onClick={handleReconnect}>
						Reconnect
					</Button>
				)}
				<Button size="sm" variant="outline" onClick={handleTest}>
					Test connection
				</Button>
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
