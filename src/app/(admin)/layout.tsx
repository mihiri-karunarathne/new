'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import styles from './AdminLayout.module.css'

const MOCK_USER = { name: 'Admin User', role: 'ADMIN' }

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className={styles.layoutRoot}>
      {/* Sidebar — always visible on desktop, drawer on mobile */}
      <div className={`${styles.sidebarWrapper} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <Sidebar
          role={MOCK_USER.role}
          userName={MOCK_USER.name}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Right: header + scrollable content */}
      <div className={styles.contentColumn}>
        <Header
          userName={MOCK_USER.name}
          role={MOCK_USER.role}
          onMenuToggle={() => setSidebarOpen(true)}
          notificationCount={1}
        />
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </div>
  )
}
