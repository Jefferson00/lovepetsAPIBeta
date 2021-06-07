import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Location from "../infra/typeorm/entities/Location";

import ILocationsRepository from "../repositories/ILocationsRepository";


interface RequestDTO{
    lat:string;
    long:string;
    city:string;
    state:string;
}

@injectable()
class CreateLocationService {
    constructor(
        @inject('LocationsRepository')
        private locationsRepository: ILocationsRepository,
    ){}

    public async execute({
        lat, long, city, state
    }: RequestDTO): Promise<Location>{


        const location = await this.locationsRepository.create({
            lat, long, city, state
        });

        return location;
    }
}

export default CreateLocationService;