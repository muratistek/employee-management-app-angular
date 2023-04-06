export type Employee = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  salary: number;
}

export type User = {
  id: string;
  email: string;
  username: string;
  password: string;
}

export type Query = {
  getEmployees: Employee[];
  getEmployeeById(id: string): Employee;
  login(email_username: string, password: string): User;
}

export type Mutation = {
  addEmployee(first_name: string, last_name: string, email: string, gender: string, salary: number): Employee;
  updateEmployee(id: string, first_name: string, last_name: string, email: string, gender: string, salary: number): Employee;
  deleteEmployee(id: string): Employee;
  signup(username: string, email: string, password: string): User;
}