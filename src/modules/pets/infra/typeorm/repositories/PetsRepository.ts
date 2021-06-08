import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import IFindByDistanceDTO from "@modules/pets/dtos/IFindByDistanceDTO";
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
        location_lat,
        location_lon,
        city,
        state
    } : ICreatePetDTO): Promise<Pet> {
        const pet = this.ormRepository.create({
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

        await this.ormRepository.save(pet);

        return pet;
    }

    public async findByDistance({
        location_lat,
        location_lon,
         distance
    }: IFindByDistanceDTO): Promise<Pet[] | undefined>{

        let pets: Pet[];

        pets = await this.ormRepository.find();

        return pets;
    }
}

export default PetsRepository;