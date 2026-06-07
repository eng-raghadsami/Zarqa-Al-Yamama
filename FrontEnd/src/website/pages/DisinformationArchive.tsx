import { useMemo, useState, type FormEvent } from "react";
import type {
  ArchiveCaseStatus,
  ArchiveFilters,
  ArchiveStat,
  DisinformationCase,
} from "@website/types/disinformationArchive";
import AnimatedStatNumber, {
  AnimatedStatProgress,
} from "@shared/components/AnimatedStatNumber";
import {
  ARCHIVE_PAGE,
  ARCHIVE_STATS,
  DISINFORMATION_CASES,
  MISINFORMATION_TYPE_OPTIONS,
  RISK_LEVEL_OPTIONS,
  TIME_PERIOD_OPTIONS,
  filterDisinformationCases,
} from "@website/types/disinformationArchive";

const INITIAL_FILTERS: ArchiveFilters = {
  keyword: "",
  misinformationType: "all",
  riskLevel: "all",
  timePeriod: "all",
};

function CaseStatusBadge({ status }: { status: ArchiveCaseStatus }) {
  if (status === "verified") {
    return (
      <span className="bg-success-teal/90 text-white px-3 py-1 rounded-lg text-[10px] font-label-bold flex items-center gap-1 backdrop-blur-sm">
        <span
          className="material-symbols-outlined text-[14px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          verified
        </span>
        تم التحقق
      </span>
    );
  }

  return (
    <span className="bg-warning-amber/90 text-white px-3 py-1 rounded-lg text-[10px] font-label-bold flex items-center gap-1 backdrop-blur-sm">
      <span className="material-symbols-outlined text-[14px]">schedule</span>
      قيد المراجعة
    </span>
  );
}

function CaseCard({ item }: { item: DisinformationCase }) {
  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          alt={item.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={item.image}
          loading="lazy"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span
            className={`${item.typeBadgeClass} px-3 py-1 rounded-full text-[10px] font-label-bold`}
          >
            {item.typeLabel}
          </span>
        </div>
        <div className="absolute bottom-4 right-4">
          <CaseStatusBadge status={item.status} />
        </div>
      </div>
      <div className="p-6 text-right">
        <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-gold-metallic-start transition-colors">
          {item.title}
        </h3>
        <div className="flex flex-row-reverse justify-between items-center mb-6">
          <div className="flex items-center gap-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-sm">
              calendar_today
            </span>
            {item.date}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gold-metallic-start font-bold">
              {item.accuracy}
            </span>
            <span className="text-on-surface-variant text-[10px]">
              دقة التحليل
            </span>
          </div>
        </div>
        <div className="flex flex-row-reverse gap-3">
          <button
            type="button"
            className="flex-1 py-3 bg-primary text-on-primary text-xs font-label-bold rounded-lg hover:bg-primary-container transition-all"
          >
            عرض التفاصيل
          </button>
          <button
            type="button"
            className="px-4 py-3 border border-outline-variant text-primary rounded-lg hover:bg-mist-grey/30 transition-colors"
            aria-label="تحميل"
          >
            <span className="material-symbols-outlined text-lg">download</span>
          </button>
        </div>
      </div>
    </article>
  );
}

function ArchiveStatCard({ stat }: { stat: ArchiveStat }) {
  return (
    <div
      className={`bg-surface-container-lowest p-6 rounded-xl shadow-sm border-r-4 ${stat.borderClass} flex flex-col gap-2 hover:shadow-md transition-shadow`}
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
          <p className="text-primary text-sm font-label-bold">
            {stat.progressLabel}
          </p>
        )}
      </div>
      <p className="text-on-surface-variant font-body-md text-sm">
        {stat.label}
      </p>
      {stat.progress !== undefined ? (
        <AnimatedStatProgress
          target={stat.numericValue}
          decimals={stat.decimals ?? 1}
          suffix={stat.suffix ?? "%"}
          duration={2000}
        />
      ) : (
        <AnimatedStatNumber
          target={stat.numericValue}
          decimals={stat.decimals ?? 0}
          prefix={stat.prefix}
          suffix={stat.suffix}
          grouping={stat.grouping}
          className="font-stats-number text-stats-number text-primary"
          duration={2000}
        />
      )}
    </div>
  );
}

