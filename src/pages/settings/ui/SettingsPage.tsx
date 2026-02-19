import { createListCollection } from '@ark-ui/react/select'

import { Input, Select } from '#shared/components'
import { styled } from '#styled-system/jsx'

import { FieldRow } from './components/FieldRow'
import { Section } from './components/Section'

const emailNotificationsCollection = createListCollection({
	items: [
		{ label: 'All activity', value: 'all' },
		{ label: 'Important only', value: 'important' },
		{ label: 'None', value: 'none' },
	] as const,
	itemToString: (item) => item.label,
	itemToValue: (item) => item.value,
})

const desktopNotificationsCollection = createListCollection({
	items: [
		{ label: 'Enabled', value: 'enabled' },
		{ label: 'Disabled', value: 'disabled' },
	] as const,
	itemToString: (item) => item.label,
	itemToValue: (item) => item.value,
})

const themeCollection = createListCollection({
	items: [
		{ label: 'Light', value: 'light' },
		{ label: 'Dark', value: 'dark' },
		{ label: 'System', value: 'system' },
	] as const,
	itemToString: (item) => item.label,
	itemToValue: (item) => item.value,
})

const densityCollection = createListCollection({
	items: [
		{ label: 'Compact', value: 'compact' },
		{ label: 'Comfortable', value: 'comfortable' },
		{ label: 'Spacious', value: 'spacious' },
	] as const,
	itemToString: (item) => item.label,
	itemToValue: (item) => item.value,
})

export function SettingsPage() {
	return (
		<styled.div p="8" maxW="800px">
			<styled.h1 fontSize="2xl" fontWeight="bold" mb="8">
				Settings
			</styled.h1>

			<Section title="Profile">
				<FieldRow label="Display name" description="Your name as shown to other users.">
					<Input defaultValue="Alex Johnson" size="sm" />
				</FieldRow>
				<FieldRow label="Email" description="Used for notifications and account recovery.">
					<Input defaultValue="alex@example.com" size="sm" />
				</FieldRow>
				<FieldRow label="Role">
					<styled.span fontSize="sm" color="gray.11">
						Admin
					</styled.span>
				</FieldRow>
			</Section>

			<Section title="Notifications">
				<FieldRow
					label="Email notifications"
					description="Receive updates about activity in your projects."
				>
					<Select.Root
						collection={emailNotificationsCollection}
						size="sm"
						w="100%"
						defaultValue={['important']}
						positioning={{ sameWidth: true }}
					>
						<Select.Control>
							<Select.Trigger>
								<Select.ValueText />
								<Select.IndicatorGroup>
									<Select.Indicator />
								</Select.IndicatorGroup>
							</Select.Trigger>
						</Select.Control>
						<Select.Positioner>
							<Select.Content>
								{emailNotificationsCollection.items.map((item) => (
									<Select.Item key={item.value} item={item}>
										<Select.ItemText>{item.label}</Select.ItemText>
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
						<Select.HiddenSelect />
					</Select.Root>
				</FieldRow>
				<FieldRow
					label="Desktop notifications"
					description="Show browser notifications for real-time alerts."
				>
					<Select.Root
						collection={desktopNotificationsCollection}
						size="sm"
						w="100%"
						defaultValue={['enabled']}
						positioning={{ sameWidth: true }}
					>
						<Select.Control>
							<Select.Trigger>
								<Select.ValueText />
								<Select.IndicatorGroup>
									<Select.Indicator />
								</Select.IndicatorGroup>
							</Select.Trigger>
						</Select.Control>
						<Select.Positioner>
							<Select.Content>
								{desktopNotificationsCollection.items.map((item) => (
									<Select.Item key={item.value} item={item}>
										<Select.ItemText>{item.label}</Select.ItemText>
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
						<Select.HiddenSelect />
					</Select.Root>
				</FieldRow>
			</Section>

			<Section title="Appearance">
				<FieldRow label="Theme" description="Choose your preferred color scheme.">
					<Select.Root
						collection={themeCollection}
						size="sm"
						w="100%"
						defaultValue={['system']}
						positioning={{ sameWidth: true }}
					>
						<Select.Control>
							<Select.Trigger>
								<Select.ValueText />
								<Select.IndicatorGroup>
									<Select.Indicator />
								</Select.IndicatorGroup>
							</Select.Trigger>
						</Select.Control>
						<Select.Positioner>
							<Select.Content>
								{themeCollection.items.map((item) => (
									<Select.Item key={item.value} item={item}>
										<Select.ItemText>{item.label}</Select.ItemText>
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
						<Select.HiddenSelect />
					</Select.Root>
				</FieldRow>
				<FieldRow label="Density" description="Adjust the spacing of UI elements.">
					<Select.Root
						collection={densityCollection}
						size="sm"
						w="100%"
						defaultValue={['comfortable']}
						positioning={{ sameWidth: true }}
					>
						<Select.Control>
							<Select.Trigger>
								<Select.ValueText />
								<Select.IndicatorGroup>
									<Select.Indicator />
								</Select.IndicatorGroup>
							</Select.Trigger>
						</Select.Control>
						<Select.Positioner>
							<Select.Content>
								{densityCollection.items.map((item) => (
									<Select.Item key={item.value} item={item}>
										<Select.ItemText>{item.label}</Select.ItemText>
										<Select.ItemIndicator />
									</Select.Item>
								))}
							</Select.Content>
						</Select.Positioner>
						<Select.HiddenSelect />
					</Select.Root>
				</FieldRow>
			</Section>
		</styled.div>
	)
}
