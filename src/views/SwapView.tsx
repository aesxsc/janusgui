import { useState, useRef, useEffect } from 'react'
import { Settings, ArrowUpDown, RefreshCw, ChevronDown, CheckCircle2 } from 'lucide-react'

const COINS = [
  {
    id: 'LTC',
    name: 'Litecoin',
    symbol: 'LTC',
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#345D9D" />
        <text x="16" y="21" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">Ł</text>
      </svg>
    ),
  },
  {
    id: 'XMR',
    name: 'Monero',
    symbol: 'XMR',
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#F26822" />
        <text x="16" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">M</text>
      </svg>
    ),
  },
  {
    id: 'BTC',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#F7931A" />
        <text x="16" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">₿</text>
      </svg>
    ),
  },
  {
    id: 'ETH',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: (
      <svg viewBox="0 0 32 32" width="28" height="28">
        <circle cx="16" cy="16" r="16" fill="#627EEA" />
        <text x="16" y="21" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="Arial">Ξ</text>
      </svg>
    ),
  },
]

const RATE = 0.645289

const STEPS = [
  { n: 1, title: 'Setup', sub: 'Create contract' },
  { n: 2, title: 'Fund', sub: 'Lock LTC' },
  { n: 3, title: 'Claim', sub: 'Lock & claim XMR' },
  { n: 4, title: 'Finish', sub: 'Complete swap' },
]

type Coin = typeof COINS[0]

interface CoinSelectProps {
  selected: Coin
  coins: Coin[]
  onSelect: (coin: Coin) => void
}

