import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("clients", "routes/clients/index.tsx", [
    route("new", "routes/clients/new.tsx"),
    route(":clientId", "routes/clients/$clientId.tsx"),
  ]),
  route("dashboard", "routes/dashboard.tsx"),
  route("services", "routes/services/index.tsx", [
    route("new", "routes/services/new.tsx"),
    route(":serviceId", "routes/services/$serviceId.tsx"),
  ]),
  route("appointments", "routes/appointments/index.tsx", [
    route("new", "routes/appointments/new.tsx"),
    route(":appointmentId", "routes/appointments/$appointmentId.tsx"),
  ]),
  route("logout", "routes/logout.tsx"),
  route("products", "routes/products/index.tsx", [
    route("new", "routes/products/new.tsx"),
    route(":productId", "routes/products/$productId.tsx"),
  ]),
] satisfies RouteConfig;
