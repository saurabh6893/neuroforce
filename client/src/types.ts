// types.ts
export type Task = {
  title: string;
  description: string;
  date: string;
  active: boolean;
  newTask: boolean;
  completed: boolean;
  failed: boolean;
};

export type Employee = {
  id: number;
  email: string;
  password: string;
  fullName: string;
  tasks: Task[];
};

export type Admin = {
  id: number;
  email: string;
  password: string;
  fullName?: string;
};

export type AuthContextType = {
  empData: Employee[];
  adminData: Admin[];
  user?: UserRole;
  setUser?: React.Dispatch<React.SetStateAction<UserRole>>;
};

export type EmployeeRouteParams = {
  fullName: string;
};

export interface EmployeeDashboardProps {
  data: Employee | Admin | null;
}

export type UserRole = "Admin" | "Employee" | "";
