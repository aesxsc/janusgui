import { useState } from 'react'
import { Copy, Plus, Check } from 'lucide-react'

const initialAddresses = [
  { id: 1, label: 'LTC Wallet', address: 'LdP8Qox1VAhCzLJNqrr74YovaWYyNBUWvL', coin: 'LTC' },
  { id: 2, label: 'XMR Wallet', address: '48edfHu7V9Z84YzzMa6fUueoELZ9ZqpqV5quoqoGfBKJxHMQCVAiW9eMQT5REGJBsz3L8GKHSuFaFNpJrj8L4Gr3Qd', coin: 'XMR' },
  { id: 3, label: 'BTC Cold Storage', address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwfvds', coin: 'BTC' },
]

export default function AddressesView() {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [copied, setCopied] = useState<number | null>(null)
  const [showAdd, setShowAdd] = useState(false)
  const [newLabel, setNewLabel] = useState('')
  const [newAddr, setNewAddr] = useState('')
  const [newCoin, setNewCoin] = useState('LTC')

  const handleCopy = (id: number, addr: string) => {
    navigator.clipboard.writeText(addr)
    setCopied(id)
    setTimeout(() => setCopied(null), 1500)
  }

  const handleAdd = () => {
    if (!newAddr.trim()) return
    setAddresses(a => [...a, { id: Date.now(), label: newLabel || newCoin + ' Address', address: newAddr, coin: newCoin }])
    setNewLabel('')
    setNewAddr('')
    setShowAdd(false)
  }

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Addresses</h1>
          <p className="text-text-secondary text-sm mt-1">Your saved wallet addresses</p>
        </div>
        <button
          onClick={() => setShowAdd(s => !s)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-accent-blue hover:bg-accent-blue-hover text-white text-sm font-medium transition-colors"
        >
          <Plus size={15} />
          Add Address
        </button>
      </div>

      {showAdd && (
        <div className="bg-bg-card border border-border rounded-2xl p-4 mb-4">
          <h3 className="text-text-primary font-semibold text-sm mb-3">New Address</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-text-muted text-xs block mb-1">Label</label>
              <input
                value={newLabel}
                onChange={e => setNewLabel(e.target.value)}
                placeholder="My Wallet"
                className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors"
              />
            </div>
            <div>
              <label className="text-text-muted text-xs block mb-1">Coin</label>
              <select
                value={newCoin}
                onChange={e => setNewCoin(e.target.value)}
                className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue transition-colors"
              >
                {['LTC', 'XMR', 'BTC', 'ETH'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="text-text-muted text-xs block mb-1">Address</label>
            <input
              value={newAddr}
              onChange={e => setNewAddr(e.target.value)}
              placeholder="Enter wallet address..."
              className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors font-mono"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors">Cancel</button>
            <button onClick={handleAdd} className="px-4 py-2 text-sm bg-accent-blue hover:bg-accent-blue-hover text-white rounded-lg transition-colors">Save</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-bg-card border border-border hover:border-border-light rounded-2xl px-4 py-3.5 transition-colors">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-bg-hover text-text-secondary">{addr.coin}</span>
                <span className="text-text-primary text-sm font-semibold">{addr.label}</span>
              </div>
              <button
                onClick={() => handleCopy(addr.id, addr.address)}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary transition-colors"
              >
                {copied === addr.id ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                {copied === addr.id ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="text-text-muted text-xs font-mono truncate">{addr.address}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
