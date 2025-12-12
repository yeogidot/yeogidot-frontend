import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';
import MyTravelPage from './pages/MyTravelPage/MyTravelPage';
import NewTravelPage from './pages/NewTravelPage/NewTravelPage';

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
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
