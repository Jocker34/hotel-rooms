import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RoomsPage } from './pages/Rooms.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RoomsPage />,
  },
]);

export const Router = () => <RouterProvider router={router} />;
