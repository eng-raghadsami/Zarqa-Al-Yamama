import { DISINFORMATION_ARCHIVE_IMAGES } from "@website/constants/disinformationArchiveImages";

export type ArchiveCaseStatus = "verified" | "pending";

export type MisinformationType = "deepfake" | "image" | "text";
export type RiskLevel = "high" | "medium" | "low";

export type DisinformationCase = {
  id: string;
  title: string;
  date: string;
  recordedAt: string;
  accuracy: string;
  typeLabel: string;
  typeBadgeClass: string;
  misinformationType: MisinformationType;
  riskLevel: RiskLevel;
  status: ArchiveCaseStatus;
  image: string;
  imageAlt: string;
};

export type ArchiveStat = {
  id: string;
  label: string;
  value: string;
  numericValue: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  grouping?: boolean;
  icon: string;
  borderClass: string;
  trend?: { label: string; className: string };
  progress?: number;
  progressLabel?: string;
};

export const ARCHIVE_STATS: ArchiveStat[] = [
  {
    id: "total",
    label: "إجمالي الحالات المؤرشفة",
    value: "12,840",
    numericValue: 12840,
    grouping: true,
    icon: "inventory_2",
    borderClass: "border-primary",
    trend: { label: "+15%", className: "text-success-teal" },
  },
  {
    id: "detection",
    label: "دقة الاكتشاف التلقائي",
    value: "98.2%",
    numericValue: 98.2,
    decimals: 1,
    suffix: "%",
    icon: "auto_awesome",
    borderClass: "border-gold-metallic-start",
    progress: 98.2,
    progressLabel: "دقة عالية",
  },
  {
    id: "deepfake",
    label: "تزييف عميق تم رصده",
    value: "3,124",
    numericValue: 3124,
    grouping: true,
    icon: "neurology",
    borderClass: "border-primary",
    trend: { label: "متزايد", className: "text-warning-amber" },
  },
];

export const MISINFORMATION_TYPE_OPTIONS = [
  { value: "all", label: "نوع التضليل" },
  { value: "deepfake", label: "تزييف عميق (Deepfake)" },
  { value: "image", label: "صور معدلة" },
  { value: "text", label: "نصوص مضللة" },
] as const;

export const RISK_LEVEL_OPTIONS = [
  { value: "all", label: "مستوى الخطورة" },
  { value: "high", label: "مرتفع" },
  { value: "medium", label: "متوسط" },
  { value: "low", label: "منخفض" },
] as const;

export const TIME_PERIOD_OPTIONS = [
  { value: "all", label: "الفترة الزمنية" },
  { value: "24h", label: "آخر 24 ساعة" },
  { value: "week", label: "آخر أسبوع" },
  { value: "month", label: "آخر شهر" },
] as const;

export type MisinformationTypeFilter =
  (typeof MISINFORMATION_TYPE_OPTIONS)[number]["value"];
export type RiskLevelFilter = (typeof RISK_LEVEL_OPTIONS)[number]["value"];
export type TimePeriodFilter = (typeof TIME_PERIOD_OPTIONS)[number]["value"];

export type ArchiveFilters = {
  keyword: string;
  misinformationType: MisinformationTypeFilter;
  riskLevel: RiskLevelFilter;
  timePeriod: TimePeriodFilter;
};

function daysAgo(days: number, hours = 0): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  date.setHours(date.getHours() - hours);
  return date.toISOString();
}

const AR_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
] as const;

