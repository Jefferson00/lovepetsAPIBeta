import ICreateLocationDTO from "@modules/pets/dtos/ICreateLocationDTO";
import ILocationsRepository from "@modules/pets/repositories/ILocationsRepository";
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
}

export default LocationsRepository;