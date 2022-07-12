export default interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password?: string;
}

export interface LoginData {
  email: string,
  password: string,
}
