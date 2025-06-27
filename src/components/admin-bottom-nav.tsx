
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, FileText, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/platform-admin', icon: Home, label: 'Dashboard' },
  { href: '/platform-admin/gyms', icon: Building, label: 'Gimnasios' },
  { href: '/platform-admin/content', icon: FileText, label: 'Contenido' },
  { href: '/platform-admin/users', icon: Users, label: 'Usuarios' },
  { href: '/platform-admin/settings', icon: Settings, label: 'Ajustes' },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-card/95 backdrop-blur-sm border-t lg:hidden z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full h-full text-muted-foreground transition-colors duration-200",
                isActive ? "text-primary" : "hover:text-foreground"
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
