const BASE = "/assets/editor";

export const EDITOR_IMAGES = {
  navAvatar: `${BASE}/nav-avatar.jpg`,
  articleImage: `${BASE}/article-chart.jpg`,
} as const;

/** Fallback URLs until local assets are added */
export const EDITOR_IMAGE_FALLBACKS = {
  navAvatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAsXZX7ZeU3XvLToByaSvdq2_ODRPmqCDiS9tyjaKXZnaPKspJWNU4W3HT5dh2tgRGOCMVf3Z41Hd_C0-gpdxfWvHv7eWM8rQI0F_AYZ1VzqFwnYD4-lqNyyIEMxJZnMZ2oycAH8WLEmdmvFNJq7sg709QeuP4fPYWiukbJEQuWG5ZlGb8Htdiii5R0GgC4KWjz9n2nLpsDJhof6ycDkC4asycZ3CHxiA5562Sdg6TBfp5IMo5Gj_ylj6LhirmAx8rMWm4UR0qvR_W5",
  articleImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD8yS_B5HjTVs38yVqBdtChf-ilbjJaxGx2ePIy1kQVapFL5QYZScM_xo0mu__muDYtvPn4U2HPheV2Cx0vGHQP-3UNyovYUxuGuAMxVlAZE0_MMxM4VROxECAkVAEZLGy01E1QSjsenr2IPNiifl7X61XIQCyz-4-a0iPmkE6O7yndqpsHBS5iu7BWVYeXAfwZHQT_eIz_3Rop7KWHccJwYrp1-qTvc0nVIJCyNcVesnjuHLZqw_tXX-5c9fJxbhBC5NUJS6zmPo4c",
} as const;
