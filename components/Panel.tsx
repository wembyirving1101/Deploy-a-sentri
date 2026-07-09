import React from 'react'

interface PanelProps {
  children: React.ReactNode
  className?: string
}

export default function Panel({ children, className = '' }: PanelProps) {
  return (
    <div
      className={`bg-panel text-panel-foreground border border-border rounded flex flex-col overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}
