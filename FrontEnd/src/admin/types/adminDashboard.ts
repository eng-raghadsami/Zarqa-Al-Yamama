import { ADMIN_IMAGES } from "@admin/constants/adminImages";

export type AdminOverviewStat = {
  id: string;
  label: string;
  icon: string;
  borderClass: string;
  numericValue?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  grouping?: boolean;
  progress?: number;
  trend?: { label: string; className: string };
  progressLabel?: string;
  statusText?: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  roleClass: string;
  status: string;
  statusDotClass: string;
  lastActive: string;
  avatar: string;
};

export type AdminChartBar = {
  id: string;
  value: number;
  heightPercent: number;
  active?: boolean;
};

export type AdminStrategicStat = {
  id: string;
  label: string;
  numericValue: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  grouping?: boolean;
};

export type AdminPolicy = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  variant?: "toggle" | "sensitivity";
  sensitivityLabel?: string;
};

export type AdminArchiveItem = {
  id: string;
  title: string;
  badge: string;
  badgeClass: string;
  time: string;
  image: string;
};

export const ADMIN_PAGE = {
  title: "نظرة عامة على النظام",
  description: "متابعة الأداء الحي لعمليات النزاهة الرقمية",
} as const;

export const ADMIN_OVERVIEW_STATS: AdminOverviewStat[] = [
  {
    id: "investigators",
    label: "المحققون النشطون",
    icon: "groups",
    borderClass: "border-gold-metallic-start",
    numericValue: 1284,
    grouping: true,
    trend: { label: "+12%", className: "text-success-teal" },
  },
  {
    id: "verified",
    label: "البلاغات المتحقق منها",
    icon: "verified",
    borderClass: "border-primary",
    numericValue: 45.2,
    decimals: 1,
    suffix: "k",
    trend: { label: "+8%", className: "text-success-teal" },
  },
  {
    id: "ai-accuracy",
    label: "معدل دقة الذكاء الاصطناعي",
    icon: "psychology",
    borderClass: "border-gold-metallic-start",
    numericValue: 98.4,
    decimals: 1,
    suffix: "%",
    progress: 98.4,
    progressLabel: "دقة عالية",
  },
  {
    id: "system-health",
    label: "حالة النظام",
    icon: "health_and_safety",
    borderClass: "border-primary",
    statusText: "ممتاز",
    trend: { label: "مستقر", className: "text-success-teal" },
  },
];

export const ADMIN_USERS: AdminUser[] = [
  {
    id: "1",
    name: "أحمد العتيبي",
    email: "ahmed@zarqa.ai",
    role: "مدير نظام",
    roleClass: "bg-primary-container text-on-primary-container",
    status: "نشط",
    statusDotClass: "bg-success-teal",
    lastActive: "منذ ساعتين",
    avatar: ADMIN_IMAGES.user1,
  },
  {
    id: "2",
    name: "سارة الماجد",
    email: "sara.m@zarqa.ai",
    role: "محقق رئيسي",
    roleClass: "bg-mist-grey text-on-surface-variant",
    status: "نشط",
    statusDotClass: "bg-success-teal",
    lastActive: "منذ 5 دقائق",
    avatar: ADMIN_IMAGES.user2,
  },
  {
    id: "3",
    name: "فيصل الحربي",
    email: "faisal@zarqa.ai",
    role: "محرر",
    roleClass: "bg-mist-grey text-on-surface-variant",
    status: "بعيد",
    statusDotClass: "bg-warning-amber",
    lastActive: "أمس",
    avatar: ADMIN_IMAGES.user3,
  },
];

export const ADMIN_CHART_BARS: AdminChartBar[] = [
  { id: "1", value: 45, heightPercent: 60 },
  { id: "2", value: 62, heightPercent: 80 },
  { id: "3", value: 88, heightPercent: 95, active: true },
  { id: "4", value: 38, heightPercent: 50 },
  { id: "5", value: 54, heightPercent: 70 },
  { id: "6", value: 22, heightPercent: 40 },
];

export const ADMIN_STRATEGIC_STATS: AdminStrategicStat[] = [
  {
    id: "attacks",
    label: "إجمالي الهجمات",
    numericValue: 12402,
    grouping: true,
  },
  {
    id: "containment",
    label: "معدل الاحتواء",
    numericValue: 92.1,
    decimals: 1,
    suffix: "%",
  },
  {
    id: "response",
    label: "متوسط زمن الاستجابة",
    numericValue: 4.2,
    decimals: 1,
    suffix: "m",
  },
  {
    id: "savings",
    label: "توفير التكاليف",
    numericValue: 1.2,
    decimals: 1,
    prefix: "$",
    suffix: "M",
  },
];

export const ADMIN_POLICIES: AdminPolicy[] = [
  {
    id: "auto-publish",
    title: "النشر التلقائي للحقائق",
    description: "تفعيل التكذيب الفوري عبر المنصات",
    enabled: true,
    variant: "toggle",
  },
  {
    id: "ai-sensitivity",
    title: "حساسية الذكاء الاصطناعي",
    description: "مستوى التحقق من الصور والوسائط",
    enabled: false,
    variant: "sensitivity",
    sensitivityLabel: "عالي",
  },
  {
    id: "emergency",
    title: "وضع الطوارئ",
    description: "تعليق التحليلات غير المؤكدة",
    enabled: false,
    variant: "toggle",
  },
];

export const ADMIN_ARCHIVE_ITEMS: AdminArchiveItem[] = [
  {
    id: "1",
    title: "فيديو مفبرك عن أزمة الطاقة العالمية",
    badge: "تزييف عميق",
    badgeClass: "bg-primary text-white",
    time: "منذ 3 ساعات",
    image: ADMIN_IMAGES.archive1,
  },
  {
    id: "2",
    title: "خبر كاذب متداول في منصة X",
    badge: "تم التصحيح",
    badgeClass: "bg-gold-metallic-start text-primary",
    time: "منذ 6 ساعات",
    image: ADMIN_IMAGES.archive2,
  },
  {
    id: "3",
    title: "محاولة تلاعب بالرأي العام المحلي",
    badge: "حملة منسقة",
    badgeClass: "bg-primary text-white",
    time: "أمس",
    image: ADMIN_IMAGES.archive3,
  },
];