export default function DisinformationArchive() {
  const [draftFilters, setDraftFilters] =
    useState<ArchiveFilters>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] =
    useState<ArchiveFilters>(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCases = useMemo(
    () => filterDisinformationCases(DISINFORMATION_CASES, appliedFilters),
    [appliedFilters],
  );

  const hasActiveFilters =
    appliedFilters.keyword.trim() !== "" ||
    appliedFilters.misinformationType !== "all" ||
    appliedFilters.riskLevel !== "all" ||
    appliedFilters.timePeriod !== "all";

  const applyFilters = () => {
    setAppliedFilters({ ...draftFilters });
    setCurrentPage(1);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const resetFilters = () => {
    setDraftFilters(INITIAL_FILTERS);
    setAppliedFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-container-max mx-auto w-full relative" dir="rtl">
      <div className="absolute inset-0 pointer-events-none opacity-5 overflow-hidden">
        <div className="archive-radar-line" style={{ top: "15%" }} />
        <div className="archive-radar-line" style={{ top: "50%" }} />
      </div>

      <header className="mb-10 text-right relative z-10">
        <h2 className="font-headline-md text-headline-md text-primary mb-2">
          {ARCHIVE_PAGE.title}
        </h2>
        <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl">
          {ARCHIVE_PAGE.description}
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12 relative z-10">
        {ARCHIVE_STATS.map((stat) => (
          <ArchiveStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <form
        onSubmit={handleSubmit}
        className="glass-panel p-4 rounded-xl mb-6 flex flex-wrap flex-row-reverse items-center gap-4 sticky top-24 z-30 shadow-sm border-outline-variant/10"
      >
        <div className="flex-1 min-w-[300px] relative">
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            manage_search
          </span>
          <input
            className="w-full h-12 pr-12 pl-4 border border-outline-variant/30 rounded-lg focus:ring-2 focus:ring-gold-metallic-start text-sm bg-surface-container-low transition-all"
            placeholder="ابحث بالكلمات المفتاحية..."
            type="search"
            value={draftFilters.keyword}
            onChange={(e) =>
              setDraftFilters((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />
        </div>
        <select
          className="h-12 px-8 border border-outline-variant/30 rounded-lg bg-surface-container-low text-sm font-label-bold outline-none focus:ring-2 focus:ring-gold-metallic-start"
          value={draftFilters.misinformationType}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              misinformationType: e.target
                .value as ArchiveFilters["misinformationType"],
            }))
          }
        >
          {MISINFORMATION_TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          className="h-12 px-8 border border-outline-variant/30 rounded-lg bg-surface-container-low text-sm font-label-bold outline-none focus:ring-2 focus:ring-gold-metallic-start"
          value={draftFilters.riskLevel}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              riskLevel: e.target.value as ArchiveFilters["riskLevel"],
            }))
          }
        >
          {RISK_LEVEL_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <select
          className="h-12 px-8 border border-outline-variant/30 rounded-lg bg-surface-container-low text-sm font-label-bold outline-none focus:ring-2 focus:ring-gold-metallic-start"
          value={draftFilters.timePeriod}
          onChange={(e) =>
            setDraftFilters((prev) => ({
              ...prev,
              timePeriod: e.target.value as ArchiveFilters["timePeriod"],
            }))
          }
        >
          {TIME_PERIOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-12 px-6 bg-primary text-white rounded-lg font-label-bold flex items-center gap-2 hover:bg-on-surface-variant transition-colors shadow-md"
        >
          <span className="material-symbols-outlined text-lg">filter_alt</span>
          تحديث النتائج
        </button>
        {hasActiveFilters && (
          <button
            type="button"
            className="h-12 px-4 text-on-surface-variant font-label-bold hover:text-primary transition-colors"
            onClick={resetFilters}
          >
            مسح الفلاتر
          </button>
        )}
      </form>

      <p className="text-sm text-on-surface-variant mb-8 relative z-10 text-right">
        {filteredCases.length === 0
          ? "لا توجد نتائج مطابقة للفلاتر المحددة."
          : `عرض ${filteredCases.length} من ${DISINFORMATION_CASES.length} حالة`}
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {filteredCases.map((item) => (
          <CaseCard key={item.id} item={item} />
        ))}
      </section>

      {filteredCases.length > 0 && (
        <nav
          className="mt-16 flex justify-center relative z-10"
          aria-label="ترقيم الصفحات"
        >
          <ul className="flex flex-row-reverse items-center gap-2">
            <li>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="الصفحة السابقة"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </li>
            {[1, 2, 3].map((page) => (
              <li key={page}>
                <button
                  type="button"
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-label-bold transition-all ${
                    currentPage === page
                      ? "bg-primary text-white shadow-md"
                      : "border border-outline-variant/30 hover:bg-mist-grey"
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              </li>
            ))}
            <li>
              <span className="px-2 text-on-surface-variant">...</span>
            </li>
            <li>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-mist-grey transition-all font-label-bold"
                onClick={() => setCurrentPage(12)}
              >
                12
              </button>
            </li>
            <li>
              <button
                type="button"
                className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant/30 hover:bg-primary hover:text-white transition-all shadow-sm"
                aria-label="الصفحة التالية"
                onClick={() => setCurrentPage((p) => Math.min(12, p + 1))}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
