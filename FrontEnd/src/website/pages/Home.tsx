import { Link } from "react-router-dom";
import { WEBSITE_ROUTES } from "@core/constants/routes";
import AnimatedStatNumber from "@shared/components/AnimatedStatNumber";

type HeroStat =
  | {
      icon: string;
      label: string;
      staticValue: string;
    }
  | {
      icon: string;
      label: string;
      target: number;
      decimals?: number;
      prefix?: string;
      suffix?: string;
      grouping?: boolean;
    };

const HERO_STATS: HeroStat[] = [
  { icon: "radar", staticValue: "24/7", label: "مراقبة ذكية" },
  {
    icon: "database",
    target: 1.2,
    suffix: "M+",
    decimals: 1,
    label: "بيانات منشورة",
  },
  {
    icon: "hub",
    target: 25,
    suffix: "K+",
    decimals: 0,
    label: "مصدر تم تحليله",
  },
  {
    icon: "verified_user",
    target: 97,
    suffix: "%",
    decimals: 0,
    label: "دقة التحليل",
  },
];

export default function Home() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative px-margin-mobile md:px-margin-desktop overflow-hidden dot-pattern pt-5 md:pt-7 pb-8 md:pb-12">
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-10 pointer-events-none grayscale">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        </div>
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10 max-w-container-max">
          {/* Left Content */}
          <div className="order-2 lg:order-1 flex flex-col items-start gap-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full font-label-bold text-label-bold gold-glow">
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              تحليل ذكي متقدم ✨
            </div>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary leading-tight">
              كشف شبكات{" "}
              <span className="text-secondary">التضليل الإعلامي</span>{" "}
              في الإعلام المحلي والعالمي
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              نستخدم خوارزميات الرؤية الحاسوبية المتقدمة وتحليل البيانات
              الضخمة لرصد الأنماط الخفية في التقارير الإعلامية، مما يمنحك
              وضوحاً مطلقاً في مشهد إعلامي معقد.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="group flex items-center gap-2 px-8 py-4 bg-primary text-on-primary rounded-lg font-headline-sm text-headline-sm transition-all hover:translate-x-1">
                استكشف التحليل الكامل
                <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">
                  arrow_back
                </span>
              </button>
              <button className="flex items-center gap-2 px-8 py-4 border border-outline text-primary rounded-lg font-headline-sm text-headline-sm hover:bg-surface-container-low transition-all">
                <span className="material-symbols-outlined">play_circle</span>
                شاهد فيديو تعريفي
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
              <div className="relative z-20 w-[85%] aspect-square bg-surface-container-lowest rounded-xl shadow-xl flex items-center justify-center p-8">
                <img
                  alt="Logo"
                  className="w-full h-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwETDnAo27sVhZY3SpgYYKHTPluKhVuATAx-x-dXjXJ2Fkzz7dVQs_O6E-c2Oufpvm3GYVD3AaWTIaQK3qZ3eXlDW26IokpTj-D6Rkczmk262u9ShWNwFOOL7S3hrVlvSc7rv20lsoT2pwDUlG33e1ZrhmH0cBtRxcf5s_Nx2HxLp44bL5OapAfrJdvz0_4ymjonP_BrN1TvRrSupFV-woNwbvHZ0hr1YgyKdrcKLJ-yXgqVYdIvGMSIm7WMMkvqsufz8sFO7yYT_E"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent z-30 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats Bar */}
      <section className="px-margin-mobile md:px-margin-desktop -mt-10 md:-mt-12 relative z-30 pb-2">
        <div className="max-w-container-max mx-auto bg-surface-container-lowest shadow-xl rounded-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 border border-outline-variant/20">
          {HERO_STATS.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center text-center gap-2 ${
                index > 0 ? "border-s border-outline-variant/30 ps-4 md:ps-6" : ""
              }`}
            >
              <span className="material-symbols-outlined text-secondary text-[32px]">
                {stat.icon}
              </span>
              {"staticValue" in stat ? (
                <span className="font-stats-number text-stats-number text-primary">
                  {stat.staticValue}
                </span>
              ) : (
                <AnimatedStatNumber
                  target={stat.target}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  grouping={stat.grouping}
                  className="font-stats-number text-stats-number text-primary"
                  duration={2000}
                />
              )}
              <span className="font-label-bold text-label-bold text-on-surface-variant">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pt-12 md:pt-14 pb-section-gap px-margin-mobile md:px-margin-desktop flex flex-col lg:flex-row gap-12 max-w-container-max mx-auto">
        {/* Sidebar (RTL: Right side) */}
        <aside className="lg:w-80 shrink-0 order-1 lg:order-2">
          <div className="sticky top-28 bg-surface-container-low rounded-xl p-6 shadow-md flex flex-col gap-8 border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  smart_toy
                </span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-secondary">
                  مساعدي الذكي
                </h3>
                <p className="text-xs text-on-surface-variant">
                  تحليل النزاهة الرقمية
                </p>
              </div>
            </div>
            <Link
              to={WEBSITE_ROUTES.VERIFICATION_IMAGE}
              className="w-full py-3 bg-secondary text-on-secondary rounded-lg font-label-bold text-label-bold gold-glow hover:opacity-90 transition-all flex items-center justify-center gap-2"
            >
              تقديم ملف للتحقق
              <span className="material-symbols-outlined">add</span>
            </Link>

            {/* Processing Phases Timeline */}
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 relative">
                <div className="absolute top-0 bottom-0 right-[15px] w-0.5 bg-outline-variant/30" />
                <div className="relative z-10 w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-sm font-bold shrink-0">
                  1
                </div>
                <div className="flex flex-col">
                  <span className="font-label-bold text-label-bold">
                    جمع البيانات الحية
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    يتم الآن سحب البيانات من 450 مصدراً
                  </span>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="absolute top-0 bottom-0 right-[15px] w-0.5 bg-outline-variant/30" />
                <div className="relative z-10 w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center gold-glow shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    sync
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-bold text-label-bold text-secondary">
                    تحليل الأنماط العصبية
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    جارٍ مطابقة الحقائق التاريخية
                  </span>
                </div>
              </div>
              <div className="flex gap-4 relative">
                <div className="relative z-10 w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center text-sm shrink-0">
                  3
                </div>
                <div className="flex flex-col opacity-50">
                  <span className="font-label-bold text-label-bold">
                    توليد تقرير النزاهة
                  </span>
                  <span className="text-xs text-on-surface-variant">
                    بانتظار اكتمال التحليل
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Grid (RTL: Left side) */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="flex justify-between items-end mb-10 border-b border-outline-variant/30 pb-4">
            <h2 className="font-headline-md text-headline-md text-primary">
              أبرز التحقيقات الجارية
            </h2>
            <a
              className="text-secondary font-label-bold text-label-bold hover:underline flex items-center gap-1"
              href="#"
            >
              عرض جميع التقارير
              <span className="material-symbols-outlined text-sm">
                arrow_back
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Card 1 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10">
              <div className="aspect-video overflow-hidden relative">
                <img
                  alt="واجهة رقمية متطورة تُظهر خرائط الشبكات وعُقد البيانات"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvkrsgwzP6Ugvowokzy7jBCYwKjL_ow5hq0rIrEVfuD4keiLNkwp5UoogMWUzCYa1ZFzw2Lpt9HBZuvTFdWb7WZPCrHQCvyRBoC-gFsRhQ6yc7HWHyWFM6Q8XJn4Ce_O1BoFLdanBEGyoq30_ArCPdVBalafCXn1JgV37gZywgnBR8kvGMpbh1RB_Vco9Zosicwnwdl3u7DCaqRvaC2g5u6Za20rVgN-wtJYxMl-sAEu9945JpjGWhud7yKo92Lg-hICEbWHRNPBtn"
                />
                <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-xs font-bold">
                  تحقيق حصري
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-error/10 text-error rounded text-[10px] font-bold border border-error/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error" />
                    محتوى مضلل
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">
                  كواليس التلاعب بأسعار الغاز الطبيعي عبر منصات التواصل
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
                  كشف شبكة من الحسابات الوهمية التي روجت لأخبار كاذبة بهدف
                  التأثير على عقود الطاقة الآجلة في المنطقة العربية.
                </p>
                <a
                  className="inline-flex items-center gap-2 text-secondary font-bold text-sm border-b-2 border-transparent hover:border-secondary transition-all"
                  href="#"
                >
                  اقرأ المزيد
                  <span className="material-symbols-outlined text-[18px]">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10">
              <div className="aspect-video overflow-hidden relative">
                <img
                  alt="تصور مجرد لبيانات مالية ذهبية على خلفية رقمية داكنة"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyn4VEpZJ40rdQjG0lEnxI18ngCoJEpXSudd3bF95hOWDSMvyV0FadfwrfHIfXUPR9uCD0j6Jc1bigNcQJD8fhVCYX7pnfE1Al0LcOIPdcameAWCgv8Usc6hZRya0bJowKzeZgXK29Jr3EvBEgL5NEcOkxYYm3wetCJNhFpGvbIkJpfzZmnVAfeXTE-dRDFhima-QBm_2auvIUmJdaQ6QqQfAnd2oYnzKBywIn13YGucEdAdwOf4euMLIMv6_lJpNq6B3kiWWBINze"
                />
                <div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold">
                  موثق ذكياً
                </div>
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-success-teal/10 text-success-teal rounded text-[10px] font-bold border border-success-teal/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-teal" />
                    بيانات حقيقية
                  </span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary mb-3 group-hover:text-secondary transition-colors">
                  تحليل تدفقات الاستثمار الأجنبي في مشاريع الطاقة النظيفة
                </h3>
                <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
                  دراسة تحليلية مدعومة بالبيانات الضخمة تظهر النمو الحقيقي
                  مقارنة بالوعود الإعلامية في قطاع الهيدروجين الأخضر.
                </p>
                <a
                  className="inline-flex items-center gap-2 text-secondary font-bold text-sm border-b-2 border-transparent hover:border-secondary transition-all"
                  href="#"
                >
                  اقرأ المزيد
                  <span className="material-symbols-outlined text-[18px]">
                    open_in_new
                  </span>
                </a>
              </div>
            </div>

            {/* Card 3 - Wide */}
            <div className="group md:col-span-2 glass-panel rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-secondary/10 flex flex-col md:flex-row">
              <div className="md:w-1/3 overflow-hidden">
                <img
                  alt="غرفة تحكم متطورة مليئة بشاشات رقمية كبيرة"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCki74AOWZL3uU71OGjJmkeQTz7xjYySouoWN8UvzY-1wv271wRFuKk5W7z5uhFbTgSFN93Co6FxE4OuNaFmpzi58NZHNG6BVX2zWN8DxGg7ByvfqaqHe7YDC4uM1Ta2AsNMKPGhi3sZks_XgPJwRPrRbKu_Xqr6JQnkQLwVhFz2gPxM8l_1D4EsuxWXlROTPA8v4fV4vPGmQghhZQ-ivHjfQNW2euCNLuO3O2_ID5Nx-aU0ERqzYEoHrSCcaBzs7XHzbjfPPHzWqhR"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col justify-center">
                <div className="flex gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary text-on-primary rounded text-[10px] font-bold uppercase tracking-widest">
                    تغطية خاصة
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary mb-4 group-hover:text-secondary transition-colors">
                  تزييف الواقع: رحلة في أعماق تقنيات الـ Deepfake الإعلامية
                </h3>
                <p className="text-on-surface-variant text-body-lg mb-6 max-w-2xl">
                  كيف يمكن للذكاء الاصطناعي كشف ما صنعه الذكاء الاصطناعي؟
                  تقرير مفصل حول أدواتنا في رصد الفيديوهات المفبركة للقادة
                  السياسيين.
                </p>
                <div className="flex items-center gap-4">
                  <button className="px-6 py-2 bg-secondary text-on-secondary rounded-lg font-label-bold text-label-bold hover:opacity-90">
                    شاهد التحليل المرئي
                  </button>
                  <span className="text-outline text-sm">
                    وقت القراءة: 12 دقيقة
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
