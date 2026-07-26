import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

import Layout from './pages/layout';

const HomePage = lazy(() => import('./pages/main'));
const ArchitecturePage = lazy(() => import('./pages/architecture'));
const ExamplePage = lazy(() => import('./pages/example'));
const ContactPage = lazy(() => import('./pages/contact'));

export const getMainRoutes = (): RouteObject[] => [
    {
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/architecture', element: <ArchitecturePage /> },
            { path: '/example', element: <ExamplePage /> },
            { path: '/contact', element: <ContactPage /> },
        ],
    },
];
