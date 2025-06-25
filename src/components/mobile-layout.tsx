import { cn } from "@/lib/utils";

export default function MobileLayout({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="w-full max-w-[450px] aspect-[9/19.5] bg-background text-foreground rounded-[40px] border-[10px] border-gray-800 shadow-2xl overflow-hidden flex flex-col relative">
      <div className={cn("flex-1 h-full overflow-y-auto", className)}>
        {children}
      </div>
    </div>
  );
}
