import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import { MY_SPACE_PROFILE_AVATAR } from "@website/constants/brand";
import AnimatedStatNumber, {
  AnimatedCircularProgress,
  AnimatedLinearProgress,
} from "@shared/components/AnimatedStatNumber";
import type {
  LibraryItemType,
  VerificationRequest,
} from "@website/types/mySpace";
import {
  ACTIVITY_FEED,
  LEARNING_COURSES,
  LIBRARY_FILTERS,
  LIBRARY_ITEMS,
  MY_SPACE_ALERTS,
  MY_SPACE_STATS,
  MY_SPACE_USER,
  VERIFICATION_REQUESTS,
} from "@website/types/mySpace";

function RevealSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
}

function TimelineStep({
  step,
}: {
  step: VerificationRequest["timeline"][number];
}) {
  const circleClass =
    step.state === "done"
      ? "bg-gold-metallic-start text-white ring-4 ring-gold-metallic-start/10"
      : step.state === "active"
        ? "bg-gold-metallic-start text-white ring-4 ring-gold-metallic-start/10 animate-pulse"
        : "bg-mist-grey text-on-surface-variant";

  return (
    <div className="flex flex-col items-center gap-4 flex-1 min-w-0">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${circleClass}`}
      >
        <span
          className="material-symbols-outlined text-[18px]"
          style={
            step.state === "done"
              ? { fontVariationSettings: "'FILL' 1" }
              : undefined
          }
        >
          {step.icon}
        </span>
      </div>
      <div className="text-center">
        <p
          className={`text-sm font-bold ${
            step.state === "pending" ? "text-on-surface-variant" : "text-primary"
          }`}
        >
          {step.label}
        </p>
        <p className="text-[10px] text-on-surface-variant">{step.sublabel}</p>
      </div>
    </div>
  );
}

function ActiveVerificationCard({ request }: { request: VerificationRequest }) {
  const progress = request.progress ?? 66;

  return (
    <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl shadow-sm border border-mist-grey/50 hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between items-start gap-4 mb-10">
        <div className="text-right flex-1 min-w-0">
          <h3 className="font-headline-sm text-xl text-primary mb-1">
            {request.title}
          </h3>
          <p className="text-on-surface-variant text-sm font-medium">
            كود التتبع:{" "}
            <span className="text-primary font-bold">#{request.trackingCode}</span>{" "}
            • {request.submittedAt}
          </p>
        </div>
        <span className="px-4 py-1.5 bg-secondary-container text-on-secondary-container text-xs font-bold rounded-lg border border-secondary-fixed shadow-sm shrink-0">
          جاري التحليل
        </span>
      </div>
      <div className="relative px-2" dir="rtl">
        <div className="absolute top-[18px] inset-x-0 h-[6px] bg-mist-grey rounded-full overflow-hidden">
          <div
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-gold-metallic-start to-gold-metallic-end transition-all duration-1000 shadow-[0_0_8px_rgba(212,175,55,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between relative z-10 gap-2">
          {request.timeline.map((step) => (
            <TimelineStep key={step.label} step={step} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CompletedVerificationCard({ request }: { request: VerificationRequest }) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-mist-grey/30 opacity-90 hover:opacity-100 transition-opacity">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-start gap-4">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-success-teal/10 text-success-teal rounded-xl flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-3xl">verified</span>
          </div>
          <div className="text-right">
            <h3 className="font-headline-sm text-lg text-primary">{request.title}</h3>
            <p className="text-on-surface-variant text-xs mt-1">
              اكتمل في {request.completedAt} • نسبة الصحة:{" "}
              <span className="text-success-teal font-bold">{request.accuracy}</span>
            </p>
          </div>
        </div>
        <button
          type="button"
          className="px-5 py-2 text-primary border border-outline-variant rounded-lg font-label-bold text-xs hover:bg-surface-container-low transition-colors shrink-0"
        >
          تحميل التقرير
        </button>
      </div>
    </div>
  );
}

export default function MySpace() {
  const [libraryFilter, setLibraryFilter] = useState<LibraryItemType>("all");

  const filteredLibrary =
    libraryFilter === "all"
      ? LIBRARY_ITEMS
      : LIBRARY_ITEMS.filter((item) => item.type === libraryFilter);

  const activeRequest = VERIFICATION_REQUESTS.find((r) => r.status === "in_progress");
  const completedRequests = VERIFICATION_REQUESTS.filter((r) => r.status === "completed");
  const primaryCourse = LEARNING_COURSES.find((c) => c.variant === "circular");
  const linearCourse = LEARNING_COURSES.find((c) => c.variant === "linear");

  return (
    <div className="max-w-container-max mx-auto" dir="rtl">
      {/* إشعارات عاجلة */}
      <section className="mb-8">
        <div className="relative overflow-hidden bg-[#121212] border border-gold-metallic-start/50 rounded-2xl p-4 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
          <div className="absolute inset-0 bg-gradient-to-l from-gold-metallic-start/5 via-transparent to-transparent" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-10 h-10 bg-gold-metallic-start/20 rounded-full flex items-center justify-center animate-pulse shrink-0">
                <span
                  className="material-symbols-outlined text-gold-metallic-start"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  warning
                </span>
              </div>
              <div className="text-right flex-1 min-w-0">
                <h2 className="text-gold-metallic-start font-label-bold text-sm">
                  إشعارات عاجلة
                </h2>
                <div className="space-y-1 mt-1">
                  {MY_SPACE_ALERTS.map((alert, i) => (
                    <p
                      key={alert}
                      className={`text-xs flex items-start gap-2 text-right ${
                        i === 0 ? "text-white" : "text-white/80"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${
                          i === 0 ? "bg-gold-metallic-start" : "bg-white/20"
                        }`}
                      />
                      <span className="flex-1">{alert}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to={WEBSITE_ROUTES.VERIFIED_NEWS}
              className="px-4 py-1.5 bg-gold-metallic-start text-white text-[11px] font-bold rounded-lg hover:bg-gold-metallic-end transition-colors shrink-0 self-end md:self-center"
            >
              عرض التفاصيل
            </Link>
          </div>
        </div>
      </section>

      {/* بطاقة الترحيب */}
      <RevealSection className="mb-12">
        <div className="relative overflow-hidden bg-[#121212] rounded-2xl p-8 md:p-12 shadow-2xl hero-pattern">
          <div className="absolute inset-0 bg-gradient-to-br from-gold-metallic-start/10 via-transparent to-primary/80" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between items-center gap-10">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-right w-full lg:w-auto">
              <div className="relative shrink-0">
                <div className="w-32 h-32 rounded-2xl border-2 border-gold-metallic-start p-1 bg-primary/40 backdrop-blur-md">
                  <img
                    alt={`صورة ${MY_SPACE_USER.name}`}
                    className="w-full h-full object-cover rounded-xl shadow-xl"
                    src={MY_SPACE_PROFILE_AVATAR}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gold-metallic-start text-white p-1 rounded-lg border-2 border-[#121212]">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                </div>
              </div>
              <div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white mb-2">
                  مرحباً بك، {MY_SPACE_USER.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-end gap-3 text-surface-dim font-body-md">
                  <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                    {MY_SPACE_USER.role}
                  </span>
                  <span className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                    {MY_SPACE_USER.memberSince}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">
              {MY_SPACE_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl text-center min-w-[100px] md:min-w-[120px] transition-transform hover:-translate-y-1"
                >
                  <AnimatedStatNumber
                    target={stat.numericValue}
                    className="block font-stats-number text-gold-metallic-start mb-1"
                    duration={2000}
                  />
                  <span className="text-white/60 text-xs font-label-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RevealSection>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* العمود الرئيسي */}
        <div className="lg:col-span-8 space-y-12">
          <RevealSection>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-headline-sm text-primary">تتبع طلبات التحقق</h2>
              <Link
                to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
                className="text-gold-metallic-start font-label-bold text-label-bold flex items-center gap-1 hover:underline shrink-0"
              >
                <span>مشاهدة السجل الكامل</span>
                <span className="material-symbols-outlined text-sm scale-x-[-1]">
                  arrow_back_ios
                </span>
              </Link>
            </div>
            <div className="space-y-6">
              {activeRequest && <ActiveVerificationCard request={activeRequest} />}
              {completedRequests.map((request) => (
                <CompletedVerificationCard key={request.id} request={request} />
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <h2 className="font-headline-sm text-primary">مكتبتي الخاصة</h2>
              <div className="flex p-1 bg-surface-container-low rounded-xl border border-mist-grey w-fit">
                {LIBRARY_FILTERS.map((filter) => (
                  <button
                    key={filter.id}
                    type="button"
                    className={`px-5 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                      libraryFilter === filter.id
                        ? "bg-white text-primary shadow-sm"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                    onClick={() => setLibraryFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredLibrary.map((item) => (
                <article
                  key={item.id}
                  className="group bg-surface-container-lowest rounded-2xl overflow-hidden border border-mist-grey/50 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={item.image}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <Link
                        to={
                          item.type === "podcast"
                            ? WEBSITE_ROUTES.PODCASTS
                            : WEBSITE_ROUTES.REPORTS_INVESTIGATIVE
                        }
                        className="w-full py-3 bg-gold-metallic-start text-white font-bold rounded-lg flex items-center justify-center gap-2 translate-y-4 group-hover:translate-y-0 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {item.actionIcon}
                        </span>
                        {item.actionLabel}
                      </Link>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`${item.badgeClass} backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg`}
                      >
                        {item.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 text-right">
                    <h3 className="font-headline-sm text-xl text-primary leading-tight group-hover:text-gold-metallic-start transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-on-surface-variant text-sm mt-3 flex items-center justify-end gap-2">
                      <span>{item.category}</span>
                      <span className="w-1 h-1 bg-outline rounded-full" />
                      <span>{item.meta}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </RevealSection>
        </div>

        {/* الشريط الجانبي */}
        <div className="lg:col-span-4 space-y-gutter">
          <RevealSection>
            <div className="glass-panel p-8 rounded-2xl shadow-sm border border-mist-grey">
              <div className="flex items-center gap-3 mb-8">
                <h2 className="font-headline-sm text-xl">تقدم التعلم</h2>
                <div className="w-10 h-10 bg-gold-metallic-start/10 text-gold-metallic-start rounded-lg flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">school</span>
                </div>
              </div>
              <div className="space-y-10">
                {primaryCourse && (
                  <div className="flex flex-col items-center">
                    <AnimatedCircularProgress
                      target={primaryCourse.progress}
                      duration={2000}
                    />
                    <div className="text-center mt-4">
                      <p className="font-label-bold text-sm text-primary mb-1">
                        {primaryCourse.title}
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        {primaryCourse.detail}
                      </p>
                    </div>
                    <Link
                      to={WEBSITE_ROUTES.MEDIA_LITERACY}
                      className="w-full mt-6 py-2.5 bg-primary text-white font-bold text-xs rounded-lg hover:bg-gold-metallic-start transition-colors shadow-md text-center"
                    >
                      متابعة الدورة
                    </Link>
                  </div>
                )}
                {linearCourse && (
                  <AnimatedLinearProgress
                    target={linearCourse.progress}
                    title={linearCourse.title}
                    duration={2000}
                  />
                )}
              </div>
            </div>
          </RevealSection>

          <RevealSection>
            <div className="bg-surface-container-low p-8 rounded-2xl border border-mist-grey/50">
              <h2 className="font-headline-sm text-xl mb-8 text-right">آخر النشاطات</h2>
              <div className="relative space-y-10 before:absolute before:right-5 before:top-2 before:bottom-2 before:w-[2px] before:bg-mist-grey">
                {ACTIVITY_FEED.map((activity) => (
                  <div key={activity.id} className="relative pr-14 group">
                    <div
                      className={`absolute right-0 top-1 w-10 h-10 rounded-xl flex items-center justify-center z-10 shadow-lg group-hover:scale-110 transition-transform ${
                        activity.filled
                          ? "bg-gold-metallic-start text-white"
                          : "bg-white text-on-surface-variant border border-mist-grey shadow-sm group-hover:bg-mist-grey"
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={
                          activity.filled
                            ? { fontVariationSettings: "'FILL' 1" }
                            : undefined
                        }
                      >
                        {activity.icon}
                      </span>
                    </div>
                    <div className="text-right min-w-0">
                      <p className="text-sm font-bold text-primary leading-snug">
                        {activity.title}
                      </p>
                      <p className="text-[11px] text-on-surface-variant mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="w-full mt-10 py-3 text-on-surface-variant font-label-bold text-xs hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                عرض جميع النشاطات
                <span className="material-symbols-outlined text-sm">expand_more</span>
              </button>
            </div>
          </RevealSection>
        </div>
      </div>
    </div>
  );
}