function formatArabicDate(iso: string): string {
  const date = new Date(iso);
  return `${date.getDate()} ${AR_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function matchesTimePeriod(
  recordedAt: string,
  period: TimePeriodFilter,
): boolean {
  if (period === "all") return true;

  const diffMs = Date.now() - new Date(recordedAt).getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  switch (period) {
    case "24h":
      return diffMs <= dayMs;
    case "week":
      return diffMs <= 7 * dayMs;
    case "month":
      return diffMs <= 30 * dayMs;
    default:
      return true;
  }
}

export function filterDisinformationCases(
  cases: DisinformationCase[],
  filters: ArchiveFilters,
): DisinformationCase[] {
  const keyword = filters.keyword.trim().toLowerCase();

  return cases.filter((item) => {
    if (
      filters.misinformationType !== "all" &&
      item.misinformationType !== filters.misinformationType
    ) {
      return false;
    }

    if (filters.riskLevel !== "all" && item.riskLevel !== filters.riskLevel) {
      return false;
    }

    if (!matchesTimePeriod(item.recordedAt, filters.timePeriod)) {
      return false;
    }

    if (!keyword) return true;

    return (
      item.title.toLowerCase().includes(keyword) ||
      item.typeLabel.toLowerCase().includes(keyword) ||
      item.misinformationType.includes(keyword)
    );
  });
}

export const DISINFORMATION_CASES: DisinformationCase[] = [
  {
    id: "1",
    title: "تلاعب رقمي بخطاب سياسي رفيع المستوى",
    recordedAt: daysAgo(0, 6),
    date: "",
    accuracy: "98.4%",
    typeLabel: "DEEPFAKE",
    typeBadgeClass: "bg-primary text-white",
    misinformationType: "deepfake",
    riskLevel: "high",
    status: "verified",
    image: DISINFORMATION_ARCHIVE_IMAGES.case1,
    imageAlt: "Deepfake Scan",
  },
  {
    id: "2",
    title: "تحريف صور لمناطق صراع حدودية",
    recordedAt: daysAgo(2),
    date: "",
    accuracy: "92.1%",
    typeLabel: "MANIPULATED IMAGE",
    typeBadgeClass: "bg-error text-white",
    misinformationType: "image",
    riskLevel: "high",
    status: "pending",
    image: DISINFORMATION_ARCHIVE_IMAGES.case2,
    imageAlt: "Data Map",
  },
  {
    id: "3",
    title: "حملة أخبار زائفة مدعومة بالذكاء الاصطناعي",
    recordedAt: daysAgo(5),
    date: "",
    accuracy: "96.7%",
    typeLabel: "AI GENERATED TEXT",
    typeBadgeClass: "bg-tertiary-container text-white",
    misinformationType: "text",
    riskLevel: "medium",
    status: "verified",
    image: DISINFORMATION_ARCHIVE_IMAGES.case3,
    imageAlt: "AI Fabric",
  },
  {
    id: "4",
    title: "تزييف مستندات بنكية لتضليل الرأي العام",
    recordedAt: daysAgo(12),
    date: "",
    accuracy: "99.1%",
    typeLabel: "FABRICATED EVIDENCE",
    typeBadgeClass: "bg-primary text-white",
    misinformationType: "text",
    riskLevel: "high",
    status: "verified",
    image: DISINFORMATION_ARCHIVE_IMAGES.case4,
    imageAlt: "Data Circuit",
  },
  {
    id: "5",
    title: "استنساخ صوتي لشخصية إعلامية بارزة",
    recordedAt: daysAgo(20),
    date: "",
    accuracy: "88.5%",
    typeLabel: "AUDIO CLONE",
    typeBadgeClass: "bg-primary text-white",
    misinformationType: "deepfake",
    riskLevel: "medium",
    status: "pending",
    image: DISINFORMATION_ARCHIVE_IMAGES.case5,
    imageAlt: "Audio Monitor",
  },
  {
    id: "6",
    title: "فيديو مركب بتقنيات الواقع المعزز",
    recordedAt: daysAgo(35),
    date: "",
    accuracy: "95.2%",
    typeLabel: "SYNTHETIC MEDIA",
    typeBadgeClass: "bg-primary text-white",
    misinformationType: "deepfake",
    riskLevel: "low",
    status: "verified",
    image: DISINFORMATION_ARCHIVE_IMAGES.case6,
    imageAlt: "Synthetic Map",
  },
].map((item) => ({
  ...item,
  date: formatArabicDate(item.recordedAt),
})) as DisinformationCase[];

export const ARCHIVE_PAGE = {
  title: "أرشيف التضليل الكامل",
  description:
    "قاعدة بيانات شاملة لعمليات التزييف الإعلامي المرصودة، مصنفة حسب تقنيات التلاعب ومستويات الخطورة لتعزيز النزاهة الرقمية.",
} as const;
