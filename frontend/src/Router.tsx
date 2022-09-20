import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import CustomSuspense from '@/@components/@shared/CustomSuspense';
import Loading from '@/@components/@shared/Loading';
import OnlyNumberDynamicRouting from '@/@components/@shared/OnlyNumberDynamicRouting';
import { CouponListPageFallback } from '@/@pages/coupon-list';

import { useFetchMe } from './@hooks/@queries/user';

const NotFoundPage = lazy(() => import('@/@pages/404'));
const CouponListPage = lazy(() => import('@/@pages/coupon-list'));
const CouponCreatePage = lazy(() => import('@/@pages/coupon-list/create'));
const UserHistoryPage = lazy(() => import('@/@pages/history'));
const JoinPage = lazy(() => import('@/@pages/join'));
const LandingPage = lazy(() => import('@/@pages/landing'));
const MainPage = lazy(() => import('@/@pages/main'));
const ProfilePage = lazy(() => import('@/@pages/profile'));
const CouponDetailPage = lazy(() => import('@/@pages/coupon-list/coupon-detail'));
const CouponAcceptPage = lazy(() => import('@/@pages/coupon-list/coupon-detail/accept'));
const CouponDeclinePage = lazy(() => import('@/@pages/coupon-list/coupon-detail/decline'));
const CouponRequestPage = lazy(() => import('@/@pages/coupon-list/coupon-detail/request'));
const DownloadPage = lazy(() => import('@/@pages/download'));
const LoginPage = lazy(() => import('@/@pages/login'));
const ProfileEditPage = lazy(() => import('@/@pages/profile/edit'));
const Redirect = lazy(() => import('@/@pages/redirect'));

export const PATH = {
  MAIN: '/',
  LANDING: '/landing',
  COUPON_LIST: '/coupon-list',
  SENT_COUPON_LIST: '/coupon-list/sent',
  RECEIVED_COUPON_LIST: '/coupon-list/received',
  COUPON_CREATE: '/coupon-list/create',
  LOGIN: '/login',
  LOGIN_REDIRECT: '/login/redirect',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  NOT_FOUND: '/*',
  USER_HISTORY: '/history',
  DOWNLOAD_REDIRECT: '/download/redirect',
  DOWNLOAD: '/download',
  COUPON_DETAIL: '/coupon-list/:couponId',
  COUPON_REQUEST: '/coupon-list/:couponId/request',
  COUPON_ACCEPT: '/coupon-list/:couponId/accept',
  COUPON_DECLINE: '/coupon-list/:couponId/decline',
  ERROR: '/error',
};

export const DYNAMIC_PATH = {
  COUPON_DETAIL(id: number | string): string {
    return `${PATH.COUPON_LIST}/${id}`;
  },
  COUPON_REQUEST(id: number | string): string {
    return `${PATH.COUPON_LIST}/${id}/request`;
  },
  COUPON_ACCEPT(id: number | string): string {
    return `${PATH.COUPON_LIST}/${id}/accept`;
  },
  COUPON_DECLINE(id: number | string): string {
    return `${PATH.COUPON_LIST}/${id}/decline`;
  },
};

const Router = () => {
  return (
    <Routes>
      <Route path={PATH.LANDING} element={<LandingPage />} />
      <Route element={<PublicRoute />}>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.SIGNUP} element={<JoinPage />} />
        <Route path={PATH.LOGIN_REDIRECT} element={<Redirect />} />
        <Route path={PATH.DOWNLOAD} element={<DownloadPage />} />
        <Route path={PATH.DOWNLOAD_REDIRECT} element={<Redirect />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path={PATH.MAIN}
          element={
            <Suspense fallback={<Loading />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path={PATH.SENT_COUPON_LIST}
          element={
            <Suspense fallback={<CouponListPageFallback />}>
              <CouponListPage />
            </Suspense>
          }
        />
        <Route
          path={PATH.RECEIVED_COUPON_LIST}
          element={
            <Suspense fallback={<CouponListPageFallback />}>
              <CouponListPage />
            </Suspense>
          }
        />
        <Route
          path={PATH.COUPON_CREATE}
          element={
            <Suspense fallback={<Loading />}>
              <CouponCreatePage />
            </Suspense>
          }
        />
        {/* @TODO: Skeleton */}
        <Route
          path={PATH.COUPON_DETAIL}
          element={
            <Suspense fallback={<Loading />}>
              <OnlyNumberDynamicRouting>
                <CouponDetailPage />
              </OnlyNumberDynamicRouting>
            </Suspense>
          }
        />
        <Route
          path={PATH.COUPON_REQUEST}
          element={
            <Suspense fallback={<Loading />}>
              <OnlyNumberDynamicRouting>
                <CouponRequestPage />
              </OnlyNumberDynamicRouting>
            </Suspense>
          }
        />
        <Route
          path={PATH.COUPON_ACCEPT}
          element={
            <Suspense fallback={<Loading />}>
              <OnlyNumberDynamicRouting>
                <CouponAcceptPage />
              </OnlyNumberDynamicRouting>
            </Suspense>
          }
        />
        <Route
          path={PATH.COUPON_DECLINE}
          element={
            <Suspense fallback={<Loading />}>
              <OnlyNumberDynamicRouting>
                <CouponDeclinePage />
              </OnlyNumberDynamicRouting>
            </Suspense>
          }
        />
        <Route path={PATH.PROFILE} element={<ProfilePage />} />
        <Route path={PATH.PROFILE_EDIT} element={<ProfileEditPage />} />
        <Route
          path={PATH.USER_HISTORY}
          element={
            <Suspense fallback={<Loading />}>
              <UserHistoryPage />
            </Suspense>
          }
        />
      </Route>
      <Route path={PATH.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;

const PrivateRoute = () => {
  const { me, isLoading } = useFetchMe();

  return me ? (
    <Outlet />
  ) : (
    <CustomSuspense isLoading={isLoading} fallback={<Loading />}>
      <Navigate to={PATH.LOGIN} replace />
    </CustomSuspense>
  );
};

const PublicRoute = () => {
  const { me, isLoading } = useFetchMe();

  return me ? (
    <CustomSuspense isLoading={isLoading} fallback={<Loading />}>
      <Navigate to={PATH.MAIN} replace />
    </CustomSuspense>
  ) : (
    <Outlet />
  );
};
