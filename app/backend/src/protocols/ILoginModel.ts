import User from './User';

export default interface ILoginModel {
  create(email: string): Promise<User>;
}
