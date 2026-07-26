import { createBrowserRouter } from 'react-router-dom';

import { getMainRoutes } from './main/routes';

export const AppRoutes = createBrowserRouter([...getMainRoutes()]);
