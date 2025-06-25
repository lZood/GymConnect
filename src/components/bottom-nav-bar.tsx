"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ClipboardList, LineChart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/home", icon: Home, label: "Inicio" },
  { href: "/routine", icon: ClipboardList, label: "Rutina" },
  { href: "/progress", icon: LineChart, label: "Progreso" },
  { href: "/profile", icon: User, label: "Perfil" },
];

export default function BottomNavBar() {
  const pathname = usePathname();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-card/80 backdrop-blur-sm border-t border-border/50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
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
