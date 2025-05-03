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
  firstName: string;
  tasks: Task[];
};

export type Admin = {
  id: number;
  email: string;
  password: string;
};

export type AuthContextType = {
  empData: Employee[];
  adminData: Admin[];
};

export interface EmployeeDashboardProps {
  data: Employee | null;
}

export type UserRole = "Admin" | "Employee" | "";
