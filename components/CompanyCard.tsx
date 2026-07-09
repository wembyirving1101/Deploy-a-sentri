import { Building2 } from 'lucide-react'

interface CompanyCardProps {
  companyName: string
  department: string
  role: 'Associate' | 'Executive' | 'Manager'
}

export default function CompanyCard({ companyName, department, role }: CompanyCardProps) {
  return (
    <div className="bg-card border border-border rounded p-4 mb-4">
      <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">
        COMPANY
      </div>
      
      <div className="flex gap-3 items-start">
        <div className="w-10 h-10 bg-secondary rounded border border-border flex items-center justify-center flex-shrink-0">
          <Building2 size={20} className="text-accent" />
        </div>
        
        <div className="flex-1">
          <div className="text-sm font-bold text-foreground uppercase tracking-wide leading-tight">
            {companyName}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {role.toUpperCase()}
          </div>
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border">
            {department}
          </div>
        </div>
      </div>
    </div>
  )
}
