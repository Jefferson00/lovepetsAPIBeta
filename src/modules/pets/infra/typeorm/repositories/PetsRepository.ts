import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import Pet from "@modules/pets/infra/typeorm/entities/Pet";
import IPetsRepository from "@modules/pets/repositories/IPetsRepository";
import { getRepository, Repository } from "typeorm";


class PetsRepository implements IPetsRepository{
    private ormRepository: Repository<Pet>;

    constructor(){
        this.ormRepository = getRepository(Pet);
    }

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
        const pet = this.ormRepository.create({
            user_id,
            name, 
            species, 
            age, 
            is_adopt,
            gender, 
            description, 
            location_id
        });

        await this.ormRepository.save(pet);

        return pet;
    }
}

export default PetsRepository;