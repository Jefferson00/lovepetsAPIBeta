import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import LocationsController from '../controllers/LocationsController';


const locationsRouter = Router();

const locationsController = new LocationsController();

locationsRouter.use(ensureAuthenticated);

locationsRouter.post('/', locationsController.create);

export default locationsRouter;