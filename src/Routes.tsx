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

const router = createBrowserRouter([
  {
    path: '/mytravel',
    Component: MyTravelPage,
  },
  {
    path: '*',
    Component: () => <Navigate to="mytravel" replace={true} />,
  },
  {
    path: 'travel/1',
    Component: TravelPage,
  },
  {
    path: 'travel/1/1',
    Component: DayTravelPage,
  },
  {
    path: 'travel/1/1/writeTravelDiaryPage',
    Component: WriteTravelDiaryPage,
  },
  {
    path: 'travel/1/1/EditTravelDiaryPage',
    Component: EditTravelDiaryPage,
  },
  {
    path: 'travel/1/1/photos/1/WriteTravelPhotoComment',
    Component: WriteTravelPhotoComment,
  }
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
