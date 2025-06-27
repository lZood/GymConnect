
import AdminBottomNav from "@/components/admin-bottom-nav";
import AdminSidebar from "@/components/admin-sidebar";

export default function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen bg-background">
      <AdminSidebar />
      <main className="lg:ml-64 p-4 md:p-6 pb-24 lg:pb-6">
        {children}
      </main>
      <AdminBottomNav />
    </div>
  );
}
