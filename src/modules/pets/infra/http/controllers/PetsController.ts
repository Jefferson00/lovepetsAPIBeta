import CreatePetService from "@modules/pets/services/CreatePetService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class PetsController {
    public async create(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const {
            name, 
            species, 
            age, 
            is_adopt,
            gender, 
            description, 
            location_id
        } = request.body;

        const createPet = container.resolve(CreatePetService);

        const pet = await createPet.execute({
            user_id,
            name, 
            species, 
            age, 
            is_adopt,
            gender, 
            description, 
            location_id
        });

        return response.json(pet);
    }
}