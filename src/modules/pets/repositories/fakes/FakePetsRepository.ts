import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import IFindByDistanceDTO from "@modules/pets/dtos/IFindByDistanceDTO";
import Pet from "@modules/pets/infra/typeorm/entities/Pet";
import { uuid } from "uuidv4";
import IPetsRepository from "../IPetsRepository";

class FakePetsRepository implements IPetsRepository{
    private pets: Pet[] = [];

    public async create({
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
    } : ICreatePetDTO): Promise<Pet> {
        const pet = new Pet();

        Object.assign(pet, {
            id: uuid(), 
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

        this.pets.push(pet);

        return pet;
    }

    public async findByDistance({
       location_lon ,location_lat , distance
    }: IFindByDistanceDTO): Promise<Pet[] | undefined>{

        let { pets } = this;

        return pets;
    }
}

export default FakePetsRepository;