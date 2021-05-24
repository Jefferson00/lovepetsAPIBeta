import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

// Rota POST
usersRouter.post('/', async (request, response) => {
  const { name, email, password, phone } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
    phone,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;