import { useEffect, useState } from 'react'
import { AppShell, Button, Center, Group, Loader, Text, Title } from '@mantine/core'
import { api } from './api'
import { LoginPage } from './LoginPage'
import { ThemeSwitcher } from './ThemeSwitcher'

export default function App() {
  const [user, setUser] = useState<string | null>(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    api<{ username: string }>('/auth/me')
      .then((me) => setUser(me.username))
      .catch(() => setUser(null))
      .finally(() => setChecking(false))
  }, [])

  async function signOut() {
    await api('/auth/logout', { method: 'POST' })
    setUser(null)
  }

  if (checking) return <Center h="100vh"><Loader /></Center>
  if (!user) return <LoginPage onLogin={setUser} />

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={3}>Ladoga</Title>
          <Group>
            <ThemeSwitcher />
            <Text size="sm" c="dimmed">{user}</Text>
            <Button variant="default" size="xs" onClick={signOut}>Sign out</Button>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Text>Connections and replication channels will appear here.</Text>
      </AppShell.Main>
    </AppShell>
  )
}