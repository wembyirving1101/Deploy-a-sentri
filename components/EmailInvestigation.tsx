'use client'

import { ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import EmailInbox from './EmailInbox'
import EmailViewer from './EmailViewer'
import Panel from './Panel'
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
    <Panel className="flex-1 h-full">
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
      <div className="flex-1 flex overflow-hidden bg-[#171b1d]">
        {/* Inbox Section - Card Layer */}
        <div className="w-80 flex flex-col overflow-hidden bg-[#171b1d] p-3 gap-3">
          <div className="bg-[#282c2f] rounded border border-[#3a3f42] px-3 py-2 text-xs font-medium text-muted-foreground">
            <span className="uppercase">Inbox ({emails.length})</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-2">
            {emails.map((email) => {
              const isSelected = selectedEmailId === email.id

              return (
                <button
                  key={email.id}
                  onClick={() => onSelectEmail(email.id)}
                  className={`w-full text-left px-3 py-3 rounded border transition-colors ${
                    isSelected
                      ? 'bg-success text-success-foreground border-success'
                      : 'bg-[#d3cdc1] text-[#000000] border-[#c5b8a8] hover:bg-[#cbc0b5]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Email Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {email.from}
                      </p>
                      <p className="text-xs opacity-70 truncate">
                        {email.subject}
                      </p>
                    </div>

                    {/* Timestamp */}
                    <p className="text-xs opacity-70 flex-shrink-0">
                      {email.timestamp}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Email Viewer Section - Panel Layer */}
        {currentEmail ? (
          <EmailViewer
            email={currentEmail}
            onInvestigate={onInvestigate}
            investigatedCategories={investigatedCategories}
            isEmbedded={true}
          />
        ) : (
          <div className="flex-1 bg-[#d3cdc1] flex items-center justify-center">
            <p className="text-[#000000]">Select an email to view</p>
          </div>
        )}
      </div>
    </Panel>
  )
}
