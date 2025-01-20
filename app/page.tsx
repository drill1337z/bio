'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Instagram, ExternalLink } from 'lucide-react'
import useDiscordProfile from './hooks/use-discord-profile'

export default function BioPage() {
  const { profile, avatarUrl, loading, error } = useDiscordProfile()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card/50 border border-border rounded-lg p-6 backdrop-blur">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src={avatarUrl || "/placeholder.svg"}
                alt="Discord Profile"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-primary"
              />
            </motion.div>
            {error ? (
              <p className="text-destructive">{error}</p>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-2">{loading ? 'Loading...' : profile?.username}</h1>
                <p className="text-muted-foreground">Digital Creator & Developer</p>
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
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-3 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-md transition-colors"
                >
                  <span className="flex items-center gap-2">
                    {link.icon}
                    {link.label}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center text-sm text-muted-foreground"
          >
            <p>© 2024 • Built with Next.js</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

