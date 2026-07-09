import { AlertCircle } from 'lucide-react'

export default function PasswordPolicyPanel() {
  return (
    <div className="bg-card border border-border rounded p-4 flex-1 overflow-y-auto h-full">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle size={20} className="text-accent" />
        <span className="text-muted-foreground uppercase text-xs font-bold">PASSWORD POLICY</span>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">📏</span>
          <div>
            <p className="font-bold text-foreground">Minimum 12 characters</p>
            <p className="text-muted-foreground text-xs mt-1">Longer passwords are harder to crack</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">Aa</span>
          <div>
            <p className="font-bold text-foreground">Include uppercase and lowercase letters</p>
            <p className="text-muted-foreground text-xs mt-1">Mix character types for complexity</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">123</span>
          <div>
            <p className="font-bold text-foreground">Include at least one number</p>
            <p className="text-muted-foreground text-xs mt-1">Numbers increase entropy</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">!@#</span>
          <div>
            <p className="font-bold text-foreground">Include at least one special character</p>
            <p className="text-muted-foreground text-xs mt-1">Symbols make passwords stronger</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">📚</span>
          <div>
            <p className="font-bold text-foreground">Avoid dictionary words</p>
            <p className="text-muted-foreground text-xs mt-1">Common words are easy to guess</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">👤</span>
          <div>
            <p className="font-bold text-foreground">Avoid personal or company information</p>
            <p className="text-muted-foreground text-xs mt-1">Don&apos;t use names, birthdates, or usernames</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">1️⃣</span>
          <div>
            <p className="font-bold text-foreground">Avoid sequential characters</p>
            <p className="text-muted-foreground text-xs mt-1">e.g., 123456, abcdef</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">⌨️</span>
          <div>
            <p className="font-bold text-foreground">Avoid keyboard patterns</p>
            <p className="text-muted-foreground text-xs mt-1">e.g., qwerty, asdfgh</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">↻</span>
          <div>
            <p className="font-bold text-foreground">Do not reuse old passwords</p>
            <p className="text-muted-foreground text-xs mt-1">Create unique passwords for each account</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-accent font-bold">⚠️</span>
          <div>
            <p className="font-bold text-foreground">Do not use leaked or common passwords</p>
            <p className="text-muted-foreground text-xs mt-1">Check against known breach databases</p>
          </div>
        </div>
      </div>
    </div>
  )
}
