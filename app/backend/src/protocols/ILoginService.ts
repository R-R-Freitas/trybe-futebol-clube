import User, { LoginData } from './User';

export default interface ILoginService {
  create(loginData: LoginData): Promise<User>;
}
