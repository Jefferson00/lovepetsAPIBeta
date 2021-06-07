import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import petsRouter from '@modules/pets/infra/http/routes/pets.routes';
import locationsRouter from '@modules/pets/infra/http/routes/locations.routes';
import imagesRouter from '@modules/pets/infra/http/routes/images.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/pets', petsRouter);
routes.use('/locations', locationsRouter);
routes.use('/images', imagesRouter);

export default routes;