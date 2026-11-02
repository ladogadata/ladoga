import { SegmentedControl, useMantineColorScheme, type MantineColorScheme } from '@mantine/core'

export function ThemeSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  return (
    <SegmentedControl
      size="xs"
      value={colorScheme}
      onChange={(value) => setColorScheme(value as MantineColorScheme)}
      data={[
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
        { label: 'System', value: 'auto' },
      ]}
    />
  )
}