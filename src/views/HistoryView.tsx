import { CheckCircle2, Clock, XCircle, ArrowRight } from 'lucide-react'

const swaps = [
  { id: 'sw_8f3a2b', from: 'LTC', to: 'XMR', fromAmount: '1.00000000', toAmount: '0.64528900', status: 'completed', date: '2024-05-20 21:32', usd: '$88.41' },
  { id: 'sw_7c1d4e', from: 'XMR', to: 'LTC', fromAmount: '2.00000000', toAmount: '3.09871200', status: 'completed', date: '2024-05-18 14:11', usd: '$274.82' },
  { id: 'sw_6b5f9a', from: 'LTC', to: 'BTC', fromAmount: '0.50000000', toAmount: '0.00192840', status: 'pending', date: '2024-05-17 09:55', usd: '$44.20' },
  { id: 'sw_5e8c3d', from: 'BTC', to: 'ETH', fromAmount: '0.00500000', toAmount: '0.08271300', status: 'failed', date: '2024-05-15 18:03', usd: '$230.00' },
  { id: 'sw_4a2b7f', from: 'LTC', to: 'XMR', fromAmount: '5.00000000', toAmount: '3.22644500', status: 'completed', date: '2024-05-12 11:22', usd: '$442.05' },
]

const statusIcon = {
  completed: <CheckCircle2 size={14} className="text-green-400" />,
  pending: <Clock size={14} className="text-yellow-400" />,
  failed: <XCircle size={14} className="text-red-400" />,
}

const statusText = {
  completed: 'text-green-400',
  pending: 'text-yellow-400',
  failed: 'text-red-400',
}

export default function HistoryView() {
  return (
    <div className="flex flex-col h-full p-6 overflow-y-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-bold text-text-primary">History</h1>
        <p className="text-text-secondary text-sm mt-1">Your past atomic swaps</p>
      </div>

      <div className="space-y-2">
        {swaps.map(swap => (
          <div
            key={swap.id}
            className="bg-bg-card border border-border hover:border-border-light rounded-2xl px-4 py-3.5 flex items-center justify-between transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-text-primary font-semibold text-sm">{swap.from}</span>
                <ArrowRight size={14} className="text-text-muted" />
                <span className="text-text-primary font-semibold text-sm">{swap.to}</span>
              </div>
              <div className="text-text-muted text-xs hidden sm:block">{swap.id}</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right hidden md:block">
                <div className="text-text-primary text-sm font-mono">{swap.fromAmount} {swap.from}</div>
                <div className="text-text-muted text-xs">{swap.toAmount} {swap.to}</div>
              </div>
              <div className="text-right">
                <div className="text-text-secondary text-sm">{swap.usd}</div>
                <div className="text-text-muted text-xs">{swap.date}</div>
              </div>
              <div className={`flex items-center gap-1.5 text-xs font-medium capitalize ${statusText[swap.status as keyof typeof statusText]}`}>
                {statusIcon[swap.status as keyof typeof statusIcon]}
                {swap.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {swaps.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-text-muted">
          <Clock size={40} className="mb-3 opacity-30" />
          <p>No swap history yet</p>
        </div>
      )}
    </div>
  )
}
