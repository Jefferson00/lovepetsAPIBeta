import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import LocationsController from '../controllers/LocationsController';


const locationsRouter = Router();

const locationsController = new LocationsController();

locationsRouter.post('/', ensureAuthenticated, locationsController.create);
locationsRouter.get('/', locationsController.index);

export default locationsRouter;