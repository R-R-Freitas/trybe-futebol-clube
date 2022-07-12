import Users from '../database/models/UserModel';
import { User, ILoginModel } from '../protocols';

export default class Repository implements ILoginModel {
  constructor(private model = Users) {
    this.model = model;
  }

  async create(email: string): Promise<User> {
    const user = await this.model.findOne({ raw: true, where: { email } });
    return user as User;
  }
}
