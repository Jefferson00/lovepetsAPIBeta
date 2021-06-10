import CreateImageService from "@modules/pets/services/CreateImageService";
import FindImagesService from "@modules/pets/services/FindImagesService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ImagesController {
    public async index(request: Request, response: Response): Promise<Response>{
        const { pet_id } = request.params;
        console.log(pet_id)

        const findImage = container.resolve(FindImagesService);

        const images = await findImage.execute(String(pet_id));

        return response.json(classToClass(images));
    }
    public async create(request: Request, response: Response): Promise<Response>{
        const {
            pet_id
        } = request.body;

        const createImage = container.resolve(CreateImageService);

        const imagePet = await createImage.execute({
            image: request.file.filename,
            pet_id
        });

        return response.json(classToClass(imagePet));
    }
}