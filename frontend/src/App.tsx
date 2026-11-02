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
              { label: 'Светлая', value: 'light' },
              { label: 'Тёмная', value: 'dark' },
              { label: 'Системная', value: 'auto' },
            ]}
          />
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Text>Здесь будут подключения и каналы репликации.</Text>
      </AppShell.Main>
    </AppShell>
  )
}