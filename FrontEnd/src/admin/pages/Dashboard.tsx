import { useState } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { useCountUp } from "@core/hooks/useCountUp";
import AnimatedStatNumber, {
  AnimatedStatProgress,
} from "@shared/components/AnimatedStatNumber";
import { formatStatValue } from "@shared/helpers/formatStatValue";
import type {
  AdminArchiveItem,
  AdminChartBar,
  AdminOverviewStat,
  AdminPolicy,
  AdminStrategicStat,
  AdminUser,
} from "@admin/types/adminDashboard";
import {
  ADMIN_ARCHIVE_ITEMS,
  ADMIN_CHART_BARS,
  ADMIN_OVERVIEW_STATS,
  ADMIN_PAGE,
  ADMIN_POLICIES,
  ADMIN_STRATEGIC_STATS,
  ADMIN_USERS,
} from "@admin/types/adminDashboard";

function OverviewStatCard({ stat }: { stat: AdminOverviewStat }) {
  return (
    <div
      className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2 border-r-4 ${stat.borderClass}`}
    >
      <div className="flex justify-between items-start">
        <span
          className="material-symbols-outlined text-gold-metallic-start text-4xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {stat.icon}
        </span>
        {stat.trend && (
          <span className={`text-sm font-label-bold ${stat.trend.className}`}>
            {stat.trend.label}
          </span>
        )}
        {stat.progressLabel && (
          <p className="text-primary text-sm font-label-bold">{stat.progressLabel}</p>
        )}
      </div>
      <p className="text-on-surface-variant font-body-md text-body-md">{stat.label}</p>
      {stat.progress !== undefined && stat.numericValue !== undefined ? (
        <AnimatedStatProgress
          target={stat.numericValue}
          decimals={stat.decimals ?? 1}
          suffix={stat.suffix ?? "%"}
          duration={2000}
        />
      ) : stat.statusText ? (
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-success-teal rounded-full animate-pulse" />
          <p className="font-stats-number text-stats-number text-primary">
            {stat.statusText}
          </p>
        </div>
      ) : stat.numericValue !== undefined ? (
        <AnimatedStatNumber
          target={stat.numericValue}
          decimals={stat.decimals}
          suffix={stat.suffix}
          prefix={stat.prefix}
          grouping={stat.grouping}
          className="font-stats-number text-stats-number text-primary"
          duration={2000}
        />
      ) : null}
    </div>
  );
}

function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-outline-variant/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="font-headline-sm text-headline-sm text-primary">
          إدارة المستخدمين والأدوار
        </h3>
        <button
          type="button"
          className="px-4 py-2 border border-primary rounded-lg text-primary font-label-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          <span className="material-symbols-outlined text-sm">person_add</span>
          إضافة مستخدم
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-mist-grey/30">
              <th className="px-6 py-4 font-label-bold text-on-surface-variant">
                المستخدم
              </th>
              <th className="px-6 py-4 font-label-bold text-on-surface-variant">
                الدور
              </th>
              <th className="px-6 py-4 font-label-bold text-on-surface-variant">
                الحالة
              </th>
              <th className="px-6 py-4 font-label-bold text-on-surface-variant">
                آخر نشاط
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-mist-grey/10 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-mist-grey overflow-hidden shrink-0">
                      <img
                        alt={user.name}
                        className="w-full h-full object-cover"
                        src={user.avatar}
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <p className="font-label-bold text-primary">{user.name}</p>
                      <p className="text-xs text-on-surface-variant">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-label-bold ${user.roleClass}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full shrink-0 ${user.statusDotClass}`}
                    />
                    <span className="text-sm">{user.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">
                  {user.lastActive}
                </td>
                <td className="px-6 py-4 text-left">
                  <button
                    type="button"
                    className="material-symbols-outlined cursor-pointer hover:text-gold-metallic-start"
                    aria-label="المزيد"
                  >
                    more_vert
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StrategicStatItem({
  stat,
  ratio,
}: {
  stat: AdminStrategicStat;
  ratio: number;
}) {
  const value = stat.numericValue * ratio;

  return (
    <div>
      <p className="text-primary-fixed-dim text-xs">{stat.label}</p>
      <p className="text-xl font-bold text-on-primary">
        {formatStatValue(value, {
          decimals: stat.decimals,
          suffix: stat.suffix,
          prefix: stat.prefix,
          grouping: stat.grouping,
        })}
      </p>
    </div>
  );
}

function AnimatedChartBar({
  bar,
  ratio,
}: {
  bar: AdminChartBar;
  ratio: number;
}) {
  const displayValue = Math.round(bar.value * ratio);
  const height = bar.heightPercent * ratio;

  return (
    <div
      className={`flex-1 rounded-t-sm hover:bg-gold-metallic-start transition-colors relative group self-end ${
        bar.active ? "bg-gold-metallic-start" : "bg-primary-fixed-dim/20"
      }`}
      style={{ height: `${height}%` }}
    >
      <span
        className={`absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold transition-opacity whitespace-nowrap ${
          bar.active ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {displayValue}%
      </span>
    </div>
  );
}

function StrategicAnalyticsPanel({
  chartPeriod,
  onChartPeriodChange,
}: {
  chartPeriod: "monthly" | "yearly";
  onChartPeriodChange: (period: "monthly" | "yearly") => void;
}) {
  const { value: progress, ref } = useCountUp(100, { duration: 2000, decimals: 0 });
  const ratio = progress / 100;

  return (
    <div
      ref={ref}
      className="bg-primary p-8 rounded-xl shadow-xl text-on-primary relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 300" aria-hidden>
          <path
            d="M0,250 Q150,150 300,200 T600,100 T1000,150 L1000,300 L0,300 Z"
            fill="url(#adminGoldGradient)"
          />
          <defs>
            <linearGradient id="adminGoldGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h3 className="font-headline-sm text-headline-sm mb-1">
              التحليلات الاستراتيجية
            </h3>
            <p className="text-primary-fixed-dim font-body-md text-body-md">
              {chartPeriod === "monthly"
                ? "تحليل اتجاهات التضليل المعلوماتي الشهري"
                : "تحليل اتجاهات التضليل المعلوماتي السنوي"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={`px-4 py-1 rounded-full border text-xs cursor-pointer transition-colors ${
                chartPeriod === "yearly"
                  ? "bg-gold-metallic-start text-primary font-label-bold border-transparent"
                  : "border-primary-fixed-dim/30 hover:bg-white/10"
              }`}
              onClick={() => onChartPeriodChange("yearly")}
            >
              سنوي
            </button>
            <button
              type="button"
              className={`px-4 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                chartPeriod === "monthly"
                  ? "bg-gold-metallic-start text-primary font-label-bold"
                  : "border border-primary-fixed-dim/30 hover:bg-white/10"
              }`}
              onClick={() => onChartPeriodChange("monthly")}
            >
              شهري
            </button>
          </div>
        </div>
        <div className="flex items-end gap-4 h-48 mb-6">
          {ADMIN_CHART_BARS.map((bar) => (
            <AnimatedChartBar key={bar.id} bar={bar} ratio={ratio} />
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          {ADMIN_STRATEGIC_STATS.map((stat) => (
            <StrategicStatItem key={stat.id} stat={stat} ratio={ratio} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PolicyToggle({
  policy,
  enabled,
  onToggle,
}: {
  policy: AdminPolicy;
  enabled: boolean;
  onToggle: () => void;
}) {
  if (policy.variant === "sensitivity") {
    return (
      <div className="flex justify-between items-center gap-4">
        <div>
          <p className="font-label-bold text-primary">{policy.title}</p>
          <p className="text-xs text-on-surface-variant">{policy.description}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold">{policy.sensitivityLabel}</span>
          <button
            type="button"
            className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors ${
              enabled ? "bg-gold-metallic-start" : "bg-mist-grey"
            }`}
            aria-pressed={enabled}
            onClick={onToggle}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-primary rounded-full transition-all ${
                enabled ? "right-1" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center gap-4">
      <div>
        <p className="font-label-bold text-primary">{policy.title}</p>
        <p className="text-xs text-on-surface-variant">{policy.description}</p>
      </div>
      <button
        type="button"
        className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner transition-colors shrink-0 ${
          enabled ? "bg-gold-metallic-start" : "bg-mist-grey"
        }`}
        aria-pressed={enabled}
        onClick={onToggle}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
            enabled ? "right-1 bg-white" : "left-1 bg-white"
          }`}
        />
      </button>
    </div>
  );
}

function ArchiveItemRow({ item }: { item: AdminArchiveItem }) {
  return (
    <div className="flex gap-3 group cursor-pointer">
      <div className="w-16 h-16 rounded-lg bg-mist-grey overflow-hidden shrink-0">
        <img
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
          src={item.image}
          loading="lazy"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-label-bold text-primary text-sm line-clamp-1 group-hover:text-gold-metallic-start transition-colors">
          {item.title}
        </p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span
            className={`px-2 py-0.5 text-[10px] rounded-full font-label-bold ${item.badgeClass}`}
          >
            {item.badge}
          </span>
          <span className="text-[10px] text-on-surface-variant">{item.time}</span>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [chartPeriod, setChartPeriod] = useState<"monthly" | "yearly">("monthly");
  const [policies, setPolicies] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(ADMIN_POLICIES.map((p) => [p.id, p.enabled])),
  );

  const togglePolicy = (id: string) => {
    setPolicies((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-container-max mx-auto w-full relative" dir="rtl">
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="admin-radar-line" style={{ top: "10%" }} />
        <div className="admin-radar-line" style={{ top: "40%" }} />
        <div className="admin-radar-line" style={{ top: "70%" }} />
      </div>

      <header className="mb-10 relative z-10">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">
          {ADMIN_PAGE.title}
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg">
          {ADMIN_PAGE.description}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-section-gap relative z-10">
        {ADMIN_OVERVIEW_STATS.map((stat) => (
          <OverviewStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative z-10">
        <section className="lg:col-span-8 space-y-gutter">
          <UsersTable users={ADMIN_USERS} />

          <StrategicAnalyticsPanel
            chartPeriod={chartPeriod}
            onChartPeriodChange={setChartPeriod}
          />
        </section>

        <aside className="lg:col-span-4 space-y-gutter">
          <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-gold-metallic-start">
                gavel
              </span>
              <h3 className="font-headline-sm text-headline-sm text-primary">
                سياسات النظام العامة
              </h3>
            </div>
            <div className="space-y-6">
              {ADMIN_POLICIES.map((policy) => (
                <PolicyToggle
                  key={policy.id}
                  policy={policy}
                  enabled={policies[policy.id] ?? policy.enabled}
                  onToggle={() => togglePolicy(policy.id)}
                />
              ))}
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-primary">
                أرشيف المحتوى المضلل
              </h3>
              <Link
                to={WEBSITE_ROUTES.EDITOR_DISINFORMATION_ARCHIVE}
                className="text-xs text-gold-metallic-start font-label-bold hover:underline"
              >
                عرض الكل
              </Link>
            </div>
            <div className="space-y-4">
              {ADMIN_ARCHIVE_ITEMS.map((item) => (
                <ArchiveItemRow key={item.id} item={item} />
              ))}
            </div>
          </section>

          <div className="bg-gradient-to-br from-gold-metallic-start to-gold-metallic-end p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <p className="text-primary font-bold">ذكاء المساعدة الفوري</p>
              <span className="material-symbols-outlined text-primary animate-pulse">
                auto_awesome
              </span>
            </div>
            <p className="text-primary/80 text-sm mb-4">
              تم رصد نشاط غير اعتيادي في المنطقة الشرقية بنسبة 15%. هل ترغب في
              تفعيل &ldquo;وضع المراقبة المكثف&rdquo;؟
            </p>
            <button
              type="button"
              className="w-full py-2 bg-primary text-on-primary rounded-lg font-label-bold text-sm hover:bg-primary-container transition-all"
            >
              تفعيل المراقبة الذكية
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
