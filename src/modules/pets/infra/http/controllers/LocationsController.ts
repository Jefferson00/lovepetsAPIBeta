import CreateLocationService from "@modules/pets/services/CreateLocationService";
import FindLocationService from "@modules/pets/services/FindLocationsService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class LocationsController {
    public async index(request: Request, response: Response): Promise<Response>{
        const {lat, long, distance} = request.query;

        const findlocations = container.resolve(FindLocationService);

        const locations = await findlocations.execute({
            lat: String(lat), 
            long: String(long), 
            distance: String(distance),
        });

        return response.json(locations);
    }

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