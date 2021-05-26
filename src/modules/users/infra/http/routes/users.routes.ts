import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();


// Rota POST
usersRouter.post('/', usersController.create);

export default usersRouter;