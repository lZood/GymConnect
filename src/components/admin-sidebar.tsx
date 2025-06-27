
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Building, FileText, Users, Settings, LogOut, Dumbbell } from 'lucide-react';

const navItems = [
  { href: '/platform-admin', icon: Home, label: 'Dashboard' },
  { href: '/platform-admin/gyms', icon: Building, label: 'Gimnasios' },
  { href: '/platform-admin/content', icon: FileText, label: 'Contenido Global' },
  { href: '/platform-admin/users', icon: Users, label: 'Usuarios' },
  { href: '/platform-admin/settings', icon: Settings, label: 'Configuración' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 bg-card border-r h-full flex flex-col">
      <div className="p-6 border-b flex items-center gap-3">
        <Dumbbell className="h-8 w-8 text-primary" />
        <div>
            <h2 className="text-xl font-bold">GymConnect</h2>
            <p className="text-xs text-muted-foreground">Panel Super Admin</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
         <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </Link>
      </div>
    </aside>
  );
}
