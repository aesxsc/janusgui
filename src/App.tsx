import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TitleBar from './components/TitleBar'
import SwapView from './views/SwapView'
import HistoryView from './views/HistoryView'
import AddressesView from './views/AddressesView'
import SettingsView from './views/SettingsView'
import AboutView from './views/AboutView'

export type View = 'swap' | 'history' | 'addresses' | 'settings' | 'about'

export default function App() {
  const [activeView, setActiveView] = useState<View>('swap')

  const renderView = () => {
    switch (activeView) {
      case 'swap': return <SwapView />
      case 'history': return <HistoryView />
      case 'addresses': return <AddressesView />
      case 'settings': return <SettingsView />
      case 'about': return <AboutView />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-bg-primary overflow-hidden">
      <TitleBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} onNavigate={setActiveView} />
        <main className="flex-1 overflow-hidden bg-bg-secondary">
          {renderView()}
        </main>
      </div>
    </div>
  )
}
