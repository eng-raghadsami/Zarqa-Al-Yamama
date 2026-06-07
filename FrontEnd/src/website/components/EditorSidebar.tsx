import { Link, useLocation } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { SIDEBAR_LOGO } from "@website/constants/brand";

type NavItem = {
  label: string;
  icon: string;
  href: string;
  match: string;
  exact?: boolean;
  filled?: boolean;
  external?: boolean;
};

const navItems: NavItem[] = [
  {
    label: "لوحة التحكم",
    icon: "dashboard",
    href: "#",
    match: "/editor-space/dashboard",
    external: true,
  },
  {
    label: "التحقق من المحتوى",
    icon: "verified_user",
    href: WEBSITE_ROUTES.EDITOR_SPACE,
    match: WEBSITE_ROUTES.EDITOR_SPACE,
    exact: true,
    filled: true,
  },
  {
    label: "أرشيف التضليل",
    icon: "auto_stories",
    href: WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE,
    match: WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE,
    filled: true,
  },
  {
    label: "التقارير التحليلية",
    icon: "analytics",
    href: "#",
    match: "",
    external: true,
  },
  {
    label: "السجل",
    icon: "history",
    href: "#",
    match: "",
    external: true,
  },
];

function isNavActive(pathname: string, item: NavItem) {
  if (!item.match) return false;
  if (item.exact) return pathname === item.match;
  return pathname.startsWith(item.match);
}

function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  const className = active
    ? "flex flex-row-reverse items-center gap-3 px-4 py-3 rounded-lg bg-primary text-white shadow-lg transition-all"
    : "flex flex-row-reverse items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-mist-grey/30 hover:text-primary transition-all group";

  const content = (
    <>
      <span
        className={`material-symbols-outlined text-xl ${active ? "" : "group-hover:text-primary"}`}
        style={
          item.filled && active
            ? { fontVariationSettings: "'FILL' 1" }
            : undefined
        }
      >
        {item.icon}
      </span>
      <span className="font-label-bold text-label-bold">{item.label}</span>
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

export default function EditorSidebar({
  belowTopNav = false,
}: {
  belowTopNav?: boolean;
}) {
  const { pathname } = useLocation();

  return (
    <aside
      className={`fixed right-0 top-0 h-full flex flex-col z-40 bg-surface-container-lowest border-l border-mist-grey shadow-md w-80 hidden lg:flex archive-sidebar-scroll ${
        belowTopNav ? "pt-20" : ""
      }`}
    >
      <Link
        to={WEBSITE_ROUTES.HOME}
        className="p-6 border-b border-mist-grey/50 flex flex-row-reverse items-center gap-3 hover:opacity-90 transition-opacity"
      >
        <img
          alt="زرقاء اليمامة"
          className="w-10 h-10 object-contain"
          src={SIDEBAR_LOGO}
        />
        <div className="text-right">
          <h2 className="font-label-bold text-primary text-lg leading-tight">
            زرقاء اليمامة
          </h2>
          <p className="text-xs text-on-surface-variant">النزاهة الإعلامية</p>
        </div>
      </Link>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            active={isNavActive(pathname, item)}
          />
        ))}
      </nav>

      <div className="p-4 border-t border-mist-grey/50">
        <Link
          to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
          className="w-full bg-gradient-to-r from-gold-metallic-start to-gold-metallic-end text-white py-3 rounded-xl font-label-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="material-symbols-outlined text-sm">add_circle</span>
          طلب فحص جديد
        </Link>
        <div className="mt-4 flex flex-col gap-1">
          <a
            className="flex flex-row-reverse items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-primary"
            href="#"
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>الإعدادات</span>
          </a>
          <Link
            className="flex flex-row-reverse items-center gap-3 px-4 py-2 text-sm text-on-surface-variant hover:text-primary"
            to={WEBSITE_ROUTES.HOME}
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            <span>تسجيل الخروج</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
