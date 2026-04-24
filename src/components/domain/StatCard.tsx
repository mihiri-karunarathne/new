// src/components/domain/StatCard.tsx
// Number + label + icon card — used across ALL dashboards
// Pure presentational — receives value as a prop, no data fetching

import '@/styles/stat-card.css'

type CardColor = 'blue' | 'green' | 'teal' | 'red' | 'purple' | 'orange'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  color?: CardColor
  subtext?: string   // optional e.g. "+3 this week"
}

export default function StatCard({
  label,
  value,
  icon,
  color = 'teal',
  subtext,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E2E8F0]">
      {/* Icon badge */}
      {icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 stat-card-icon"
          data-color={color}
        >
          {icon}
        </div>
      )}

      {/* Label */}
      <p
        className="text-[13px] font-medium uppercase tracking-[0.65px] mb-1 stat-card-label"
      >
        {label}
      </p>

      {/* Value */}
      <p className="text-[28px] font-extrabold text-[#001B3C] leading-[42px]">
        {value}
      </p>

      {/* Optional subtext */}
      {subtext && (
        <p className="text-[12px] mt-2 stat-card-subtext" data-color={color}>
          {subtext}
        </p>
      )}
    </div>
  )
}
