import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './pages/MyTravelPage/MyTravelPage';
import TravelPage from './pages/TravelPage/TravelPage';
import DayTravelPage from './pages/DayTravelPage/DayTravelPage';
import NewTravelHome from './pages/NewTravelHome/NewTravelHome';
import EditTravelPage from './pages/EditTravelPage/EditTravelPage';
import TravelDiaryPage from './pages/TravelDiaryPage/TravelDiaryPage';
import TravelDiaryEditPage from './pages/TravelDiaryEditPage/TravelDiaryEditPage';
import TravelPhotoComment from './pages/TravelPhotoComment/TravelPhotoComment';
import NewTravelPage from './pages/NewTravelPage/NewTravelPage';
import NewTravelPhotoPage from './pages/NewTravelPhotoPage/NewTravelPhotoPage';
import EditTravelHome from './pages/EditTravelHome/EditTravelHome';
import SelectThumbnailPageForEdit from './pages/SelectThumbnailPageForEdit/SelectThumbnailPageForEdit';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import LogInPage from './pages/LogInPage/LogInPage';
import SelectThumbnailPage from './pages/SelectThumbnailPage/SelectThumbnailPage';
import SelectThumbnailPhotoPage from './pages/SelectThumbnailPhotoPage/SelectThumbnailPhotoPage';
import MapPage from './pages/MapPage/MapPage';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { Transition } from './pages/Transition/Transition';

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
                './pages/SharedTravelPage/SharedTravelPage'
              );
              return { Component: SharedTravelPage };
            },
          },
          {
            path: ':day',
            async lazy() {
              const { default: SharedDayTravelPage } = await import(
                './pages/SharedDayTravelPage/SharedDayTravelPage'
              );
              return { Component: SharedDayTravelPage };
            },
          },
          {
            path: 'photos/:photoId/comment',
            async lazy() {
              const { default: SharedTravelPhotoComment } = await import(
                './pages/SharedTravelPhotoComment/SharedTravelPhotoComment'
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
