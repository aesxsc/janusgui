import { useState } from 'react'

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-10 h-5.5 rounded-full transition-colors relative flex items-center ${value ? 'bg-accent-blue' : 'bg-bg-hover border border-border'}`}
      style={{ height: '22px', width: '40px' }}
    >
      <span
        className={`absolute w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : 'translate-x-1'}`}
        style={{ width: '16px', height: '16px' }}
      />
    </button>
  )
}

export default function SettingsView() {
  const [autoRate, setAutoRate] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoLock, setAutoLock] = useState(false)
  const [network, setNetwork] = useState('mainnet')
  const [node, setNode] = useState('')

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Application preferences</p>
      </div>

      <div className="space-y-4 max-w-lg">
        {/* Network */}
        <div className="bg-bg-card border border-border rounded-2xl p-4">
          <h3 className="text-text-primary font-semibold text-sm mb-3">Network</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text-primary text-sm">Network</div>
                <div className="text-text-muted text-xs">Select mainnet or testnet</div>
              </div>
              <select
                value={network}
                onChange={e => setNetwork(e.target.value)}
                className="bg-bg-hover border border-border rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent-blue transition-colors"
              >
                <option value="mainnet">Mainnet</option>
                <option value="testnet">Testnet</option>
              </select>
            </div>
            <div>
              <div className="text-text-primary text-sm mb-1">Custom Node URL</div>
              <input
                value={node}
                onChange={e => setNode(e.target.value)}
                placeholder="Leave empty for default"
                className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-bg-card border border-border rounded-2xl p-4">
          <h3 className="text-text-primary font-semibold text-sm mb-3">Preferences</h3>
          <div className="space-y-4">
            {[
              { label: 'Auto-refresh rates', sub: 'Automatically refresh exchange rates', value: autoRate, onChange: setAutoRate },
              { label: 'Notifications', sub: 'Show swap status notifications', value: notifications, onChange: setNotifications },
              { label: 'Dark mode', sub: 'Use dark application theme', value: darkMode, onChange: setDarkMode },
              { label: 'Auto-lock wallet', sub: 'Lock after 10 minutes of inactivity', value: autoLock, onChange: setAutoLock },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <div className="text-text-primary text-sm">{item.label}</div>
                  <div className="text-text-muted text-xs">{item.sub}</div>
                </div>
                <Toggle value={item.value} onChange={item.onChange} />
              </div>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div className="bg-bg-card border border-red-500/20 rounded-2xl p-4">
          <h3 className="text-red-400 font-semibold text-sm mb-3">Danger Zone</h3>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2.5 rounded-lg border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 text-sm transition-colors">
              Clear swap history
            </button>
            <button className="w-full text-left px-3 py-2.5 rounded-lg border border-red-500/20 hover:border-red-500/50 text-red-400 hover:text-red-300 text-sm transition-colors">
              Reset all settings
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
