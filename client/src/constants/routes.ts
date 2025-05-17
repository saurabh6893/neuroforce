export const ROUTES = {
  LOGIN: "/login",
  ADMIN_HOME: "/admin/home",
  EMPLOYEE_HOME: (fullName: string) =>
    `/employee/${fullName.replace(/\s+/g, "-")}/home`,
  NOT_FOUND: "*",
} as const;
