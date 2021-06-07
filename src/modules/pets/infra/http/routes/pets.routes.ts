import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import PetsController from '../controllers/PetsController';


const petsRouter = Router();

const petsController = new PetsController();

petsRouter.use(ensureAuthenticated);

petsRouter.post('/', petsController.create);

export default petsRouter;