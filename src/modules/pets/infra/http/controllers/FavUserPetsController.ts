import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';
import CreateFavUserPetsService from "@modules/pets/services/CreateFavUserPetsService";

export default class FavUserPetsController {
    public async create(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const {pets_id} = request.body;

        const createFavUserPets = container.resolve(CreateFavUserPetsService);

        const fav = await createFavUserPets.execute(
            user_id,
            pets_id,
        );

        return response.json(fav);
    }
}