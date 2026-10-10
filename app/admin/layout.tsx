import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminSession } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // If user is not logged in (e.g. on /admin/login), show without sidebar
  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white relative">
        {children}
      </div>
    );
  }

  // Authenticated admin view
  return (
    <div className="min-h-screen bg-black text-white flex">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto p-6 sm:p-10 max-h-screen">
        {children}
      </div>
    </div>
  );
}
