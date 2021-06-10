import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import multer from 'multer';
import ImagesController from '../controllers/ImagesController';

const imagesRouter = Router();

const upload = multer(uploadConfig);

const imagesController = new ImagesController();

imagesRouter.patch('/', upload.single('image'), ensureAuthenticated, imagesController.create);
imagesRouter.get('/:pet_id', imagesController.index);

export default imagesRouter;