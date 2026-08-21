'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/app', label: 'Dashboard' },
  { href: '/app/spending', label: 'Spending' },
  { href: '/app/extra', label: 'Extra' },
  { href: '/app/debt', label: 'Debt' },
  { href: '/app/savings', label: 'Savings' },
  { href: '/app/settings', label: 'Settings' },
] as const

export function AppNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Sections"
      // Scrolls horizontally on a 375px phone rather than wrapping to two rows.
      className="-mx-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-1 border-b border-hairline">
        {LINKS.map(({ href, label }) => {
          const active = href === '/app' ? pathname === href : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  '-mb-px inline-block border-b px-3 py-3 text-sm transition-colors duration-150 ease-out',
                  active
                    ? 'border-accent text-content'
                    : 'border-transparent text-content-dim hover:text-content',
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
