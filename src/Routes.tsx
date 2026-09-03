import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './domains/travelList/pages/MyTravelPage/MyTravelPage';
import TravelPage from './domains/travel/pages/TravelPage/TravelPage';
import DayTravelPage from './domains/travel/pages/DayTravelPage/DayTravelPage';
import NewTravelHome from './domains/new/pages/NewTravelHome/NewTravelHome';
import EditTravelPage from './domains/edit/pages/EditTravelPage/EditTravelPage';
import TravelDiaryPage from './domains/travel/pages/TravelDiaryPage/TravelDiaryPage';
import TravelDiaryEditPage from './domains/travel/pages/TravelDiaryEditPage/TravelDiaryEditPage';
import TravelPhotoComment from './domains/travel/pages/TravelPhotoComment/TravelPhotoComment';
import NewTravelPage from './domains/new/pages/NewTravelPage/NewTravelPage';
import NewTravelPhotoPage from './domains/new/pages/NewTravelPhotoPage/NewTravelPhotoPage';
import EditTravelHome from './domains/edit/pages/EditTravelHome/EditTravelHome';
import SelectThumbnailPageForEdit from './domains/edit/pages/SelectThumbnailPageForEdit/SelectThumbnailPageForEdit';
import SignUpPage from './domains/auth/pages/SignUpPage/SignUpPage';
import LogInPage from './domains/auth/pages/LogInPage/LogInPage';
import SelectThumbnailPage from './domains/new/pages/SelectThumbnailPage/SelectThumbnailPage';
import SelectThumbnailPhotoPage from './domains/new/pages/SelectThumbnailPhotoPage/SelectThumbnailPhotoPage';
import MapPage from './domains/travel/pages/MapPage/MapPage';
import ErrorRoute from './components/ErrorPage/ErrorRoute';
import DeleteAccountPage from './domains/auth/pages/DeleteAccountPage/DeleteAccountPage';
import DeleteAccountCompletePage from './domains/auth/pages/DeleteAccountCompletePage/DeleteAccountCompletePage';
import ChangePasswordPage from './domains/auth/pages/ChangePasswordPage/ChangePasswordPage';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Transition } from './components/Transition/Transition';
import SettingPage from './domains/auth/pages/SettingPage/SettingPage';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Transition,
    children: [
      {
        path: '/signup',
        Component: SignUpPage,
      },
      {
        path: '/login',
        Component: LogInPage,
      },
      {
        path: '/error/:status',
        Component: ErrorRoute,
      },
      // ✅ 보호된 경로 그룹
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <Navigate to="/my-travel" replace={true} />,
          },
          {
            path: '/my-travel',
            Component: MyTravelPage,
          },
          {
            path: '/change-password',
            Component: ChangePasswordPage,
          },
          {
            path: '/delete-account',
            Component: DeleteAccountPage,
          },
          {
            path: '/delete-account/complete',
            Component: DeleteAccountCompletePage,
          },
          {
            path: '/setting',
            Component: SettingPage,
          },
          {
            path: '/map',
            Component: MapPage,
          },
          {
            path: '/select-thumbnail',
            Component: SelectThumbnailPage,
          },
          {
            path: '/new-travel',
            Component: NewTravelPage,
            children: [
              { index: true, Component: NewTravelHome },
              { path: 'photo', Component: NewTravelPhotoPage },
              {
                path: 'select-thumbnail',
                Component: SelectThumbnailPage,
              },
              {
                path: 'select-thumbnail/photo',
                Component: SelectThumbnailPhotoPage,
              },
            ],
          },
          {
            path: '/edit-travel',
            Component: EditTravelPage,
            children: [
              { index: true, Component: EditTravelHome },
              { path: 'photo', Component: NewTravelPhotoPage },
              {
                path: 'select-thumbnail',
                Component: SelectThumbnailPageForEdit,
              },
              {
                path: 'select-thumbnail/photo',
                Component: SelectThumbnailPhotoPage,
              },
            ],
          },
          {
            path: '/travel/:travelId',
            Component: TravelPage,
          },
          {
            path: '/travel/:travelId/:day',
            Component: DayTravelPage,
          },
          {
            path: '/travel/:travelId/:day/travel-diary-page',
            Component: TravelDiaryPage,
          },
          {
            path: '/travel/:travelId/:day/travel-diary-edit-page',
            Component: TravelDiaryEditPage,
          },
          {
            path: '/travel/:travelId/photos/:photoId/travel-photo-comment',
            Component: TravelPhotoComment,
          },
        ],
      },
      // ✅ 공유 전용 경로 (비로그인 접근 가능)
      {
        path: '/share/:shareToken',
        children: [
          {
            index: true,
            async lazy() {
              const { default: SharedTravelPage } = await import(
                './domains/travel/pages/shared/SharedTravelPage/SharedTravelPage'
              );
              return { Component: SharedTravelPage };
            },
          },
          {
            path: ':day',
            async lazy() {
              const { default: SharedDayTravelPage } = await import(
                './domains/travel/pages/shared/SharedDayTravelPage/SharedDayTravelPage'
              );
              return { Component: SharedDayTravelPage };
            },
          },
          {
            path: 'photos/:photoId/comment',
            async lazy() {
              const { default: SharedTravelPhotoComment } = await import(
                './domains/travel/pages/shared/SharedTravelPhotoComment/SharedTravelPhotoComment'
              );
              return { Component: SharedTravelPhotoComment };
            },
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/my-travel" replace={true} />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
