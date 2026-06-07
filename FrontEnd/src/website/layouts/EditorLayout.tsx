import { Outlet, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import TopNav from "@website/components/TopNav";
import EditorSidebar from "@website/components/EditorSidebar";
import SidebarBottomNav from "@website/components/SidebarBottomNav";
import { EDITOR_NAV_AVATAR } from "@website/constants/brand";

export default function EditorLayout() {
  const { pathname } = useLocation();
  const isContentReview = pathname === WEBSITE_ROUTES.EDITOR_SPACE;
  const isArchive = pathname.startsWith(
    WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE,
  );

  return (
    <div
      className={`text-on-surface min-h-screen ${
        isArchive ? "disinformation-archive-page-bg" : "editor-page-bg"
      }`}
    >
      <TopNav
        variant="authenticated"
        avatarSrc={EDITOR_NAV_AVATAR}
        hasSidebar
        showSearch={isArchive}
        searchPlaceholder="بحث في الأرشيف..."
      />
      <EditorSidebar belowTopNav />
      <main
        className={`lg:mr-80 pt-24 md:pt-28 px-4 md:px-margin-desktop ${
          isContentReview ? "pb-36 lg:pb-32" : "pb-24 lg:pb-12"
        }`}
      >
        <Outlet />
      </main>
      <SidebarBottomNav />
    </div>
  );
}
