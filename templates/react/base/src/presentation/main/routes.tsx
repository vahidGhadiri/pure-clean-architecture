import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const ContactPage = lazy(() => import('./pages/contact'));
const DocumentPage = lazy(() => import('./pages/document'));
const MainPage = lazy(() => import('./pages/main'));

export const getBookingRoutes = (): RouteObject[] => [
    {
        children: [
            {
                children: [
                    { path: './main/document', element: <DocumentPage /> },
                    { path: './main/contact', element: <ContactPage /> },
                    { path: './', element: <MainPage /> },
                ],
            },
        ],
    },
];

export default getBookingRoutes;
