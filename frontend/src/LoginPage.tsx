import { useState } from 'react'
import { Alert, Button, Center, Paper, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { api } from './api'
import { ThemeSwitcher } from './ThemeSwitcher'

export function LoginPage({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function signIn() {
    setLoading(true)
    setError(null)
    try {
      const user = await api<{ username: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      })
      onLogin(user.username)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Center h="100vh">
      <Paper withBorder shadow="md" p="xl" radius="md" w={360}>
        <form onSubmit={(e) => { e.preventDefault(); void signIn() }}>
          <Stack>
            <Title order={2} ta="center">Ladoga</Title>
            {error && <Alert color="red">{error}</Alert>}
            <TextInput
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              required
              autoFocus
            />
            <PasswordInput
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              required
            />
            <Button type="submit" loading={loading} fullWidth>Sign in</Button>
            <Center><ThemeSwitcher /></Center>
          </Stack>
        </form>
      </Paper>
    </Center>
  )
}