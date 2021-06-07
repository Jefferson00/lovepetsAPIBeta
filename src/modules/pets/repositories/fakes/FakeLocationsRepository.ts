import ICreateLocationDTO from "@modules/pets/dtos/ICreateLocationDTO";
import IFindByDistanceDTO from "@modules/pets/dtos/IFindByDistanceDTO";
import Location from "@modules/pets/infra/typeorm/entities/Location";
import ILocationsRepository from "@modules/pets/repositories/ILocationsRepository";
import { uuid } from "uuidv4";



class FakeLocationsRepository implements ILocationsRepository{
    private locations: Location[] = []; 

    public async create({
        lat, long, city, state
    } : ICreateLocationDTO): Promise<Location> {
        const location = new Location();

        Object.assign(location, {
            id: uuid(),lat, long, city, state   
        });

        this.locations.push(location);

        return location;
    }

    public async findByDistance({
        lat, long, distance
    }: IFindByDistanceDTO): Promise<Location[] | undefined>{

        let { locations } = this;

        return locations;
    }
}

export default FakeLocationsRepository;