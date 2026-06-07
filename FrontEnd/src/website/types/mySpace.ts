import { MY_SPACE_IMAGES } from "@website/constants/mySpaceImages";

export type VerificationStatus = "in_progress" | "completed";

export type VerificationRequest = {
  id: string;
  trackingCode: string;
  title: string;
  status: VerificationStatus;
  submittedAt: string;
  progress?: number;
  accuracy?: string;
  completedAt?: string;
  timeline: {
    label: string;
    sublabel: string;
    state: "done" | "active" | "pending";
    icon: string;
  }[];
};

export type LibraryItemType = "report" | "podcast" | "all";

export type LibraryItem = {
  id: string;
  type: Exclude<LibraryItemType, "all">;
  title: string;
  meta: string;
  category: string;
  image: string;
  actionLabel: string;
  actionIcon: string;
  badge: string;
  badgeClass: string;
};

export type LearningCourse = {
  id: string;
  title: string;
  progress: number;
  detail: string;
  variant: "circular" | "linear";
};

export type ActivityItem = {
  id: string;
  title: string;
  time: string;
  icon: string;
  filled?: boolean;
};

export const MY_SPACE_USER = {
  name: "أحمد",
  role: "محلل نزاهة إعلامية",
  memberSince: "عضو منذ 8 أشهر",
};

export const MY_SPACE_STATS = [
  { value: "5", numericValue: 5, label: "طلبات تحقق" },
  { value: "12", numericValue: 12, label: "قصص محفوظة" },
  { value: "3", numericValue: 3, label: "دورات منجزة" },
];

export const MY_SPACE_ALERTS = [
  "تنبيه: محاولة تضليل واسعة النطاق مكتشفة الآن في قطاع الطاقة",
  "تحديث: تم الانتهاء من فحص ملفك رقم ZY-8842 بنسبة دقة 98%",
];

export const VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: "1",
    trackingCode: "ZY-8842",
    title: "تقرير: تحليل التلاعب بالصور في تغطية الحدود",
    status: "in_progress",
    submittedAt: "منذ 3 أيام",
    progress: 66,
    timeline: [
      {
        label: "تم الاستلام",
        sublabel: "14 أكتوبر",
        state: "done",
        icon: "check",
      },
      {
        label: "فحص الأداة",
        sublabel: "قيد المعالجة",
        state: "active",
        icon: "biotech",
      },
      {
        label: "التقرير النهائي",
        sublabel: "متوقع قريباً",
        state: "pending",
        icon: "description",
      },
    ],
  },
  {
    id: "2",
    trackingCode: "ZY-8710",
    title: "مقطع فيديو: خطاب متداول في العاصمة",
    status: "completed",
    submittedAt: "10 أكتوبر",
    accuracy: "94%",
    completedAt: "10 أكتوبر",
    timeline: [],
  },
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: "1",
    type: "report",
    title: "خوارزميات التضليل: كيف يتم توجيه الرأي العام",
    meta: "12 دقيقة قراءة",
    category: "أرشيف التضليل",
    image: MY_SPACE_IMAGES.libraryReport,
    actionLabel: "قراءة التقرير",
    actionIcon: "auto_stories",
    badge: "تقرير محقق",
    badgeClass: "bg-gold-metallic-start/90",
  },
  {
    id: "2",
    type: "podcast",
    title: "حوار مع الحقيقة: الموسم الثاني، الحلقة 04",
    meta: "45 دقيقة",
    category: "صوتيات النزاهة",
    image: MY_SPACE_IMAGES.libraryPodcast,
    actionLabel: "استماع للحلقة",
    actionIcon: "play_arrow",
    badge: "بودكاست",
    badgeClass: "bg-primary/90",
  },
];

export const LEARNING_COURSES: LearningCourse[] = [
  {
    id: "1",
    title: "أساسيات كشف التزييف العميق",
    progress: 75,
    detail: "تبقت 3 دروس للإتمام",
    variant: "circular",
  },
  {
    id: "2",
    title: "أخلاقيات الصحافة الرقمية",
    progress: 20,
    detail: "",
    variant: "linear",
  },
];

export const ACTIVITY_FEED: ActivityItem[] = [
  {
    id: "1",
    title: 'حصلت على شارة "المحقق الصاعد"',
    time: "منذ ساعتين • إنجاز جديد",
    icon: "military_tech",
    filled: true,
  },
  {
    id: "2",
    title: 'حفظت تقرير "خوارزميات التضليل"',
    time: "يوم أمس • المكتبة الخاصة",
    icon: "bookmark",
  },
  {
    id: "3",
    title: "أرسلت ملفاً جديداً للتحقق",
    time: "قبل يومين • طلب رقم #ZY-8842",
    icon: "cloud_upload",
  },
];

export const LIBRARY_FILTERS: { id: LibraryItemType; label: string }[] = [
  { id: "all", label: "الكل" },
  { id: "report", label: "تقارير" },
  { id: "podcast", label: "بودكاست" },
];
