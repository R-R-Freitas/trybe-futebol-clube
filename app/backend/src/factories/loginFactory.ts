import LoginController from '../controllers/loginController';
import LoginService from '../services/loginService';
import LoginRepository from '../repository/loginRepository';

const loginFactory = () => {
  const loginRepository = new LoginRepository();
  const loginService = new LoginService(loginRepository);
  const loginController = new LoginController(loginService);

  return loginController;
};

export default loginFactory;
