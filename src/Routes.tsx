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
import TravelPhotoComment from './pages/TravelPhotoComment/TravelPhotoComment';
import NewTravelPage from './pages/NewTravelPage/NewTravelPage';
import NewTravelPhotoPage from './pages/NewTravelPhotoPage/NewTravelPhotoPage';
import EditTravelHome from './pages/EditTravelHome /EditTravelHome';
import SelectThumbnailPage from './pages/SelectThumbnailPage/SelectThumbnailPage';
import SelectThumbnailPageForEdit from './pages/SelectThumbnailPageForEdit/SelectThumbnailPageForEdit';

import SelectThumbnailPhotoPage from './pages/SelectThumbnailPhotoPage/SelectThumbnailPhotoPage';

const router = createBrowserRouter([
  {
    path: `/select-thumbnail`,
    Component: SelectThumbnailPage,
  },
  {
    path: '/my-travel',
    Component: MyTravelPage,
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
      { path: 'select-thumbnail/photo', Component: SelectThumbnailPhotoPage },
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
    path: '*',
    Component: () => <Navigate to="/my-travel" replace={true} />,
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
    path: '/photos/:photoId/travel-photo-comment',
    Component: TravelPhotoComment,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
