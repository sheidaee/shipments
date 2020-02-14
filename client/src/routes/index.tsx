import HomePage from '../features/shipments/components/HomePage'
import { AppRoute } from "./types";

const routes: AppRoute[] = [
  {
    path: "/",
    component: HomePage,
    exact: true
  }
];

export default routes;
