import BottomNavBar from "@/components/bottom-nav-bar";
import MobileLayout from "@/components/mobile-layout";

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileLayout className="pb-20">
        {children}
        <BottomNavBar />
    </MobileLayout>
  );
}
