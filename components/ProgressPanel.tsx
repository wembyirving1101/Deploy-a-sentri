import { Bot } from 'lucide-react'

interface ProgressPanelProps {
  tasksCompleted?: number
  tasksTotal?: number
}

export default function ProgressPanel({ tasksCompleted = 2, tasksTotal = 4 }: ProgressPanelProps) {
  const progressPercentage = (tasksCompleted / tasksTotal) * 100

  return (
    <div className="bg-card border border-border rounded p-4 flex-1 flex flex-col">
      <div className="space-y-4 flex-1">
        {/* Progress Section */}
        <div>
          <h2 className="text-xs font-bold tracking-widest text-muted-foreground mb-3 uppercase">
            PROGRESS
          </h2>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">TODAY&apos;S TASKS</span>
              <span className="font-mono text-sm font-bold text-accent">{tasksCompleted}/{tasksTotal}</span>
            </div>
            <div className="bg-secondary rounded h-4 overflow-hidden border border-border">
              <div 
                className="bg-success h-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Sentri Bot Section */}
      <div className="border-t border-border pt-4 mt-4">
        <div className="flex gap-3">
          <div className="w-12 h-12 bg-secondary rounded border border-border flex items-center justify-center flex-shrink-0">
            <Bot size={24} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">SENTRI</p>
            <p className="text-xs text-muted-foreground leading-tight mt-1">
              Investigate carefully. Collect evidence before you decide.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
