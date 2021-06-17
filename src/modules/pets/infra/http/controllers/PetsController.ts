import CreatePetService from "@modules/pets/services/CreatePetService";
import FindPetsByLocationService from "@modules/pets/services/FindPetsByLocationService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from 'class-transformer';

export default class PetsController {
    public async index(request: Request, response: Response): Promise<Response>{
        const {location_lat, location_lon, distance, species, gender, limit, skip} = request.query;

        const findPetsByLocation = container.resolve(FindPetsByLocationService);

        const pets = await findPetsByLocation.execute({
            location_lat: String(location_lat), 
            location_lon: String(location_lon), 
            distance: String(distance),
            species: String(species),
            gender: String(gender),
            limit: Number(limit),
            skip: Number(skip),
        });

        return response.json(classToClass(pets));
    }

    public async create(request: Request, response: Response): Promise<Response>{
        const user_id = request.user.id;
        const {
            name, 
            species, 
            age, 
            is_adopt,
            gender, 
            description, 
            location_lat,
            location_lon,
            city,
            state,
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
            location_lat,
            location_lon,
            city,
            state,
        });

        return response.json(pet);
    }
}