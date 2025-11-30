'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/clean-architecture', label: 'Clean Architecture', icon: '🏗️' },
  { href: '/arquitecturas', label: 'Escalabilidad', icon: '📐' },
  { href: '/learn', label: 'Next.js Guide', icon: '📚' },
];

export function Navbar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-white hover:text-blue-400 transition-colors"
        >
          🏗️ Clean Architecture
        </Link>

        <div className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-1 transition-colors ${
                isActive(item.href)
                  ? 'text-blue-400 font-medium'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="hidden sm:inline">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
