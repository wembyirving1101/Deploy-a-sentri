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
        {/* Investigation items container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {investigationList.map((item) => (
            <label
              key={item.id}
              className="flex items-center gap-3 p-3 bg-[#282c2f] rounded hover:bg-[#323539] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onCheckboxChange?.(item.id)}
                className="w-4 h-4 accent-accent cursor-pointer"
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{item.label}</p>
                {item.hasEvidence && (
                  <p className="text-xs text-gray-300">Evidence collected</p>
                )}
              </div>
            </label>
          ))}
        </div>

        {/* Contact People Button */}
        {onVerify && (
          <div className="border-t border-[#c5b8a8] px-3 py-3">
            <button
              onClick={onVerify}
              className="w-full py-2 px-3 rounded font-bold text-xs uppercase tracking-wide transition-colors bg-[#d3cdc1] text-[#000000] border border-[#c5b8a8] hover:bg-[#cbc0b5] mb-3"
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
