/**
 * core/constants/routes.ts
 * Single source of truth for all application route paths.
 * Import these constants everywhere instead of using raw strings.
 */

export const WEBSITE_ROUTES = {
  HOME: "/",
  REPORTS: "/reports",
  REPORTS_INVESTIGATIVE: "/reports/investigative",
  REPORTS_HUMANITARIAN: "/reports/humanitarian",
  REPORTS_SOCIAL: "/reports/social",
  REPORTS_ECONOMIC: "/reports/economic",
  REPORTS_ENVIRONMENTAL: "/reports/environmental",
  STORIES: "/stories",
  STORIES_HUMANITARIAN: "/stories/humanitarian",
  STORIES_JOURNALISTIC: "/stories/journalistic",
  STORIES_SUCCESS: "/stories/success",
  STORIES_COMMUNITY: "/stories/community",
  STORIES_WOMEN: "/stories/women",
  STORIES_CHILDREN: "/stories/children",
  STORIES_YOUTH: "/stories/youth",
  VISUALS: "/visuals",
  VISUALS_VIDEO: "/visuals/video",
  VISUALS_VISUAL_REPORTS: "/visuals/visual-reports",
  VISUALS_SHORT_FILMS: "/visuals/short-films",
  VISUALS_ILLUSTRATED_STORIES: "/visuals/illustrated-stories",
  VISUALS_INTERVIEWS: "/visuals/interviews",
  PODCASTS: "/podcasts",
  VERIFICATION: "/verification",
  VERIFICATION_NEWS: "/verification/news",
  VERIFICATION_IMAGE: "/verification/image",
  VERIFICATION_VIDEO: "/verification/video",
  VERIFICATION_DISINFORMATION: "/verification/disinformation",
  VERIFICATION_ARCHIVE: "/verification/archive",
  MEDIA_LITERACY: "/media-literacy",
  MEDIA_TERMINOLOGY: "/media-terminology",
  VERIFIED_NEWS: "/verified-news",
  verifiedNewsDetail: (slug: string) => `/verified-news/${slug}` as const,
  MY_SPACE: "/my-space",
  EDITOR_SPACE: "/editor-space",
  EDITOR_DISINFORMATION_ARCHIVE: "/editor-space/disinformation-archive",
} as const;

export const ADMIN_ROUTES = {
  ROOT: "/admin",
  DASHBOARD: "/admin/dashboard",
  USERS: "/admin/users",
  REPORTS: "/admin/reports",
  STORIES: "/admin/stories",
  PODCASTS: "/admin/podcasts",
  VERIFICATION_REQUESTS: "/admin/verification-requests",
  MEDIA_LIBRARY: "/admin/media-library",
  CATEGORIES: "/admin/categories",
  SETTINGS: "/admin/settings",
} as const;

export type WebsiteRoute = (typeof WEBSITE_ROUTES)[keyof typeof WEBSITE_ROUTES];
export type AdminRoute = (typeof ADMIN_ROUTES)[keyof typeof ADMIN_ROUTES];
