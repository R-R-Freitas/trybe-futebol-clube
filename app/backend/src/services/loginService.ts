import * as bcrypt from 'bcryptjs';

import { ILoginService, ILoginModel, LoginData, User } from '../protocols';

const loginErrorMessage = 'O endereço de e-mail ou a senha não estão corretos.';

export default class LoginService implements ILoginService {
  constructor(private model: ILoginModel) {
    this.model = model;
  }

  async create(login: LoginData): Promise<User> {
    const { email, password } = login;
    const user = await this.model.create(email);
    const hash = bcrypt.compareSync(password, user.password as string);
    if (!hash) throw new Error(loginErrorMessage);
    return user;
  }
}
