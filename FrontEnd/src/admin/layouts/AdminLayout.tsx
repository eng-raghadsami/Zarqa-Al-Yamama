import { Outlet } from "react-router-dom";
import TopNav from "@website/components/TopNav";
import AdminSidebar from "@admin/components/AdminSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";
import { ADMIN_NAV_AVATAR } from "@website/constants/brand";

export default function AdminLayout() {
  return (
    <div className="admin-page-bg text-on-surface min-h-screen">
      <TopNav
        variant="authenticated"
        avatarSrc={ADMIN_NAV_AVATAR}
        hasSidebar
        showSearch
        searchPlaceholder="بحث في النظام..."
      />
      <AdminSidebar belowTopNav />
      <main className="lg:mr-80 pt-24 md:pt-28 px-4 md:px-margin-desktop pb-24 lg:pb-12">
        <Outlet />
      </main>
      <SidebarBottomNav />
    </div>
  );
}
