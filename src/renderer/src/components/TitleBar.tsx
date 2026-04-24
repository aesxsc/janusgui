declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        send: (channel: string, ...args: unknown[]) => void
      }
    }
  }
}

export default function TitleBar() {
  const handleMinimize = () => window.electron?.ipcRenderer.send('window-minimize')
  const handleMaximize = () => window.electron?.ipcRenderer.send('window-maximize')
  const handleClose = () => window.electron?.ipcRenderer.send('window-close')

  return (
    <div className="titlebar-drag flex items-center justify-between h-9 bg-bg-primary border-b border-border px-4 shrink-0">
      <span className="text-text-muted text-xs font-medium tracking-widest uppercase">
        Janus Swap
      </span>
      <div className="titlebar-no-drag flex items-center gap-1">
        <button
          onClick={handleMinimize}
          className="w-7 h-7 flex items-center justify-center rounded text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <svg width="10" height="2" viewBox="0 0 10 2" fill="currentColor">
            <rect width="10" height="2" rx="1" />
          </svg>
        </button>
        <button
          onClick={handleMaximize}
          className="w-7 h-7 flex items-center justify-center rounded text-text-secondary hover:text-text-primary hover:bg-bg-hover transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="0.75" y="0.75" width="8.5" height="8.5" rx="1" />
          </svg>
        </button>
        <button
          onClick={handleClose}
          className="w-7 h-7 flex items-center justify-center rounded text-text-secondary hover:text-white hover:bg-red-500/80 transition-colors"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="1" y1="1" x2="9" y2="9" />
            <line x1="9" y1="1" x2="1" y2="9" />
          </svg>
        </button>
      </div>
    </div>
  )
}
