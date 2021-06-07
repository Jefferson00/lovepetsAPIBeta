import ICreateLocationDTO from "@modules/pets/dtos/ICreateLocationDTO";
import IFindByDistanceDTO from "@modules/pets/dtos/IFindByDistanceDTO";
import ILocationsRepository from "@modules/pets/repositories/ILocationsRepository";
import { convertDistance, getDistance } from "geolib";
import { getRepository, Repository } from "typeorm";
import Location from "../entities/Location";


class LocationsRepository implements ILocationsRepository{
    private ormRepository: Repository<Location>;

    constructor(){
        this.ormRepository = getRepository(Location);
    }

    public async create({
        lat, long, city, state
    } : ICreateLocationDTO): Promise<Location> {
        const location = this.ormRepository.create({
            lat, long, city, state
        });

        await this.ormRepository.save(location);

        return location;
    }

    public async findByDistance({
        lat, long, distance
    }: IFindByDistanceDTO): Promise<Location[] | undefined>{

        let locations: Location[];

        locations = await this.ormRepository.find();

        return locations;
    }
}

export default LocationsRepository;