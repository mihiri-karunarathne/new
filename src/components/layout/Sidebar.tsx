'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Sidebar.module.css'
// ─── Nav config ──────────────────────────────────────────────────────────────

type NavItem = { label: string; href: string; icon: React.ReactNode }

const NAV_CONFIG: Record<string, NavItem[]> = {
  ADMIN: [
    { label: 'Dashboard',       href: '/dashboard',   icon: <IconGrid /> },
    { label: 'Staff Management',href: '/users',        icon: <IconUsers /> },
    { label: 'Wards',           href: '/wards',        icon: <IconHome /> },
    { label: 'Diet Types',      href: '/diet-types',   icon: <IconCup /> },
  ],
  NURSE: [
    { label: 'Dashboard',       href: '/nurse-dashboard',        icon: <IconGrid /> },
    { label: 'Patients',        href: '/patients',          icon: <IconUser /> },
    { label: 'Register Patient',href: '/register-patient',  icon: <IconUserPlus /> },
    { label: 'Diet Entry',      href: '/diet-entry',        icon: <IconEdit /> },
  ],
  DOCTOR: [
    { label: 'Dashboard',    href: '/doctor-dashboard',    icon: <IconGrid /> },
    { label: 'Patients',     href: '/patients',     icon: <IconUser /> },
    { label: 'Prescriptions',href: '/prescriptions',icon: <IconFile /> },
  ],
  OFFICE_CLERK: [
    { label: 'Dashboard',      href: '/office-dashboard',             icon: <IconGrid /> },
    { label: 'Ward Summary',   href: '/ward-summary',          icon: <IconHome /> },
    { label: 'Hospital Summary',href: '/hospital-summary',     icon: <IconBar /> },
    { label: 'Ingredients',    href: '/ingredient-calculation',icon: <IconBox /> },
    { label: 'Vendor Order',   href: '/vendor-order',          icon: <IconCart /> },
    { label: 'Emergency Order',href: '/emergency-order',       icon: <IconAlert /> },
    { label: 'Reports',        href: '/reports',               icon: <IconDoc /> },
  ],
  KITCHEN_CLERK: [
    { label: 'Dashboard',     href: '/kitchen-dashboard',     icon: <IconGrid /> },
    { label: 'Ingredients',   href: '/ingredients',   icon: <IconBox /> },
    { label: 'Confirm Receipt',href: '/receipt-confirm',icon: <IconCheck /> },
    { label: 'Meal Dispatch', href: '/meal-dispatch', icon: <IconClock /> },
    { label: 'Leftovers',     href: '/leftovers',     icon: <IconTrash /> },
  ],
}

const ROLE_LABELS: Record<string, string> = {
  ADMIN: 'Health System Admin',
  NURSE: 'Nurse',
  DOCTOR: 'Doctor',
  OFFICE_CLERK: 'Office Clerk',
  KITCHEN_CLERK: 'Kitchen Clerk',
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  role?: string
  userName?: string
  isOpen?: boolean
  onClose?: () => void
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Sidebar({
  role = 'ADMIN',
  userName = 'Admin User',
  isOpen = true,
  onClose,
}: SidebarProps) {
  const pathname = usePathname()
  const navItems = NAV_CONFIG[role] ?? []
  const roleLabel = ROLE_LABELS[role] ?? role

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className={styles.mobileOverlay}
        />
      )}

      <aside className={styles.sidebar}>
        {/* ── Brand ── */}
        <div className={styles.brandSection}>
          <div className={styles.brandTitle}>
            DigitalEase
          </div>
          <div className={styles.brandSubtitle}>
            HEALTH SYSTEM
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.userRole}>{roleLabel}</div>
          </div>
        </div>

        {/* ── Nav items ── */}
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
              >
                <span className={`${styles.navIcon} ${isActive ? styles.navIconActive : ''}`}>
                  {item.icon}
                </span>
                <span className={`${styles.navLabel} ${isActive ? styles.navLabelActive : ''}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* ── Bottom: Settings ── */}
        <div className={styles.settingsSection}>
          <Link
            href="/settings"
            className={styles.settingsLink}
          >
            <span className={styles.settingsIcon}>
              <IconSettings />
            </span>
            <span className={styles.settingsLabel}>
              Settings
            </span>
          </Link>
        </div>
      </aside>
    </>
  )
}

// ─── SVG Icons (18×18) ───────────────────────────────────────────────────────

function IconGrid() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  )
}
function IconUsers() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function IconCup() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}
function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function IconUserPlus() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" /><line x1="23" y1="11" x2="17" y2="11" />
    </svg>
  )
}
function IconEdit() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function IconFile() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}
function IconBar() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  )
}
function IconBox() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
function IconCart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}
function IconAlert() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
      <line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}
function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function IconTrash() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}
function IconSettings() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}
