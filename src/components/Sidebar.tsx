import { ArrowLeftRight, Clock, BookMarked, Settings, Info, ChevronRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { View } from '../App'

interface SidebarProps {
  activeView: View
  onNavigate: (view: View) => void
}

const navItems: { id: View; label: string; icon: LucideIcon }[] = [
  { id: 'swap', label: 'Swap', icon: ArrowLeftRight },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'addresses', label: 'Addresses', icon: BookMarked },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'about', label: 'About', icon: Info },
]

export default function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="w-56 flex flex-col bg-bg-primary border-r border-border shrink-0">
      <div className="flex items-center gap-3 px-4 py-5">
        <div className="w-10 h-10 rounded-xl bg-accent-blue flex items-center justify-center shrink-0">
          <ArrowLeftRight size={18} className="text-white" />
        </div>
        <div>
          <div className="text-text-primary font-semibold text-sm leading-tight">Atomic Swap</div>
          <div className="text-text-muted text-xs mt-0.5">LTC ⇌ XMR</div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-1 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeView === id
                ? 'bg-bg-active text-accent-blue-light'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-hover'
            }`}
          >
            <Icon size={16} className={activeView === id ? 'text-accent-blue-light' : ''} />
            {label}
          </button>
        ))}
      </nav>

      <div className="p-3">
        <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-bg-card border border-border hover:border-border-light transition-colors">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_2px_rgba(74,222,128,0.4)] shrink-0" />
            <div className="text-left">
              <div className="text-text-primary text-xs font-semibold">Ready</div>
              <div className="text-text-muted text-xs">Connected to network</div>
            </div>
          </div>
          <ChevronRight size={14} className="text-text-muted" />
        </button>
      </div>
    </aside>
  )
}
