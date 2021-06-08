import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../infra/typeorm/entities/Pet";
import IGeoProvider from "../providers/GeoProvider/models/IGeoProvider";

import IPetsRepository from "../repositories/IPetsRepository";


interface RequestDTO{
    location_lat:string;
    location_lon:string;
    distance:string;
}

@injectable()
class FindPetsByLocationService {
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,

        @inject('GeoProvider')
        private geoProvider: IGeoProvider,
    ){}

    public async execute({
        location_lat, location_lon, distance
    }: RequestDTO): Promise<Pet[]>{
        
        if (!distance){
            distance = "50"
        }

        let petsByLocation = await this.petsRepository.findByDistance({
            location_lat, location_lon, distance
        });

        petsByLocation = petsByLocation.filter(pet => {
            const distanceBetweenLocations = this.geoProvider.getDistance(
                {lat: location_lat, lon: location_lon},
                {lat: pet.location_lat, lon: pet.location_lon}
            )
            if(this.geoProvider.convertDistance(distanceBetweenLocations, 'km') <= Number(distance)){
                return pet;
            }
        });

        return petsByLocation;
    }
}

export default FindPetsByLocationService;