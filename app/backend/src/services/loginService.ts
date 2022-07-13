import * as bcrypt from 'bcryptjs';
import CustomError from '../utils/CustomError';
import { ILoginService, ILoginModel, LoginData, User } from '../protocols';

const loginErrorMessage = 'Incorrect email or password';

export default class LoginService implements ILoginService {
  constructor(private model: ILoginModel) {
    this.model = model;
  }

  async create(login: LoginData): Promise<User> {
    const { email, password } = login;
    const user = await this.model.create(email);
    const validPassword = bcrypt.compareSync(password, user.password as string);
    if (!validPassword) throw new CustomError(loginErrorMessage, 401);
    return user;
  }
}
