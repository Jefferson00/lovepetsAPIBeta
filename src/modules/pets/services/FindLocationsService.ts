import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Location from "../infra/typeorm/entities/Location";
import IGeoProvider from "../providers/GeoProvider/models/IGeoProvider";

import ILocationsRepository from "../repositories/ILocationsRepository";


interface RequestDTO{
    lat:string;
    long:string;
    distance:string;
}

@injectable()
class FindLocationService {
    constructor(
        @inject('LocationsRepository')
        private locationsRepository: ILocationsRepository,

        @inject('GeoProvider')
        private geoProvider: IGeoProvider,
    ){}

    public async execute({
        lat, long, distance
    }: RequestDTO): Promise<Location[]>{
        
        if (!distance){
            distance = "50"
        }

        let locations = await this.locationsRepository.findByDistance({
            lat, long, distance
        });

        locations = locations.filter(location => {
            const distanceBetweenLocations = this.geoProvider.getDistance(
                {lat, lon: long},
                {lat: location.lat, lon: location.long}
            )
            if(this.geoProvider.convertDistance(distanceBetweenLocations, 'km') <= Number(distance)){
                return location;
            }
        });

        return locations;
    }
}

export default FindLocationService;