import { AlertTriangle } from 'lucide-react'
import { InvestigationCategory } from '@/lib/types'

interface InvestigationPanelProps {
  investigationList: InvestigationCategory[]
  onMakeDecision: () => void
  onCheckboxChange?: (categoryId: string) => void
  onVerify?: () => void
}

export default function InvestigationPanel({
  investigationList,
  onMakeDecision,
  onCheckboxChange,
  onVerify,
}: InvestigationPanelProps) {
  const checkedCount = investigationList.filter((item) => item.checked).length

  return (
    <div className="w-80 bg-[#171b1d] border border-[#3a3f42] rounded flex flex-col overflow-hidden">
      {/* Level 2 Header - Dark */}
      <div className="bg-[#171b1d] border-b border-[#3a3f42] px-4 py-3">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle size={16} className="text-destructive" />
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
            INVESTIGATION LIST
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          {checkedCount}/{investigationList.length} analyzed
        </p>
      </div>

      {/* Level 3 Content Area - Beige with margin */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[#d3cdc1] m-3 rounded">
        {/* Investigation items container - no gaps */}
        <div className="flex-1 overflow-y-auto">
          {investigationList.map((item, index) => (
            <div
              key={item.id}
              className={`bg-[#d3cdc1] p-4 ${index !== investigationList.length - 1 ? 'border-b border-[#c5b8a8]' : ''}`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onCheckboxChange?.(item.id)}
                    className="w-4 h-4 mt-1 cursor-pointer"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#000000]">{item.label}</p>
                    {item.hasEvidence && (
                      <p className="text-xs text-[#000000]">Evidence collected</p>
                    )}
                  </div>
                </div>
              </div>
              <button className="py-1 px-3 rounded font-bold text-xs uppercase tracking-wide transition-colors bg-[#d3cdc1] text-[#000000] border border-[#a89a8a] hover:bg-[#cbc0b5]">
                Check
              </button>
            </div>
          ))}
        </div>

        {/* Contact People Button */}
        {onVerify && (
          <div className="border-t border-[#c5b8a8] px-3 py-3">
            <button
              onClick={onVerify}
              className="w-full py-2 px-3 rounded font-bold text-xs uppercase tracking-wide transition-colors bg-[#c1b5a8] text-[#000000] hover:bg-[#b5a89a]"
            >
              Contact People
            </button>
          </div>
        )}

        {/* Evidence Collected Section */}
        <div className="border-t border-[#c5b8a8] px-3 py-3">
          <p className="text-xs font-bold text-[#000000] uppercase mb-2">
            Evidence Collected
          </p>
          <p className="text-xs text-[#000000] mb-3">
            Review the clues you&apos;ve found to build your case.
          </p>
        </div>

        {/* Make Decision Button */}
        <div className="border-t border-[#c5b8a8] px-3 py-3">
          <button
            onClick={onMakeDecision}
            className="w-full py-3 rounded font-bold text-sm uppercase tracking-wide transition-colors bg-[#282c2f] text-white hover:bg-[#323539]"
          >
            Make a Decision
          </button>
        </div>
      </div>
    </div>
  )
}
