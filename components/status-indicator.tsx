interface StatusIndicatorProps {
  status?: 'online' | 'idle' | 'dnd' | 'offline'
}

export function StatusIndicator({ status = 'offline' }: StatusIndicatorProps) {
  const statusColors = {
    online: 'bg-green-500',
    idle: 'bg-yellow-500',
    dnd: 'bg-red-500',
    offline: 'bg-gray-500',
  }

  return (
    <div className="absolute bottom-0 right-0 translate-x-1/4 -translate-y-1/4">
      <div className={`w-4 h-4 rounded-full ${statusColors[status]} ring-2 ring-zinc-900`} />
    </div>
  )
}

