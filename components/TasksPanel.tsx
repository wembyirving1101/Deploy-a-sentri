import { Mail, Lock, Shield, Database } from 'lucide-react'

interface TasksPanelProps {
  currentTaskType: 'email' | 'password' | 'data-classification'
  onSelectTask: (taskType: 'email' | 'password' | 'data-classification') => void
}

export default function TasksPanel({ currentTaskType, onSelectTask }: TasksPanelProps) {
  const tasks = [
    {
      id: 'email',
      icon: Mail,
      label: 'Email Investigation',
      active: currentTaskType === 'email',
    },
    {
      id: 'password',
      icon: Shield,
      label: 'Password Strength',
      active: currentTaskType === 'password',
    },
    {
      id: 'data-classification',
      icon: Database,
      label: 'Data Classification',
      active: currentTaskType === 'data-classification',
    },
  ]

  return (
    <div className="bg-card border border-border rounded p-4">
      <h2 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">
        TASKS
      </h2>
      <div className="space-y-2">
        {tasks.map((task) => {
          const Icon = task.icon
          return (
            <button
              key={task.id}
              onClick={() => onSelectTask(task.id as any)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded text-sm transition-colors ${
                task.active
                  ? 'bg-accent text-accent-foreground hover:bg-opacity-90'
                  : 'bg-secondary text-foreground hover:bg-success hover:text-success-foreground'
              }`}
            >
              <Icon size={16} />
              <span className="flex-1 text-left font-medium">{task.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
