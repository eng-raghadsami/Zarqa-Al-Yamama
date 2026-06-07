import { Link, useLocation } from "react-router-dom";
import { ADMIN_ROUTES, WEBSITE_ROUTES } from "@core/constants/routes";
import { ADMIN_IMAGES } from "@admin/constants/adminImages";

type NavItem = {
  label: string;
  icon: string;
  href: string;
  match: string;
  external?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "لوحة التحكم",
    icon: "dashboard",
    href: ADMIN_ROUTES.ROOT,
    match: ADMIN_ROUTES.ROOT,
  },
  {
    label: "التحليلات",
    icon: "analytics",
    href: "#",
    match: "",
    external: true,
  },
  {
    label: "المجموعات",
    icon: "group",
    href: "#",
    match: "",
    external: true,
  },
  {
    label: "التقارير",
    icon: "description",
    href: "#",
    match: "",
    external: true,
  },
  {
    label: "الإعدادات",
    icon: "settings",
    href: "#",
    match: "",
    external: true,
  },
];

function isNavActive(pathname: string, item: NavItem) {
  if (!item.match) return false;
  return pathname === item.match || pathname.startsWith(`${item.match}/`);
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const className = active
    ? "flex items-center gap-3 px-4 py-3 bg-gold-metallic-start text-on-primary rounded-lg transition-colors"
    : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors rounded-lg";

  const content = (
    <>
      <span className="material-symbols-outlined">{item.icon}</span>
      <span className="font-body-md text-body-md">{item.label}</span>
    </>
  );

  if (item.external) {
    return (
      <a className={className} href={item.href}>
        {content}
      </a>
    );
  }

  return (
    <Link className={className} to={item.href}>
      {content}
    </Link>
  );
}

export default function AdminSidebar({
  belowTopNav = false,
}: {
  belowTopNav?: boolean;
}) {
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 right-0 w-80 bg-surface-container-low shadow-sm flex flex-col border-l border-outline-variant/20 z-40 hidden lg:flex admin-sidebar-scroll ${
        belowTopNav ? "pt-20" : ""
      }`}
    >
      <div className="px-6 mb-8 pt-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
            <img
              alt="مدير النظام"
              className="w-8 h-8 rounded-sm object-cover"
              src={ADMIN_IMAGES.sidebarAvatar}
            />
          </div>
          <div>
            <p className="font-headline-sm text-headline-sm text-primary">
              لوحة التحكم
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              منصة النزاهة الرقمية
            </p>
          </div>
        </div>
        <Link
          to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
          className="block w-full py-3 px-4 bg-gradient-to-r from-gold-metallic-start to-gold-metallic-end text-primary font-label-bold text-label-bold rounded-lg scale-95 active:scale-90 transition-transform shadow-md text-center"
        >
          تقديم ملف للتحقق
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            active={isNavActive(pathname, item)}
          />
        ))}
      </nav>

      <div className="p-6 border-t border-outline-variant/20">
        <a
          className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:text-primary transition-colors rounded-lg"
          href="#"
        >
          <span className="material-symbols-outlined">help</span>
          <span className="font-body-md text-body-md">المساعدة</span>
        </a>
        <Link
          className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container/10 transition-colors rounded-lg"
          to={WEBSITE_ROUTES.HOME}
        >
          <span className="material-symbols-outlined">logout</span>
          <span className="font-body-md text-body-md">تسجيل الخروج</span>
        </Link>
      </div>
    </aside>
  );
}
