// src/components/layout/PageWrapper.tsx
// Consistent padding + max-width wrapper used inside every page

interface PageWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`w-full max-w-[1280px] px-5 sm:px-8 py-8 sm:py-10 mx-auto ${className}`}>
      {children}
    </div>
  )
}
