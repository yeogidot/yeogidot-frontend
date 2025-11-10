import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './pages/MyTravelPage/MyTravelPage';

const router = createBrowserRouter([
  {
    path: '/mytravel',
    Component: MyTravelPage,
  },
  {
    path: '*',
    Component: () => <Navigate to="mytravel" replace={true} />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
