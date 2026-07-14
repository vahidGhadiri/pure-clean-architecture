import { createBrowserRouter } from 'react-router-dom';

import DashboardPage from './pages/main';

export const router = createBrowserRouter([
    {
        element: <DashboardPage />,
        path: '/',
    },
]);
