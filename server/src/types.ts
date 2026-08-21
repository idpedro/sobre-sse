export type Method = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "QUERY";
export type RoutePath = `/${string}`;
export type RouteId = `${Method}:${RoutePath}`;
