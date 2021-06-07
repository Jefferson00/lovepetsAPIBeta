import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import Pet from "../infra/typeorm/entities/Pet";
import IPetsRepository from "../repositories/IPetsRepository";

interface RequestDTO{
    name: string;
    user_id: string;
    species:string;
    is_adopt: boolean;
    age:string;
    gender:string;
    description:string;
    location_id:string;
}

@injectable()
class CreatePetService {
    constructor(
        @inject('PetsRepository')
        private petsRepository: IPetsRepository,
    ){}

    public async execute({
        user_id,
        name, 
        species, 
        age, 
        is_adopt,
        gender, 
        description, 
        location_id,
    }: RequestDTO): Promise<Pet>{

        if (!name || name === ''){
                name = 'pet'
            if (species === 'cat'){
                name = 'bixano'
            }
            if (species === 'dog'){
                name = 'doguinho'
            }
        }

        if (is_adopt) {
            throw new AppError('The pet must be available for adoption.');
        }

        const pet = await this.petsRepository.create({
            user_id,
            name, 
            species, 
            age, 
            is_adopt,
            gender, 
            description, 
            location_id,
        });

        return pet;
    }
}

export default CreatePetService;