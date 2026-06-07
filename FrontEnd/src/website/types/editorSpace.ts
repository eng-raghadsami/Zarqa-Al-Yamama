export type EditorMetric = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  progress: number;
  progressClass: string;
  variant?: "stars";
};

export type EditorAiInsight = {
  label: string;
  value: string;
  valueClass: string;
};

export type EditorActivity = {
  id: string;
  title: string;
  time: string;
  dotClass: string;
};

export type EditorArticleHighlight = {
  id: string;
  type: "quote" | "bias";
  content: string;
  tooltipTitle: string;
  tooltipDescription: string;
  tooltipIcon: string;
  tooltipIconClass: string;
  tooltipPosition: string;
};

export const EDITOR_USER = {
  name: "نورة العبدالله",
  role: "محرر رئيسي",
} as const;

export const EDITOR_ARTICLE = {
  breadcrumbParent: "المقالات",
  title: "تحليل شبكات التضليل المالي",
  headline:
    "كشف شبكات التضليل المالي: كيف يتم التلاعب بالأسواق الناشئة؟",
  status: "قيد المراجعة",
  lastUpdated: "قبل 5 دقائق",
  reviewTime: "00:14:22",
} as const;

export const EDITOR_PARAGRAPHS = {
  intro:
    "في تقرير حديث، تم تسليط الضوء على العمليات المعقدة التي تقف خلف تحركات الأسواق المفاجئة. لقد أصبح من الواضح أن بعض الجهات تستخدم استراتيجيات إعلامية موجهة للتأثير على المستثمرين الصغار.",
  middle:
    "ورغم المحاولات المستمرة لتنظيم هذه الأسواق، إلا أن الثغرات لا تزال موجودة. ومن المثير للاهتمام ملاحظة كيف يتم توجيه اللوم في كثير من الأحيان إلى الكوادر القيادية بشكل غير عادل.",
  outro:
    "في الختام، يتطلب التعامل مع هذه الشبكات تعاوناً دولياً متقدماً وأدوات تحليل تعتمد على الذكاء الاصطناعي لكشف الأنماط المخفية قبل تفاقم الأزمات وضمان نزاهة المعلومات المالية.",
} as const;

export const EDITOR_HIGHLIGHTS: EditorArticleHighlight[] = [
  {
    id: "ethics",
    type: "quote",
    content:
      "تشير مصادرنا الموثوقة إلى أن هناك اتفاقيات سرية تمت خلف الأبواب المغلقة، مما يعكس بوضوح نية مبيتة لتدمير الاقتصاد المحلي.",
    tooltipTitle: "تحليل الأخلاقيات",
    tooltipDescription: "لغة عاطفية قوية دون أدلة ملموسة.",
    tooltipIcon: "psychology",
    tooltipIconClass: "bg-gold-metallic-start/20 text-gold-metallic-start",
    tooltipPosition: "absolute -top-16 left-10",
  },
  {
    id: "gender-bias",
    type: "bias",
    content:
      "القيادات النسائية غالباً ما تكون أقل حزماً في اتخاذ القرارات المالية الصارمة",
    tooltipTitle: "تحيز النوع الاجتماعي",
    tooltipDescription:
      "تم رصد تعميم جنساني. يوصى بإعادة الصياغة بناءً على الكفاءة المهنية فقط.",
    tooltipIcon: "diversity_3",
    tooltipIconClass: "bg-warning-amber/10 text-warning-amber",
    tooltipPosition: "absolute top-10 right-10",
  },
];

export const EDITOR_METRICS: EditorMetric[] = [
  {
    id: "accuracy",
    label: "دقة المعلومات",
    value: "92%",
    progress: 92,
    progressClass: "bg-success-teal",
  },
  {
    id: "bias",
    label: "نسبة الانحياز",
    value: "14%",
    progress: 14,
    progressClass: "bg-warning-amber",
  },
  {
    id: "speed",
    label: "السرعة في النشر",
    value: "4.2",
    unit: "ساعة",
    progress: 80,
    progressClass: "bg-primary",
  },
  {
    id: "rating",
    label: "تقييم القراء",
    value: "4.8/5",
    progress: 80,
    progressClass: "bg-gold-metallic-start",
    variant: "stars",
  },
];

export const EDITOR_AI_INSIGHTS: EditorAiInsight[] = [
  { label: "مؤشر النزاهة", value: "72%", valueClass: "text-warning-amber" },
  {
    label: "تحيز النوع الاجتماعي",
    value: "منخفض",
    valueClass: "text-success-teal",
  },
  {
    label: "كشف التزييف العميق",
    value: "مرتفع (87%)",
    valueClass: "text-error",
  },
  {
    label: "تحقق المصادر",
    value: "3/3 مكتمل",
    valueClass: "text-success-teal",
  },
  {
    label: "فحص الأخلاقيات",
    value: "يتطلب مراجعة",
    valueClass: "text-warning-amber",
  },
];

export const EDITOR_ACTIVITIES: EditorActivity[] = [
  {
    id: "1",
    title: "تم الفحص الأولي",
    time: "قبل 12 دقيقة • النظام",
    dotClass: "bg-success-teal",
  },
  {
    id: "2",
    title: "رفع نسخة محدثة",
    time: "قبل ساعة • المحرر: أحمد",
    dotClass: "bg-primary",
  },
  {
    id: "3",
    title: "تعيين للمراجعة",
    time: "قبل ساعتين • النظام",
    dotClass: "bg-mist-grey",
  },
];
