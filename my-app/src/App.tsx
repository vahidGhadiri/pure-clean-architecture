import { RouterProvider } from "react-router-dom";
import { AppRoutes } from "@presentation";

export function App() {
  return <RouterProvider router={AppRoutes} />;
}
