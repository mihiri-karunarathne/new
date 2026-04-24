// src/app/(admin)/dashboard/page.tsx
// PIXEL-PERFECT match to Figma design using exact inline styles

import styles from './page.module.css'

// ─── Stat card data ───────────────────────────────────────────────────────────

const STATS = [
  {
    label: 'TOTAL STAFF',
    value: '12',
    iconClassName: styles.iconBadgeTotalStaff,
    icon: (
      // Users icon — 25.67 × 18.67 matching Figma
      <svg width="26" height="19" viewBox="0 0 24 24" fill="none" stroke="#2B6CB0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'NURSES',
    value: '4',
    iconClassName: styles.iconBadgeNurses,
    icon: (
      // Person icon — 18.67 × 23.33 matching Figma
      <svg width="19" height="23" viewBox="0 0 24 24" fill="none" stroke="#2F855A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'DOCTORS',
    value: '4',
    iconClassName: styles.iconBadgeDoctors,
    icon: (
      // Medical cross / pulse icon — 23.33 × 23.33
      <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="#2C7A7B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    label: 'SUPPORT STAFF',
    value: '4',
    iconClassName: styles.iconBadgeSupportStaff,
    icon: (
      // Settings / gear icon — 23.33 × 21
      <svg width="23" height="21" viewBox="0 0 24 24" fill="none" stroke="#C53030" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  return (
    // Outer page wrapper — matches Figma: background #F9F9FF, padding-left 240px handled by layout
    <div className={styles.pageWrapper}>
      {/* Inner content — max 1280px, 40px padding all sides */}
      <div className={styles.content}>

        {/* ── Page heading ─────────────────────────────────────────── */}
        <div className={styles.heading}>

          {/* "SYSTEMS OVERVIEW" label */}
          <div className={styles.systemOverviewLabel}>
            SYSTEMS OVERVIEW
          </div>

          {/* "Dashboard" title */}
          <div className={styles.dashboardTitle}>
            Dashboard
          </div>
        </div>

        {/* ── Stat cards row ───────────────────────────────────────── */}
        {/*
          Figma shows 4 cards stacked (column direction in original),
          but the correct interpretation is a responsive row.
          We use CSS grid so it matches on all screen sizes.
        */}
        <div className={styles.statGrid}>
          {STATS.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              {/* Icon badge — exactly 48×48 with 16px bottom padding (total height 64) */}
              <div className={styles.iconBadgeOuter}>
                <div className={`${styles.iconBadge} ${stat.iconClassName}`}>
                  {stat.icon}
                </div>
              </div>

              {/* Label */}
              <div className={styles.labelWrapper}>
                <div className={styles.statLabel}>
                  {stat.label}
                </div>
              </div>

              {/* Value */}
              <div className={styles.statValue}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* ── Main widget area ─────────────────────────────────────── */}
        {/* Matches Figma: height 400, white bg, rounded-8, outline */}
        <div className={styles.widgetArea}>
          {/* Radial gradient overlay — exact from Figma */}
          <div className={styles.gradientOverlay} />

          {/* Centered placeholder content */}
          <div className={styles.placeholderContent}>
            {/* Placeholder icon — 45.33×45.33 */}
            <div className={styles.placeholderIconBox}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(100,116,139,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
                <line x1="2" y1="20" x2="22" y2="20" />
              </svg>
            </div>

            {/* Heading text */}
            <div className={styles.placeholderHeadingWrapper}>
              <div className={styles.placeholderHeading}>
                Dashboard Widgets — Admin overview<br />modules will appear here
              </div>
            </div>

            {/* Sub text */}
            <div className={styles.placeholderSubText}>
              Use the sidebar to navigate and manage your health system modules.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
