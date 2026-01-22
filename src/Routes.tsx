import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './pages/MyTravelPage/MyTravelPage';
import TravelPage from './pages/TravelPage/TravelPage';
import DayTravelPage from './pages/DayTravelPage/DayTravelPage';
import TravelDiaryPage from './pages/TravelDiaryPage/TravelDiaryPage';
import TravelPhotoComment from './pages/TravelPhotoComment/TravelPhotoComment';
import NewTravelPage from './pages/NewTravelPage/NewTravelPage';
import LogInPage from './pages/LogInPage/LogInPage';


const router = createBrowserRouter([
  {
    path: '/my-travel',
    Component: MyTravelPage,
  },
  {
    path: '/new-travel',
    Component: NewTravelPage,
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
  {
    path: '/login',
    Component: LogInPage,
  }
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
