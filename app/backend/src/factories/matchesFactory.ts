import MatchesController from '../controllers/matchesController';
import MatchesService from '../services/matchesService';
import MatchesRepository from '../repository/matchesRepository';

const matchesFactory = () => {
  const matchesRepository = new MatchesRepository();
  const matchesService = new MatchesService(matchesRepository);
  const matchesController = new MatchesController(matchesService);

  return matchesController;
};

export default matchesFactory;
