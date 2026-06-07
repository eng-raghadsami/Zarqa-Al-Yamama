import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ADMIN_ROUTES, WEBSITE_ROUTES } from "@core/constants/routes";
import LibraryNavDropdown, {
  resolveLibraryNavId,
} from "@website/components/LibraryNavDropdown";
import NotificationsDropdown from "@website/components/NotificationsDropdown";
import SettingsDropdown from "@website/components/SettingsDropdown";
import MobileNavDrawer from "@website/components/MobileNavDrawer";
import {
  SITE_LOGO,
  USER_AVATAR,
} from "@website/constants/brand";

export type TopNavVariant = "public" | "authenticated";

export type TopNavProps = {
  variant?: TopNavVariant;
  showSearch?: boolean;
  searchPlaceholder?: string;
  avatarSrc?: string;
  /** الصفحات التي فيها sidebar: لا تُظهر زر القائمة، يُستخدم الشريط السفلي بدلاً منه */
  hasSidebar?: boolean;
};

const navLinkClass = (active: boolean) =>
  active
    ? "px-3 py-2 text-primary font-bold border-b-2 border-secondary text-sm transition-colors"
    : "px-3 py-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold";

const dropdownTriggerClass = (active: boolean) =>
  active
    ? "flex items-center gap-1 px-3 py-2 text-primary font-bold border-b-2 border-secondary text-sm transition-colors"
    : "flex items-center gap-1 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold";

function resolveSearchPlaceholder(pathname: string): string {
  if (pathname.startsWith("/reports")) return "ابحث في التقارير...";
  if (pathname.startsWith("/stories")) return "ابحث في القصص...";
  if (pathname.startsWith(WEBSITE_ROUTES.VERIFICATION)) {
    return "ابحث في طلبات التحقق...";
  }
  if (pathname.startsWith(WEBSITE_ROUTES.MEDIA_LITERACY)) {
    return "ابحث في دورات المعرفة الإعلامية...";
  }
  if (pathname.startsWith(WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE)) {
    return "بحث في الأرشيف...";
  }
  if (pathname.startsWith(ADMIN_ROUTES.ROOT)) {
    return "بحث في النظام...";
  }
  return "ابحث في المنصة...";
}

