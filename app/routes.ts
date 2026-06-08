import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("activities", "routes/activities.tsx"),
  route("activities/:slug", "routes/activity.tsx"),
] satisfies RouteConfig;
