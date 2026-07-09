'use client'

import { useState } from 'react'
import { Mail, Lock, Shield, Database } from 'lucide-react'
import { QueueItem } from '@/lib/types'
import { mockEmails } from '@/lib/mockEmails'
import { mockPasswords } from '@/lib/mockPasswords'
import { mockDataClassifications } from '@/lib/mockDataClassification'

interface DispatchQueueViewProps {
  queue: QueueItem[]
  selectedQueueId: string | null
  onSelectQueue: (id: string) => void
}

export default function DispatchQueueView({ queue, selectedQueueId, onSelectQueue }: DispatchQueueViewProps) {
  const [activeTab, setActiveTab] = useState('all')
  const tabs = [
    { id: 'all', label: 'ALL', count: queue.length },
    { id: 'email', label: 'EMAIL', count: queue.filter(q => q.type === 'email').length },
    { id: 'password', label: 'PASSWORD', count: queue.filter(q => q.type === 'password').length },
    { id: 'strength', label: 'STRENGTH', count: queue.filter(q => q.type === 'password-strength').length },
    { id: 'data', label: 'DATA', count: queue.filter(q => q.type === 'data-classification').length },
  ]

  const getFilteredQueue = () => {
    if (activeTab === 'all') return queue
    if (activeTab === 'email') return queue.filter(q => q.type === 'email')
    if (activeTab === 'password') return queue.filter(q => q.type === 'password')
    if (activeTab === 'strength') return queue.filter(q => q.type === 'password-strength')
    if (activeTab === 'data') return queue.filter(q => q.type === 'data-classification')
    return queue
  }

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail size={16} />
      case 'password':
        return <Lock size={16} />
      case 'password-strength':
        return <Shield size={16} />
      case 'data-classification':
        return <Database size={16} />
      default:
        return null
    }
  }

  const getTaskDescription = (queueItem: QueueItem): string => {
    if (queueItem.type === 'email') {
      const email = mockEmails.find(e => e.id === queueItem.id)
      return email?.subject || 'Unknown email'
    } else if (queueItem.type === 'password') {
      return 'New password submission'
    } else if (queueItem.type === 'password-strength') {
      return 'Password strength check'
    } else if (queueItem.type === 'data-classification') {
      const doc = mockDataClassifications.find(d => d.id === queueItem.id)
      return doc?.name || 'Unknown document'
    }
    return 'Unknown task'
  }

  const getTaskSource = (queueItem: QueueItem): string => {
    if (queueItem.type === 'email') {
      const email = mockEmails.find(e => e.id === queueItem.id)
      return email?.from || 'Unknown'
    } else if (queueItem.type === 'data-classification') {
      const doc = mockDataClassifications.find(d => d.id === queueItem.id)
      return doc?.from || 'Unknown'
    }
    return 'System'
  }

  const getTaskTime = (queueItem: QueueItem): string => {
    if (queueItem.type === 'email') {
      const email = mockEmails.find(e => e.id === queueItem.id)
      return email?.timestamp || '--:--'
    }
    return 'Now'
  }

  const getPriority = (queueItem: QueueItem): 'HIGH' | 'MEDIUM' | 'LOW' => {
    if (queueItem.type === 'email') {
      const email = mockEmails.find(e => e.id === queueItem.id)
      return email?.priority || 'MEDIUM'
    } else if (queueItem.type === 'data-classification') {
      const doc = mockDataClassifications.find(d => d.id === queueItem.id)
      return doc?.priority || 'MEDIUM'
    }
    return 'MEDIUM'
  }

  const getPriorityColor = (priority: string) => {
    if (priority === 'HIGH') return 'bg-red-100 text-red-800'
    if (priority === 'MEDIUM') return 'bg-yellow-100 text-yellow-800'
    return 'bg-green-100 text-green-800'
  }

  const typeLabel = {
    email: 'Email',
    password: 'Password',
    'password-strength': 'Strength',
    'data-classification': 'Data',
  }

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-4 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 text-xs font-bold tracking-widest uppercase rounded-t transition-colors ${
              activeTab === tab.id
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Queue Table */}
      <div className="flex-1 overflow-y-auto">
        {getFilteredQueue().length === 0 ? (
          <div className="text-center text-muted-foreground text-sm py-8">
            No tasks in queue
          </div>
        ) : (
          <div className="space-y-0">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-secondary rounded-t sticky top-0 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-2">TYPE</div>
              <div className="col-span-4">TASK</div>
              <div className="col-span-2">FROM</div>
              <div className="col-span-2">TIME</div>
              <div className="col-span-2">PRIORITY</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border">
              {getFilteredQueue().map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelectQueue(item.id)}
                  className={`w-full grid grid-cols-12 gap-2 px-3 py-3 text-left text-sm transition-colors hover:bg-secondary ${
                    selectedQueueId === item.id ? 'bg-accent bg-opacity-20' : ''
                  }`}
                >
                  <div className="col-span-2 flex items-center gap-2 text-foreground font-medium">
                    {getTaskTypeIcon(item.type)}
                  </div>
                  <div className="col-span-4 text-foreground truncate">
                    {getTaskDescription(item)}
                  </div>
                  <div className="col-span-2 text-muted-foreground text-xs truncate">
                    {getTaskSource(item)}
                  </div>
                  <div className="col-span-2 text-muted-foreground text-xs">
                    {getTaskTime(item)}
                  </div>
                  <div className="col-span-2">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(getPriority(item))}`}>
                      {getPriority(item)}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
