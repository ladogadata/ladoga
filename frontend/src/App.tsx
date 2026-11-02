import {
  AppShell, Group, SegmentedControl, Text, Title,
  useMantineColorScheme, type MantineColorScheme,
} from '@mantine/core'

export default function App() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>Ladoga</Title>
          <SegmentedControl
            value={colorScheme}
            onChange={(value) => setColorScheme(value as MantineColorScheme)}
            data={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'System', value: 'auto' },
            ]}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Text>Connections and replication channels will appear here.</Text>
      </AppShell.Main>
    </AppShell>
  )
}