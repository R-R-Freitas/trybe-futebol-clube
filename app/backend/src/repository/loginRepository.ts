import Users from '../database/models/UserModel';
import { User, ILoginModel } from '../protocols';
import CustomError from '../utils/CustomError';

const loginErrorMessage = 'Incorrect email or password';

export default class Repository implements ILoginModel {
  constructor(private model = Users) {
    this.model = model;
  }

  async create(email: string): Promise<User> {
    const user = await this.model.findOne({ raw: true, where: { email } });
    if (!user) throw new CustomError(loginErrorMessage, 401);
    return user as User;
  }
}
