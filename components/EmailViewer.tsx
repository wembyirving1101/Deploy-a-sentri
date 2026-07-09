'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, MoreVertical, FileText } from 'lucide-react'
import { Email } from '@/lib/types'

interface EmailViewerProps {
  email: Email
  onInvestigate: (categoryId: string) => void
  investigatedCategories: Set<string>
  isEmbedded?: boolean
}

export default function EmailViewer({
  email,
  onInvestigate,
  investigatedCategories,
  isEmbedded = false,
}: EmailViewerProps) {
  const [showInvestigationPanel, setShowInvestigationPanel] = useState(true)

  // Generate avatar color based on sender name
  const getAvatarColor = (name: string): string => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  // Get initials from sender name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const investigationButtons = [
    { id: 'profile', label: 'PROFILE', icon: '👤' },
    { id: 'link', label: 'LINK', icon: '🔗' },
    { id: 'file', label: 'FILE', icon: '📄' },
    { id: 'language', label: 'LANGUAGE', icon: '💬' },
    { id: 'context', label: 'CONTEXT', icon: '🔍' },
    { id: 'request', label: 'REQUEST', icon: '⚠️' },
  ]

  const handleInvestigate = (categoryId: string) => {
    onInvestigate(categoryId)
  }

  const senderInitials = getInitials(email.from)
  const avatarColor = getAvatarColor(email.from)

  return (
    <div className={`flex-1 bg-card ${!isEmbedded ? 'border border-border rounded' : 'border-l border-border'} flex flex-col overflow-hidden`}>
      {/* Header - Only show when not embedded */}
      {!isEmbedded && (
        <>
          <div className="border-b border-border px-4 py-3 flex items-center justify-between">
            <div className="flex-1">
              <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
                EMAIL INVESTIGATION
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-secondary rounded transition-colors">
                <ChevronLeft size={18} className="text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-secondary rounded transition-colors">
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
              <button className="p-2 hover:bg-secondary rounded transition-colors">
                <MoreVertical size={18} className="text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-border bg-secondary px-4 flex gap-4 text-xs font-medium text-muted-foreground">
            <button className="py-3 border-b-2 border-accent text-accent">
              INBOX (5)
            </button>
            <button className="py-3 border-b-2 border-transparent hover:text-foreground">
              SENT
            </button>
          </div>
        </>
      )}

      {/* Email Content - No Cards Design */}
      <div className="flex-1 overflow-y-auto">
        <div className="bg-background">
          {/* Subject Title */}
          <div className="border-b border-border bg-card px-6 py-4">
            <h1 className="text-xl font-bold text-foreground">{email.subject}</h1>
          </div>

          {/* Sender Profile Section */}
          <div className="border-b border-border bg-card px-6 py-5 flex items-start justify-between">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: avatarColor }}
              >
                {senderInitials}
              </div>

              {/* Sender Info */}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm">{email.from}</p>
                <p className="text-xs text-muted-foreground">{email.senderDomain}</p>
                <p className="text-xs text-muted-foreground">to: {email.to}</p>
              </div>
            </div>

            {/* Timestamp */}
            <span className="text-xs font-mono text-muted-foreground flex-shrink-0 ml-4">
              {email.timestamp}
            </span>
          </div>

          {/* Email Body Content */}
          <div className="px-6 py-6 text-foreground text-sm leading-relaxed whitespace-pre-wrap">
            {email.body}
          </div>

          {/* Attachments */}
          {email.attachments.length > 0 && (
            <div className="border-t border-border px-6 py-6">
              <div className="space-y-3">
                {email.attachments.map((attachment, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 border border-border rounded hover:bg-secondary cursor-pointer transition-colors"
                  >
                    <FileText size={20} className="text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{attachment.name}</p>
                      <p className="text-xs text-muted-foreground">{attachment.size} KB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Investigation Buttons */}
      <div className="border-t border-border bg-secondary px-4 py-3">
        <p className="text-xs font-bold text-muted-foreground uppercase mb-2">
          Investigate
        </p>
        <div className="grid grid-cols-3 gap-2">
          {investigationButtons.map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleInvestigate(btn.id)}
              disabled={investigatedCategories.has(btn.id)}
              className={`py-2 px-2 rounded text-xs font-bold transition-colors uppercase border ${
                investigatedCategories.has(btn.id)
                  ? 'bg-secondary text-muted-foreground border-border opacity-50 cursor-not-allowed'
                  : 'bg-accent text-accent-foreground border-accent hover:opacity-90'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
