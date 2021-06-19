import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FavUserPetsController from '../controllers/FavUserPetsController';


const favsRoutes = Router();

const favsController = new FavUserPetsController();


favsRoutes.post('/',
    ensureAuthenticated, 
    favsController.create
);

export default favsRoutes;