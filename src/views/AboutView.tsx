import { ArrowLeftRight, Github, Shield, Zap } from 'lucide-react'

export default function AboutView() {
  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-text-primary">About</h1>
        <p className="text-text-secondary text-sm mt-1">Janus Swap v1.0.0</p>
      </div>

      <div className="max-w-lg space-y-4">
        <div className="bg-bg-card border border-border rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent-blue flex items-center justify-center mb-4 shadow-[0_0_24px_rgba(59,111,212,0.4)]">
            <ArrowLeftRight size={28} className="text-white" />
          </div>
          <h2 className="text-text-primary font-bold text-xl mb-1">Janus Swap</h2>
          <p className="text-text-secondary text-sm mb-4">Trustless cross-chain atomic swaps</p>
          <p className="text-text-muted text-xs leading-relaxed">
            Janus Swap enables direct peer-to-peer exchange between cryptocurrencies without
            custodians or centralized exchanges. Swaps are atomic — either both sides complete
            or neither does, guaranteed by cryptographic hash time-lock contracts (HTLCs).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Shield, title: 'Non-custodial', desc: 'You control your keys at all times' },
            { icon: Zap, title: 'Fast', desc: 'Swaps complete in minutes' },
            { icon: Github, title: 'Open source', desc: 'Fully auditable codebase' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-bg-card border border-border rounded-2xl p-4 text-center">
              <Icon size={20} className="text-accent-blue-light mx-auto mb-2" />
              <div className="text-text-primary text-xs font-semibold mb-1">{title}</div>
              <div className="text-text-muted text-xs">{desc}</div>
            </div>
          ))}
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-4">
          <h3 className="text-text-primary font-semibold text-sm mb-3">Supported Pairs</h3>
          <div className="flex flex-wrap gap-2">
            {['LTC ⇌ XMR', 'LTC ⇌ BTC', 'BTC ⇌ XMR', 'LTC ⇌ ETH'].map(pair => (
              <span key={pair} className="px-3 py-1 rounded-lg bg-bg-hover border border-border text-text-secondary text-xs font-medium">
                {pair}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-border rounded-2xl p-4">
          <h3 className="text-text-primary font-semibold text-sm mb-2">Version Info</h3>
          <div className="space-y-1.5">
            {[
              ['App version', '1.0.0'],
              ['Electron', '32.x'],
              ['Protocol version', '2.1'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-text-muted">{k}</span>
                <span className="text-text-secondary font-mono">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