function CoinSelect({ selected, coins, onSelect }: CoinSelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2.5 bg-bg-hover hover:bg-border rounded-xl px-3 py-2 transition-colors"
      >
        {selected.logo}
        <span className="text-text-primary font-semibold text-base">{selected.symbol}</span>
        <ChevronDown size={14} className="text-text-secondary" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-bg-card border border-border rounded-xl shadow-2xl z-50 w-44 overflow-hidden">
          {coins.map(coin => (
            <button
              key={coin.id}
              onClick={() => { onSelect(coin); setOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 hover:bg-bg-hover transition-colors text-sm ${
                coin.id === selected.id ? 'text-accent-blue-light' : 'text-text-primary'
              }`}
            >
              {coin.logo}
              <div className="text-left">
                <div className="font-semibold">{coin.symbol}</div>
                <div className="text-text-muted text-xs">{coin.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SwapView() {
  const [sendCoin, setSendCoin] = useState(COINS[0])
  const [receiveCoin, setReceiveCoin] = useState(COINS[1])
  const [sendAmount, setSendAmount] = useState('1.00000000')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [feePaidBy, setFeePaidBy] = useState<'You' | 'Them'>('You')
  const [feeOpen, setFeeOpen] = useState(false)
  const feeRef = useRef<HTMLDivElement>(null)

  const available = 1.23456789
  const receiveAmount = (parseFloat(sendAmount) * RATE).toFixed(8)
  const sendUsd = (parseFloat(sendAmount) * 88.41).toFixed(2)
  const receiveUsd = (parseFloat(receiveAmount) * 137.32).toFixed(2)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (feeRef.current && !feeRef.current.contains(e.target as Node)) setFeeOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSwapCoins = () => {
    const tmp = sendCoin
    setSendCoin(receiveCoin)
    setReceiveCoin(tmp)
  }

  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">New Swap</h1>
          <p className="text-text-secondary text-sm mt-1">
            Atomic swap {sendCoin.symbol} to {receiveCoin.symbol}
          </p>
        </div>
        <button
          onClick={() => setShowAdvanced(a => !a)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-medium transition-colors ${
            showAdvanced
              ? 'bg-bg-active border-accent-blue text-accent-blue-light'
              : 'bg-bg-card border-border text-text-secondary hover:text-text-primary hover:border-border-light'
          }`}
        >
          <Settings size={14} />
          Advanced
        </button>
      </div>

      <div className="bg-bg-card rounded-2xl border border-border p-4 mb-1">
        <div className="mb-3">
          <span className="text-text-secondary text-sm">You send</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <CoinSelect
            selected={sendCoin}
            coins={COINS.filter(c => c.id !== receiveCoin.id)}
            onSelect={setSendCoin}
          />
          <div className="text-right">
            <input
              type="number"
              value={sendAmount}
              onChange={e => setSendAmount(e.target.value)}
              className="bg-transparent text-text-primary text-2xl font-bold text-right w-48 outline-none focus:text-accent-blue-light transition-colors"
              step="0.00000001"
              min="0"
            />
            <div className="text-text-secondary text-sm">≈ ${sendUsd} USD</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-text-muted text-xs">
            Available: {available.toFixed(8)} {sendCoin.symbol}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setSendAmount((available / 2).toFixed(8))}
              className="px-3 py-1 rounded-lg bg-bg-hover hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
            >
              HALF
            </button>
            <button
              onClick={() => setSendAmount(available.toFixed(8))}
              className="px-3 py-1 rounded-lg bg-bg-hover hover:bg-border text-text-secondary hover:text-text-primary text-xs font-medium transition-colors"
            >
              MAX
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center my-1 z-10 relative">
        <button
          onClick={handleSwapCoins}
          className="w-9 h-9 rounded-full bg-bg-card border border-border hover:border-border-light hover:bg-bg-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-all hover:rotate-180 duration-300"
        >
          <ArrowUpDown size={15} />
        </button>
      </div>

      <div className="bg-bg-card rounded-2xl border border-border p-4 mb-4">
        <div className="mb-3">
          <span className="text-text-secondary text-sm">You receive</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <CoinSelect
            selected={receiveCoin}
            coins={COINS.filter(c => c.id !== sendCoin.id)}
            onSelect={setReceiveCoin}
          />
          <div className="text-right">
            <div className="text-text-primary text-2xl font-bold">{receiveAmount}</div>
            <div className="text-text-secondary text-sm">≈ ${receiveUsd} USD</div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-text-muted text-xs">
            <span>Rate: 1 {sendCoin.symbol} ≈ {RATE} {receiveCoin.symbol}</span>
            <button className="text-text-secondary hover:text-text-primary transition-colors">
              <RefreshCw size={12} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-text-muted text-xs" ref={feeRef}>
            <span>Network fee paid by:</span>
            <div className="relative">
              <button
                onClick={() => setFeeOpen(o => !o)}
                className="flex items-center gap-1 text-text-secondary hover:text-text-primary transition-colors"
              >
                {feePaidBy}
                <ChevronDown size={12} />
              </button>
              {feeOpen && (
                <div className="absolute bottom-full right-0 mb-1 bg-bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                  {(['You', 'Them'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setFeePaidBy(opt); setFeeOpen(false) }}
                      className={`w-full px-4 py-2 text-xs hover:bg-bg-hover transition-colors whitespace-nowrap ${
                        feePaidBy === opt ? 'text-accent-blue-light' : 'text-text-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAdvanced && (
        <div className="bg-bg-card rounded-2xl border border-border p-4 mb-4">
          <h3 className="text-text-primary font-semibold text-sm mb-3">Advanced Settings</h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-text-muted text-xs block mb-1">Timelock (hours)</label>
              <input
                type="number"
                defaultValue="24"
                className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue transition-colors"
              />
            </div>
            <div>
              <label className="text-text-muted text-xs block mb-1">Min confirmation blocks</label>
              <input
                type="number"
                defaultValue="6"
                className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary outline-none focus:border-accent-blue transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="text-text-muted text-xs block mb-1">Peer address (optional)</label>
            <input
              type="text"
              placeholder="Leave empty for automatic peer matching"
              className="w-full bg-bg-hover border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted outline-none focus:border-accent-blue transition-colors"
            />
          </div>
        </div>
      )}

      <div className="bg-bg-card rounded-2xl border border-border px-5 py-4 mb-4">
        <div className="flex items-center justify-between">
          {STEPS.map((step, i) => (
            <div key={step.n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.n === 1
                    ? 'bg-accent-blue text-white shadow-[0_0_12px_2px_rgba(59,111,212,0.4)]'
                    : 'bg-bg-hover text-text-muted border border-border'
                }`}>
                  {step.n === 1 ? <CheckCircle2 size={16} className="text-white" /> : step.n}
                </div>
                <div className="mt-1.5 text-center">
                  <div className={`text-xs font-semibold ${step.n === 1 ? 'text-text-primary' : 'text-text-muted'}`}>
                    {step.title}
                  </div>
                  <div className="text-text-muted text-xs">{step.sub}</div>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 mx-3 mb-6">
                  <div className="h-px bg-border w-12" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-accent-blue hover:bg-accent-blue-hover active:scale-[0.99] text-white font-semibold text-base flex items-center justify-center gap-3 transition-all duration-150 shadow-[0_4px_24px_rgba(59,111,212,0.4)]">
        Start Swap
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M3 9H15M15 9L10 4M15 9L10 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
