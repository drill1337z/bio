'use client'

import { useState, useEffect } from 'react'

interface DiscordProfile {
  id: string
  username: string
  avatar: string
  discriminator: string
}

export const useDiscordProfile = () => {
  const [profile, setProfile] = useState<DiscordProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('/api/discord')
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch Discord profile')
        }
        const data = await response.json()
        if (!data.id || !data.username) {
          throw new Error('Invalid profile data received')
        }
        setProfile(data)
        setError(null)
      } catch (error) {
        console.error('Error:', error)
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const avatarUrl = profile?.avatar
    ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png?size=256`
    : '/placeholder.svg?height=256&width=256'

  return { profile, avatarUrl, loading, error }
}

export default useDiscordProfile;

