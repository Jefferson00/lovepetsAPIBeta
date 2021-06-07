import CreateImageService from "@modules/pets/services/CreateImageService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ImagesController {
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