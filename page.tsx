'use client'

import { motion } from "framer-motion"
import { Github, Twitter, Instagram, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatusIndicator } from "./components/status-indicator"
import { useDiscordProfile } from "./hooks/use-discord-profile"
import { Skeleton } from "@/components/ui/skeleton"

export default function BioPage() {
  const { profile, avatarUrl, loading } = useDiscordProfile()

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="bg-zinc-900/50 border-zinc-800 p-6 backdrop-blur">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-24 h-24 mx-auto"
            >
              {loading ? (
                <Skeleton className="w-24 h-24 rounded-full" />
              ) : (
                <>
                  <img
                    src={avatarUrl || "/placeholder.svg?height=120&width=120"}
                    alt="Discord Profile"
                    className="w-24 h-24 rounded-full border-2 border-blue-500"
                  />
                  <StatusIndicator status={profile?.status} />
                </>
              )}
            </motion.div>
            
            {loading ? (
              <div className="space-y-2 mt-4">
                <Skeleton className="h-6 w-32 mx-auto" />
                <Skeleton className="h-4 w-40 mx-auto" />
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{profile?.username || 'Loading...'}</h1>
                <p className="text-zinc-400">Digital Creator & Developer</p>
              </>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            {[
              { icon: <Github className="w-4 h-4" />, label: "GitHub", href: "#" },
              { icon: <Twitter className="w-4 h-4" />, label: "Twitter", href: "#" },
              { icon: <Instagram className="w-4 h-4" />, label: "Instagram", href: "#" },
              { icon: <ExternalLink className="w-4 h-4" />, label: "Portfolio", href: "#" },
            ].map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Button
                  variant="outline"
                  className="w-full bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700/50 hover:border-zinc-600 text-white"
                  asChild
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      {link.icon}
                      {link.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </a>
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-sm text-zinc-500"
          >
            <p>© 2024 • Built with Next.js</p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  )
}