export default function TopNav({
  variant = "public",
  showSearch = false,
  searchPlaceholder,
  avatarSrc = USER_AVATAR,
  hasSidebar = false,
}: TopNavProps) {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const libraryActiveId = resolveLibraryNavId(pathname);
  const isAuthenticated = variant === "authenticated";
  const placeholder = searchPlaceholder ?? resolveSearchPlaceholder(pathname);

  const isHome = pathname === WEBSITE_ROUTES.HOME;
  const reportsActive = pathname.startsWith("/reports");
  const storiesActive = pathname.startsWith("/stories");
  const verificationActive = pathname.startsWith(WEBSITE_ROUTES.VERIFICATION);
  const mediaLiteracyActive = pathname.startsWith(WEBSITE_ROUTES.MEDIA_LITERACY);
  const mySpaceActive = pathname.startsWith(WEBSITE_ROUTES.MY_SPACE);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [searchOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl border-b border-outline-variant/20 shadow-sm transition-all duration-300 ease-in-out ${
        scrolled ? "h-16 bg-surface/95" : "h-20 bg-surface/80"
      }`}
    >
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center h-full">
        <Link to={WEBSITE_ROUTES.HOME} className="shrink-0">
          <img
            alt="زرقاء اليمامة"
            className="h-11 w-auto object-contain md:h-12"
            src={SITE_LOGO}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          <Link className={navLinkClass(isHome)} to={WEBSITE_ROUTES.HOME}>
            الرئيسية
          </Link>
          <div className="relative dropdown-trigger group">
            <button
              type="button"
              className={dropdownTriggerClass(reportsActive)}
            >
              التقارير
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">
                expand_more
              </span>
            </button>
            <div className="absolute right-0 top-full pt-2 dropdown-menu min-w-[200px]">
              <div className="bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/30 overflow-hidden">
                <Link
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  to={WEBSITE_ROUTES.REPORTS_INVESTIGATIVE}
                >
                  تقارير استقصائية
                </Link>
                <a
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  href="#"
                >
                  تحليل البيانات
                </a>
                <a
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  href="#"
                >
                  تقارير سنوية
                </a>
                <a
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors"
                  href="#"
                >
                  دراسات حالة
                </a>
              </div>
            </div>
          </div>
          <div className="relative dropdown-trigger group">
            <button
              type="button"
              className={dropdownTriggerClass(storiesActive)}
            >
              القصص
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">
                expand_more
              </span>
            </button>
            <div className="absolute right-0 top-full pt-2 dropdown-menu min-w-[200px]">
              <div className="bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/30 overflow-hidden">
                <Link
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  to={WEBSITE_ROUTES.STORIES_HUMANITARIAN}
                >
                  قصص إنسانية
                </Link>
                <Link
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  to={WEBSITE_ROUTES.STORIES_SUCCESS}
                >
                  قصص نجاح
                </Link>
                <a
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  href="#"
                >
                  خلف الكواليس
                </a>
                <a
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors"
                  href="#"
                >
                  تجارب المستخدمين
                </a>
              </div>
            </div>
          </div>
          <LibraryNavDropdown activeId={libraryActiveId} variant="public" />
          <div className="relative dropdown-trigger group">
            <button
              type="button"
              className={dropdownTriggerClass(verificationActive)}
            >
              التحقق الإعلامي
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">
                expand_more
              </span>
            </button>
            <div className="absolute right-0 top-full pt-2 dropdown-menu min-w-[220px]">
              <div className="bg-surface-container-lowest rounded-lg shadow-xl border border-outline-variant/30 overflow-hidden">
                <Link
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
                >
                  تحقق من الصور
                </Link>
                <Link
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors border-b border-outline-variant/10"
                  to={WEBSITE_ROUTES.VERIFICATION_VIDEO}
                >
                  تحقق من الفيديوهات
                </Link>
                <a
                  className="block px-4 py-3 text-sm hover:bg-secondary-container/10 hover:text-secondary transition-colors"
                  href="#"
                >
                  مكافحة التضليل
                </a>
              </div>
            </div>
          </div>
          <Link
            className={navLinkClass(mediaLiteracyActive)}
            to={WEBSITE_ROUTES.MEDIA_LITERACY}
          >
            المعرفة الإعلامية
          </Link>
          <Link className={navLinkClass(mySpaceActive)} to={WEBSITE_ROUTES.MY_SPACE}>
            مساحتي
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          {isAuthenticated ? (
            <>
              {showSearch && (
                <button
                  type="button"
                  aria-expanded={searchOpen}
                  aria-label="بحث"
                  className={`p-2 flex items-center justify-center transition-colors ${
                    searchOpen
                      ? "text-gold-metallic-start"
                      : "text-on-surface-variant hover:text-gold-metallic-start"
                  }`}
                  onClick={() => setSearchOpen((prev) => !prev)}
                >
                  <span className="material-symbols-outlined text-[24px] leading-none">
                    search
                  </span>
                </button>
              )}
              <Link
                to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
                className="hidden lg:flex items-center px-5 py-2 gold-gradient-bg text-on-primary font-label-bold text-label-bold rounded-lg shadow-md hover:opacity-90 transition-all active:scale-95 whitespace-nowrap"
              >
                تقديم ملف للتحقق
              </Link>
              <NotificationsDropdown />
              <SettingsDropdown />
              <Link to={WEBSITE_ROUTES.MY_SPACE} aria-label="مساحتي">
                <img
                  alt="الملف الشخصي"
                  className="w-10 h-10 rounded-full object-cover border border-outline-variant/30 hover:ring-2 hover:ring-gold-metallic-start/40 transition-all"
                  src={avatarSrc}
                />
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="hidden sm:inline-flex px-5 py-2 bg-primary text-on-primary rounded-lg font-label-bold text-label-bold hover:bg-surface-tint transition-all whitespace-nowrap"
              >
                تسجيل الدخول
              </button>
              {!hasSidebar && (
                <button
                  type="button"
                  className="p-2 lg:hidden text-on-surface-variant hover:text-primary transition-colors"
                  aria-label="فتح القائمة"
                  aria-expanded={mobileMenuOpen}
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="material-symbols-outlined">menu</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isAuthenticated && showSearch && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out border-t border-outline-variant/20 bg-surface/95 backdrop-blur-md ${
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0 border-t-transparent"
          }`}
        >
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                search
              </span>
              <input
                ref={searchInputRef}
                className="w-full bg-surface-container border border-outline-variant/20 rounded-lg pr-10 pl-4 py-2.5 text-body-md focus:ring-2 focus:ring-gold-metallic-start focus:border-gold-metallic-start"
                placeholder={placeholder}
                type="search"
              />
            </div>
          </div>
        </div>
      )}
    </header>

    {!hasSidebar && (
      <MobileNavDrawer
        open={mobileMenuOpen}
        variant={variant}
        onClose={() => setMobileMenuOpen(false)}
      />
    )}
    </>
  );
}
