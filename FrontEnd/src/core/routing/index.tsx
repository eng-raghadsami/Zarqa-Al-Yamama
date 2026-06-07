import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
const WebsiteLayout = React.lazy(
  () => import("@website/layouts/WebsiteLayout"),
);
const AuthenticatedLayout = React.lazy(
  () => import("@website/layouts/AuthenticatedLayout"),
);
const Home = React.lazy(() => import("@website/pages/Home"));
const InvestigativeReports = React.lazy(
  () => import("@website/pages/InvestigativeReports"),
);
const HumanitarianStories = React.lazy(
  () => import("@website/pages/HumanitarianStories"),
);
const StoriesLayout = React.lazy(
  () => import("@website/layouts/StoriesLayout"),
);
const VisualsLayout = React.lazy(
  () => import("@website/layouts/VisualsLayout"),
);
const Visuals = React.lazy(() => import("@website/pages/Visuals"));
const PodcastsLayout = React.lazy(
  () => import("@website/layouts/PodcastsLayout"),
);
const Podcasts = React.lazy(() => import("@website/pages/Podcasts"));
const MediaVerificationWizard = React.lazy(
  () => import("@website/pages/MediaVerificationWizard"),
);
const MediaLiteracyLayout = React.lazy(
  () => import("@website/layouts/MediaLiteracyLayout"),
);
const MediaLiteracy = React.lazy(() => import("@website/pages/MediaLiteracy"));
const MediaTerminologyLayout = React.lazy(
  () => import("@website/layouts/MediaTerminologyLayout"),
);
const MediaTerminology = React.lazy(
  () => import("@website/pages/MediaTerminology"),
);
const VerifiedNewsLayout = React.lazy(
  () => import("@website/layouts/VerifiedNewsLayout"),
);
const VerifiedNews = React.lazy(() => import("@website/pages/VerifiedNews"));
const VerifiedNewsDetail = React.lazy(
  () => import("@website/pages/VerifiedNewsDetail"),
);
const MySpaceLayout = React.lazy(
  () => import("@website/layouts/MySpaceLayout"),
);
const MySpace = React.lazy(() => import("@website/pages/MySpace"));
const EditorLayout = React.lazy(
  () => import("@website/layouts/EditorLayout"),
);
const EditorContentReview = React.lazy(
  () => import("@website/pages/EditorContentReview"),
);
const DisinformationArchive = React.lazy(
  () => import("@website/pages/DisinformationArchive"),
);
const AdminLayout = React.lazy(() => import("@admin/layouts/AdminLayout"));
const AdminDashboard = React.lazy(() => import("@admin/pages/Dashboard"));
const NotFound = React.lazy(() => import("@shared/components/NotFound"));

const Suspense = ({ children }: { children: React.ReactNode }) => (
  <React.Suspense fallback={<div className="p-8">جارٍ التحميل...</div>}>
    {children}
  </React.Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <WebsiteLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/reports",
    element: (
      <Suspense>
        <AuthenticatedLayout />
      </Suspense>
    ),
    children: [
      {
        path: "investigative",
        element: (
          <Suspense>
            <InvestigativeReports />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/stories",
    element: (
      <Suspense>
        <StoriesLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="humanitarian" replace />,
      },
      {
        path: "humanitarian",
        element: (
          <Suspense>
            <HumanitarianStories />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/visuals",
    element: (
      <Suspense>
        <VisualsLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Visuals />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/podcasts",
    element: (
      <Suspense>
        <PodcastsLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Podcasts />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/verification",
    element: (
      <Suspense>
        <AuthenticatedLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="image" replace />,
      },
      {
        path: "image",
        element: (
          <Suspense>
            <MediaVerificationWizard mediaType="image" />
          </Suspense>
        ),
      },
      {
        path: "video",
        element: (
          <Suspense>
            <MediaVerificationWizard mediaType="video" />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/media-literacy",
    element: (
      <Suspense>
        <MediaLiteracyLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <MediaLiteracy />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/media-terminology",
    element: (
      <Suspense>
        <MediaTerminologyLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <MediaTerminology />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/verified-news",
    element: (
      <Suspense>
        <VerifiedNewsLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <VerifiedNews />
          </Suspense>
        ),
      },
      {
        path: ":slug",
        element: (
          <Suspense>
            <VerifiedNewsDetail />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/my-space",
    element: (
      <Suspense>
        <MySpaceLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <MySpace />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/editor-space",
    element: (
      <Suspense>
        <EditorLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <EditorContentReview />
          </Suspense>
        ),
      },
      {
        path: "disinformation-archive",
        element: (
          <Suspense>
            <DisinformationArchive />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <AdminDashboard />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <Suspense>
        <NotFound />
      </Suspense>
    ),
  },
]);
