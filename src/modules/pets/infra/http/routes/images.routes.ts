import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import ImagesController from '../controllers/ImagesController';

const imagesRouter = Router();

const upload = multer(uploadConfig);

const imagesController = new ImagesController();

imagesRouter.use(ensureAuthenticated);

imagesRouter.patch('/', upload.single('image'), imagesController.create);

export default imagesRouter;