import { Star } from 'lucide-react'
import { Email } from '@/lib/types'

interface EmailInboxProps {
  emails: Email[]
  selectedEmailId: string | null
  onSelectEmail: (emailId: string) => void
}

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

export default function EmailInbox({
  emails,
  selectedEmailId,
  onSelectEmail,
}: EmailInboxProps) {
  return (
    <div className="flex flex-col overflow-hidden w-80 bg-background">
      {/* Inbox Header */}
      <div className="border-b border-border bg-card px-4 py-3 flex items-center justify-between">
        <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          INBOX ({emails.length})
        </h2>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto divide-y divide-border">
        {emails.map((email) => {
          const isSelected = selectedEmailId === email.id
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

                {/* Star Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  className="flex-shrink-0 hover:text-accent transition-colors cursor-pointer"
                >
                  <Star size={14} className="text-muted-foreground" />
                </button>
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
  )
}
