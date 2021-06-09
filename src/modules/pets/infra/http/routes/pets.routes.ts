import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PetsController from '../controllers/PetsController';


const petsRouter = Router();

const petsController = new PetsController();


petsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().allow(''),
            species: Joi.string().required(),
            age: Joi.string().required(),
            description: Joi.string().required(),
            gender: Joi.string().required(),
            is_adopt: Joi.boolean().required(),
            location_lat: Joi.string().required(),
            location_lon: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
        }
    }),
    ensureAuthenticated, 
    petsController.create
);


petsRouter.get('/', petsController.index);

export default petsRouter;