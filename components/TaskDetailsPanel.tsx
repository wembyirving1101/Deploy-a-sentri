'use client'

import { Mail, Lock, Shield, Database, FileText, Clock, User, AlertCircle } from 'lucide-react'
import { QueueItem } from '@/lib/types'
import { mockEmails } from '@/lib/mockEmails'
import { mockPasswords } from '@/lib/mockPasswords'
import { mockDataClassifications } from '@/lib/mockDataClassification'

interface TaskDetailsPanelProps {
  selectedQueueItem: QueueItem | null
}

export default function TaskDetailsPanel({ selectedQueueItem }: TaskDetailsPanelProps) {
  if (!selectedQueueItem) {
    return (
      <div className="bg-card border border-border rounded p-4 h-full flex items-center justify-center">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Select a task from the queue to view details</p>
        </div>
      </div>
    )
  }

  const getEmailDetails = () => {
    const email = mockEmails.find(e => e.id === selectedQueueItem.id)
    if (!email) return null
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            EMAIL DETAILS
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">From</label>
              <p className="text-sm text-foreground font-medium">{email.from}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Subject</label>
              <p className="text-sm text-foreground">{email.subject}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Time</label>
              <p className="text-sm text-foreground">{email.timestamp}</p>
            </div>
            {email.attachments && email.attachments.length > 0 && (
              <div>
                <label className="text-xs text-muted-foreground">Attachments</label>
                <div className="space-y-1 mt-1">
                  {email.attachments.map((att, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-secondary rounded text-xs">
                      <FileText size={14} />
                      <span>{att.name} ({att.size}KB)</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const getPasswordDetails = () => {
    const password = mockPasswords.find(p => p.id === selectedQueueItem.id)
    if (!password) return null
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            PASSWORD DETAILS
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Submitted by</label>
              <p className="text-sm text-foreground font-medium">{password.submittedBy}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Purpose</label>
              <p className="text-sm text-foreground">{password.purpose}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Characteristics</label>
              <div className="flex flex-wrap gap-1 mt-1">
                {password.characteristics.map((char, idx) => (
                  <span key={idx} className="bg-secondary text-xs px-2 py-1 rounded text-foreground">
                    {char}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getDataClassificationDetails = () => {
    const doc = mockDataClassifications.find(d => d.id === selectedQueueItem.id)
    if (!doc) return null
    
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">
            DATA CLASSIFICATION
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Document</label>
              <p className="text-sm text-foreground font-medium">{doc.name}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">From</label>
              <p className="text-sm text-foreground">{doc.from}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Time</label>
              <p className="text-sm text-foreground">{doc.timestamp}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Current Classification</label>
              <p className="text-sm text-foreground font-medium">{doc.currentClassification}</p>
            </div>
            {doc.sharingInfo && (
              <div>
                <label className="text-xs text-muted-foreground">Sharing With</label>
                <p className="text-sm text-foreground">{doc.sharingInfo}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const getTaskTypeIcon = () => {
    switch (selectedQueueItem.type) {
      case 'email':
        return <Mail size={20} className="text-accent" />
      case 'password':
        return <Lock size={20} className="text-accent" />
      case 'password-strength':
        return <Shield size={20} className="text-accent" />
      case 'data-classification':
        return <Database size={20} className="text-accent" />
      default:
        return null
    }
  }

  const getTaskTypeLabel = () => {
    switch (selectedQueueItem.type) {
      case 'email':
        return 'Email Investigation'
      case 'password':
        return 'Password Review'
      case 'password-strength':
        return 'Password Strength'
      case 'data-classification':
        return 'Data Classification'
      default:
        return 'Unknown Task'
    }
  }

  return (
    <div className="bg-card border border-border rounded p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-secondary rounded border border-border flex items-center justify-center flex-shrink-0">
          {getTaskTypeIcon()}
        </div>
        <div>
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wide">
            {getTaskTypeLabel()}
          </h2>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 overflow-y-auto">
        {selectedQueueItem.type === 'email' && getEmailDetails()}
        {selectedQueueItem.type === 'password' && getPasswordDetails()}
        {selectedQueueItem.type === 'data-classification' && getDataClassificationDetails()}
      </div>

      {/* Action Button */}
      <div className="border-t border-border pt-4 mt-4">
        <button className="w-full bg-accent text-accent-foreground py-2 rounded font-medium text-sm hover:bg-opacity-90 transition-colors uppercase tracking-wider">
          Review Task
        </button>
      </div>
    </div>
  )
}
