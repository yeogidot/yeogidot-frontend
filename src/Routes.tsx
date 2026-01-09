import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './pages/MyTravelPage/MyTravelPage';
import TravelPage from './pages/TravelPage/TravelPage';
import DayTravelPage from './pages/DayTravelPage/DayTravelPage';
import WriteTravelDiaryPage from './pages/WriteTravelDiaryPage/WriteTravelDiaryPage';
import EditTravelDiaryPage from './pages/EditTravelDiaryPage/EditTravelDiaryPage';
import WriteTravelPhotoComment from './pages/WriteTravelPhotoComment/WriteTravelPhotoComment';
import NewTravelHome from './pages/NewTravelHome/NewTravelHome';
import NewTravelPage from './pages/NewTravelPage/NewTravelPage';
import FullPhotoPage from './pages/FullPhotoPage/FullPhotoPage';

const router = createBrowserRouter([
  {
    path: '/my-travel',
    Component: MyTravelPage,
  },
  {
    path: '/new-travel',
    Component: NewTravelPage,
    children: [
      { index: true, Component: NewTravelHome },
      { path: 'photo', Component: FullPhotoPage },
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
    path: '/travel/:travelId/:day/writeTravelDiaryPage',
    Component: WriteTravelDiaryPage,
  },
  {
    path: '/travel/:travelId/:day/EditTravelDiaryPage',
    Component: EditTravelDiaryPage,
  },
  {
    path: '/photos/:photoId/WriteTravelPhotoComment',
    Component: WriteTravelPhotoComment,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
