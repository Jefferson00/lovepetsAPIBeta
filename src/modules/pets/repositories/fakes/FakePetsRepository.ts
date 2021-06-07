import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
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
        location_id,
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
            location_id
        });

        this.pets.push(pet);

        return pet;
    }
}

export default FakePetsRepository;