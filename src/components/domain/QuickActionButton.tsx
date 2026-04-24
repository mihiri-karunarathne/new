// src/components/domain/QuickActionButton.tsx
// Quick action link with color-coded icon badge
// Accepts dynamic color and uses CSS custom property for proper styling

interface QuickActionButtonProps {
  label: string
  description: string
  href: string
  color: string
}

export default function QuickActionButton({
  label,
  description,
  href,
  color,
}: QuickActionButtonProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8FAFC] transition-colors group"
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 quick-action-icon"
        data-color={color}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-[#0F172A] group-hover:text-[#0F766E] transition-colors">
          {label}
        </p>
        <p className="text-[11px] text-[#94A3B8] truncate">{description}</p>
      </div>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>
  )
}
