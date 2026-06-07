import type { EditorMetric } from "@website/types/editorSpace";
import { EDITOR_ARTICLE_IMAGE } from "@website/constants/brand";
import {
  EDITOR_ACTIVITIES,
  EDITOR_AI_INSIGHTS,
  EDITOR_ARTICLE,
  EDITOR_HIGHLIGHTS,
  EDITOR_METRICS,
  EDITOR_PARAGRAPHS,
} from "@website/types/editorSpace";

function MetricCard({ metric }: { metric: EditorMetric }) {
  return (
    <div className="p-4 bg-mist-grey/10 rounded-xl border border-mist-grey/30">
      <p className="text-[10px] text-on-surface-variant mb-1">{metric.label}</p>
      <p className="text-xl font-bold text-primary">
        {metric.value}
        {metric.unit && (
          <span className="text-xs font-normal"> {metric.unit}</span>
        )}
      </p>
      {metric.variant === "stars" ? (
        <div className="flex gap-0.5 mt-2">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gold-metallic-start"
            />
          ))}
          <span className="w-2 h-2 rounded-full bg-mist-grey" />
        </div>
      ) : (
        <div className="w-full bg-mist-grey h-1 mt-2 rounded-full overflow-hidden">
          <div
            className={`h-full ${metric.progressClass}`}
            style={{ width: `${metric.progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

export default function EditorContentReview() {
  const ethicsHighlight = EDITOR_HIGHLIGHTS.find((h) => h.type === "quote");
  const biasHighlight = EDITOR_HIGHLIGHTS.find((h) => h.type === "bias");

  return (
    <div className="max-w-container-max mx-auto w-full" dir="rtl">
      {/* عنوان الصفحة */}
      <div className="flex flex-row-reverse items-center justify-between gap-4 mb-8">
        <div className="hidden lg:flex items-center gap-2 bg-mist-grey/20 px-3 py-1.5 rounded-full border border-mist-grey/50 shrink-0">
          <span className="w-2 h-2 rounded-full bg-success-teal animate-pulse" />
          <span className="text-xs font-medium text-on-surface-variant">
            الذكاء الاصطناعي نشط
          </span>
        </div>
        <h1 className="text-xl font-headline-sm text-primary">مراجعة المحتوى</h1>
      </div>

      {/* مسار التنقل والحالة */}
      <div className="flex flex-col sm:flex-row sm:flex-row-reverse sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex flex-row-reverse items-center gap-2 text-sm text-on-surface-variant">
          <span>{EDITOR_ARTICLE.breadcrumbParent}</span>
          <span className="material-symbols-outlined text-xs">chevron_left</span>
          <span className="font-medium text-primary">{EDITOR_ARTICLE.title}</span>
        </div>
        <div className="flex flex-row-reverse items-center gap-3">
          <span className="bg-warning-amber/10 text-warning-amber px-3 py-1 rounded-full text-xs font-bold border border-warning-amber/20">
            {EDITOR_ARTICLE.status}
          </span>
          <span className="text-xs text-on-surface-variant">
            آخر تحديث: {EDITOR_ARTICLE.lastUpdated}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* مساحة العمل الرئيسية */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-mist-grey/50 overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary text-right mb-8 leading-tight">
                {EDITOR_ARTICLE.headline}
              </h2>
              <div className="max-w-none text-right text-on-surface-variant leading-relaxed space-y-6 font-body-md">
                <p>{EDITOR_PARAGRAPHS.intro}</p>

                {ethicsHighlight && (
                  <div className="relative group">
                    <div className="p-5 bg-primary/5 border-r-4 border-gold-metallic-start rounded-lg transition-all hover:bg-primary/10">
                      <p className="font-medium text-primary">
                        &ldquo;{ethicsHighlight.content}&rdquo;
                      </p>
                    </div>
                    <div
                      className={`${ethicsHighlight.tooltipPosition} editor-glass-tooltip p-4 rounded-xl flex flex-row-reverse items-center gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-64 editor-floating`}
                    >
                      <div
                        className={`p-2 rounded-lg ${ethicsHighlight.tooltipIconClass}`}
                      >
                        <span className="material-symbols-outlined">
                          {ethicsHighlight.tooltipIcon}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-primary">
                          {ethicsHighlight.tooltipTitle}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {ethicsHighlight.tooltipDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <p>{EDITOR_PARAGRAPHS.middle}</p>

                {biasHighlight && (
                  <div className="relative group">
                    <p>
                      غالباً ما يتم تحميل المسؤولية الإدارية لبعض الفئات دون
                      غيرها. على سبيل المثال،{" "}
                      <span className="bg-warning-amber/10 border-b-2 border-warning-amber/30 px-1 font-medium text-primary inline">
                        {biasHighlight.content}
                      </span>{" "}
                      مقارنة بنظرائهم من الرجال في نفس المناصب.
                    </p>
                    <div
                      className={`${biasHighlight.tooltipPosition} editor-glass-tooltip p-4 rounded-xl flex flex-row-reverse items-start gap-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-72 editor-floating`}
                    >
                      <div
                        className={`p-2 rounded-lg ${biasHighlight.tooltipIconClass}`}
                      >
                        <span className="material-symbols-outlined">
                          {biasHighlight.tooltipIcon}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-primary">
                          {biasHighlight.tooltipTitle}
                        </p>
                        <p className="text-[10px] text-on-surface-variant">
                          {biasHighlight.tooltipDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="my-10 relative group">
                  <div className="rounded-2xl overflow-hidden border border-mist-grey shadow-md relative aspect-video">
                    <img
                      alt="Financial Analysis"
                      className="w-full h-full object-cover"
                      src={EDITOR_ARTICLE_IMAGE}
                      loading="lazy"
                    />
                    <div className="editor-radar-line" aria-hidden />
                    <div className="absolute top-4 right-4 editor-glass-tooltip px-4 py-2 rounded-full border-r-4 border-error flex items-center gap-2">
                      <span className="material-symbols-outlined text-error text-sm">
                        warning
                      </span>
                      <span className="text-[10px] font-bold text-error">
                        احتمالية تزييف: 87%
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-center text-on-surface-variant mt-4 italic">
                    الشكل 1: تمثيل بيانات الأسواق - يشتبه في كونها ولدت بواسطة
                    الذكاء الاصطناعي
                  </p>
                </div>

                <p>{EDITOR_PARAGRAPHS.outro}</p>
              </div>
            </div>
          </div>

          {/* تحليل الأداء */}
          <div className="bg-white rounded-2xl p-6 border border-mist-grey/50 shadow-sm">
            <div className="flex flex-row-reverse items-center justify-between mb-6">
              <h3 className="font-bold text-primary">
                تحليل الأداء التاريخي للمصدر
              </h3>
              <button
                type="button"
                className="text-xs text-gold-metallic-start font-bold hover:underline"
              >
                عرض التقرير الكامل
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {EDITOR_METRICS.map((metric) => (
                <MetricCard key={metric.id} metric={metric} />
              ))}
            </div>
          </div>
        </div>

        {/* الشريط الجانبي للتحليل */}
        <div className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-28">
            <div className="bg-primary text-white rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-gold-metallic-start/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-row-reverse items-center justify-between mb-6">
                  <h3 className="font-bold flex flex-row-reverse items-center gap-2">
                    <span className="material-symbols-outlined text-gold-metallic-start">
                      auto_awesome
                    </span>
                    رؤى الذكاء الاصطناعي
                  </h3>
                  <span className="text-[10px] bg-white/10 px-2 py-1 rounded">
                    V2.4
                  </span>
                </div>
                <div className="space-y-4">
                  {EDITOR_AI_INSIGHTS.map((insight, index) => (
                    <div
                      key={insight.label}
                      className={`flex flex-row-reverse justify-between items-center text-sm ${
                        index < EDITOR_AI_INSIGHTS.length - 1
                          ? "border-b border-white/10 pb-3"
                          : ""
                      }`}
                    >
                      <span className="text-white/60">{insight.label}</span>
                      <span className={`font-bold ${insight.valueClass}`}>
                        {insight.value}
                      </span>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-full mt-8 bg-white/10 hover:bg-white/20 border border-white/20 py-2.5 rounded-xl text-xs font-bold transition-all"
                >
                  تحميل التقرير الفني
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-mist-grey/50 shadow-sm">
              <h3 className="font-bold text-primary mb-4 text-right">
                سجل الأنشطة
              </h3>
              <div className="space-y-4">
                {EDITOR_ACTIVITIES.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-row-reverse gap-3 items-start"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activity.dotClass}`}
                    />
                    <div className="text-right">
                      <p className="text-xs font-bold text-primary">
                        {activity.title}
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* شريط الإجراءات الثابت */}
      <footer className="fixed bottom-20 lg:bottom-0 left-0 right-0 lg:mr-80 bg-white/90 backdrop-blur-md border-t border-mist-grey/50 p-4 md:p-6 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
        <div className="max-w-container-max mx-auto flex flex-row-reverse items-center justify-between gap-4 px-4 md:px-margin-desktop">
          <div className="flex flex-row-reverse items-center gap-4">
            <button
              type="button"
              className="bg-primary text-white px-6 md:px-12 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">publish</span>
              اعتماد ونشر
            </button>
            <button
              type="button"
              className="bg-white text-on-surface-variant border border-mist-grey px-6 md:px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-mist-grey/10 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">reply</span>
              <span className="hidden sm:inline">رفض وإعادة للمحرر</span>
              <span className="sm:hidden">رفض</span>
            </button>
          </div>
          <div className="hidden md:flex flex-row-reverse items-center gap-6">
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant mb-0.5">
                الوقت المستغرق في المراجعة
              </p>
              <p className="text-sm font-bold text-primary">
                {EDITOR_ARTICLE.reviewTime}
              </p>
            </div>
            <button
              type="button"
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
              aria-label="المزيد من الخيارات"
            >
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
