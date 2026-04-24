'use client'

import styles from './Header.module.css'

interface HeaderProps {
  userName?: string
  role?: string
  onMenuToggle?: () => void
  notificationCount?: number
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'HEALTH SYSTEM ADMIN',
  NURSE: 'NURSE',
  DOCTOR: 'DOCTOR',
  OFFICE_CLERK: 'OFFICE CLERK',
  KITCHEN_CLERK: 'KITCHEN CLERK',
}

export default function Header({
  userName = 'Admin User',
  role = 'ADMIN',
  onMenuToggle,
  notificationCount = 1,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      {/* Left: mobile hamburger + app name */}
      <div className={styles.leftSection}>
        {/* Hamburger - only on mobile via CSS */}
        <button
          onClick={onMenuToggle}
          className={styles.mobileMenuBtn}
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* App name — shown on desktop in header */}
        <div className={styles.appName}>
          DigitalEase Health
        </div>
      </div>

      {/* Right: bell + user info + avatar */}
      <div className={styles.rightSection}>

        {/* Notification bell */}
        <div className={styles.notificationWrapper}>
          <button
            className={styles.notificationButton}
            aria-label="Notifications"
          >
            <svg width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          {notificationCount > 0 && (
            <div className={styles.notificationDot} />
          )}
        </div>

        {/* User info + avatar */}
        <div className={styles.userSection}>
          {/* Name + role label */}
          <div className={styles.userInfo}>
            <div className={styles.userName}>
              {userName}
            </div>
            <div className={styles.roleLabel}>
              {ROLE_LABELS[role] ?? role}
            </div>
          </div>

          {/* Avatar circle */}
          <div className={styles.avatar}>
            <span className={styles.avatarInitial}>
              {userName.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
