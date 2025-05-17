export type UserRole = "Admin" | "Employee" | "";

export interface Task {
  _id: string;
  title: string;
  description: string;
  date: string; // Maps to createdAt
  active: boolean; // status: Accepted
  newTask: boolean; // status: New
  completed: boolean; // status: Completed
  failed: boolean; // status: Failed
  assignedTo?: { _id: string; fullName: string };
  createdBy: string;
}

export interface Employee {
  id: number;
  _id: string;
  email: string;
  password: string;
  fullName: string;
}

export interface Admin {
  id: number;
  _id: string;
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthContextType {
  empData: Employee[];
  adminData: Admin[];
  user: UserRole;
  setUser: React.Dispatch<React.SetStateAction<UserRole>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export interface EmployeeDashboardProps {
  data: Employee | null;
}

export type EmployeeRouteParams = {
  fullName: string;
};
