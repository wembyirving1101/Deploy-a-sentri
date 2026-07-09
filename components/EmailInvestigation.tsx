'use client'

import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import EmailInbox from './EmailInbox'
import EmailViewer from './EmailViewer'
import { Email } from '@/lib/types'

interface EmailInvestigationProps {
  emails: Email[]
  selectedEmailId: string | null
  currentEmail: Email | undefined
  onSelectEmail: (emailId: string) => void
  onInvestigate: (categoryId: string) => void
  investigatedCategories: Set<string>
}

export default function EmailInvestigation({
  emails,
  selectedEmailId,
  currentEmail,
  onSelectEmail,
  onInvestigate,
  investigatedCategories,
}: EmailInvestigationProps) {
  return (
    <div className="flex-1 bg-card border border-border rounded flex flex-col overflow-hidden h-full">
      {/* Header */}
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

      {/* Content Area - Inbox and Viewer Side by Side */}
      <div className="flex-1 flex overflow-hidden">
        {/* Inbox Section */}
        <div className="w-80 border-r border-border flex flex-col overflow-hidden">
          <div className="border-b border-border bg-secondary px-4 py-2 text-xs font-medium text-muted-foreground">
            <span className="uppercase">Inbox ({emails.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {emails.map((email) => {
              const isSelected = selectedEmailId === email.id
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

              const senderInitials = getInitials(email.from)
              const avatarColor = getAvatarColor(email.from)

              return (
                <button
                  key={email.id}
                  onClick={() => onSelectEmail(email.id)}
                  className={`w-full text-left px-4 py-3 transition-colors hover:bg-secondary ${
                    isSelected ? 'bg-secondary border-l-4 border-l-accent' : 'border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ backgroundColor: avatarColor }}
                    >
                      {senderInitials}
                    </div>

                    {/* Email Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {email.from}
                        </p>
                        <p className="text-xs text-muted-foreground flex-shrink-0">
                          {email.timestamp}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {email.subject}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Sent Footer */}
          <div className="border-t border-border px-4 py-2 bg-secondary text-center text-xs text-muted-foreground">
            SENT (5)
          </div>
        </div>

        {/* Email Viewer Section */}
        {currentEmail ? (
          <EmailViewer
            email={currentEmail}
            onInvestigate={onInvestigate}
            investigatedCategories={investigatedCategories}
            isEmbedded={true}
          />
        ) : (
          <div className="flex-1 bg-background flex items-center justify-center">
            <p className="text-muted-foreground">Select an email to view</p>
          </div>
        )}
      </div>
    </div>
  )
}
