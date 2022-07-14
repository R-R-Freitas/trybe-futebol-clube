import TeamsController from '../controllers/teamsController';
import TeamsService from '../services/teamsService';
import TeamsRepository from '../repository/teamsRepository';

const teamsFactory = () => {
  const teamsRepository = new TeamsRepository();
  const teamsService = new TeamsService(teamsRepository);
  const teamsController = new TeamsController(teamsService);

  return teamsController;
};

export default teamsFactory;
