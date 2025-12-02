import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './pages/MyTravelPage/MyTravelPage';
import TravelPage from './pages/TravelPage/TravelPage';
import DayTravelPage from './pages/DayTravelPage/DayTravelPage';

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
    path: '/daytravel',
    Component: DayTravelPage,
  },
  {
    path: '/travel',
    Component: TravelPage,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
