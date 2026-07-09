'use client'

import { DataClassification } from '@/lib/types'
import { FileText } from 'lucide-react'

interface DataClassificationTaskProps {
  document: DataClassification
}

export default function DataClassificationTask({
  document,
}: DataClassificationTaskProps) {

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-bold tracking-widest text-foreground">TASK: DATA CLASSIFICATION</h2>
      </div>

      {/* Content */}
      <div className="flex-1 flex gap-6 overflow-hidden p-6">
        {/* Main Content - Document Preview */}
        <div className="flex-1 flex flex-col gap-6 overflow-hidden">
          {/* Document Info */}
          <div className="bg-card border border-border rounded p-4">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={24} className="text-accent" />
              <div>
                <p className="text-muted-foreground uppercase text-xs font-bold">From: {document.from}</p>
                <p className="text-muted-foreground uppercase text-xs font-bold">Time: {document.timestamp}</p>
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="bg-card border border-border rounded p-4 flex-1 flex flex-col overflow-hidden">
            <span className="text-muted-foreground uppercase text-xs font-bold block mb-3">DOCUMENT PREVIEW</span>
            <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
              <div className="bg-secondary rounded p-3 flex items-center gap-3 border border-border">
                <FileText size={32} className="text-accent flex-shrink-0" />
                <div>
                  <p className="font-bold text-foreground">{document.title}</p>
                  <p className="text-muted-foreground text-xs">{document.fileSize}</p>
                </div>
              </div>
              <div className="bg-secondary rounded p-4 flex-1 overflow-y-auto border border-border">
                <p className="text-foreground text-sm whitespace-pre-wrap">{document.preview}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
