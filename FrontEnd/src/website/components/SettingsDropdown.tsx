import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ADMIN_ROUTES, WEBSITE_ROUTES } from "@core/constants/routes";

type SettingsItem = {
  id: string;
  label: string;
  icon: string;
  href?: string;
  onClick?: () => void;
  roleEntry?: boolean;
};

const SETTINGS_ITEMS: SettingsItem[] = [
  {
    id: "account",
    label: "إعدادات الحساب",
    icon: "manage_accounts",
    href: WEBSITE_ROUTES.MY_SPACE,
  },
  {
    id: "notifications",
    label: "تفضيلات الإشعارات",
    icon: "notifications_active",
    href: WEBSITE_ROUTES.MY_SPACE,
  },
  {
    id: "privacy",
    label: "الخصوصية والأمان",
    icon: "shield",
    href: "#",
  },
  {
    id: "help",
    label: "المساعدة",
    icon: "help",
    href: "#",
  },
  {
    id: "editor",
    label: "الدخول كمحرر",
    icon: "edit_note",
    href: WEBSITE_ROUTES.EDITOR_SPACE,
    roleEntry: true,
  },
  {
    id: "admin",
    label: "الدخول كمدير",
    icon: "admin_panel_settings",
    href: ADMIN_ROUTES.ROOT,
    roleEntry: true,
  },
];

type SettingsDropdownProps = {
  className?: string;
};

export default function SettingsDropdown({ className = "" }: SettingsDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-label="الإعدادات"
        className="p-2 flex items-center justify-center text-on-surface-variant hover:text-gold-metallic-start transition-colors"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="material-symbols-outlined text-[24px] leading-none">
          settings
        </span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 overflow-hidden z-50">
          <div className="px-4 py-3 border-b border-outline-variant/20 bg-surface-container-low">
            <h3 className="font-label-bold text-primary text-sm">الإعدادات</h3>
          </div>
          <ul>
            {SETTINGS_ITEMS.map((item) => (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-outline-variant/10 last:border-0 ${
                      item.roleEntry
                        ? "text-gold-metallic-start font-label-bold hover:bg-gold-metallic-start/10 hover:text-primary border-t border-outline-variant/20"
                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                    }`}
                    to={item.href}
                    onClick={() => setOpen(false)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {item.icon}
                    </span>
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors border-b border-outline-variant/10 last:border-0"
                    onClick={() => setOpen(false)}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
