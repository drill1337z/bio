import { NextResponse } from 'next/server'

const DISCORD_API = 'https://discord.com/api/v10'

export async function GET() {
  try {
    if (!process.env.DISCORD_BOT_TOKEN) {
      throw new Error('DISCORD_BOT_TOKEN is not set')
    }

    const response = await fetch(`${DISCORD_API}/users/@me`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Discord API error: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching Discord profile:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch Discord profile' }, { status: 500 })
  }
}

