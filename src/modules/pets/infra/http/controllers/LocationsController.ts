import CreateLocationService from "@modules/pets/services/CreateLocationService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class LocationsController {
    public async create(request: Request, response: Response): Promise<Response>{
        const {
            lat, long, city, state
        } = request.body;

        const createLocation = container.resolve(CreateLocationService);

        const location = await createLocation.execute({
            lat, long, city, state
        });

        return response.json(location);
    }
}