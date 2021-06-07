import ICreateImageDTO from "@modules/pets/dtos/ICreateImageDTO";
import IImagesRepository from "@modules/pets/repositories/IImagesRepository";
import { getRepository, Repository } from "typeorm";
import Image from "../entities/Image";


class ImagesRepository implements IImagesRepository{
    private ormRepository: Repository<Image>;

    constructor(){
        this.ormRepository = getRepository(Image);
    }

    public async create({
       image, pet_id
    } : ICreateImageDTO): Promise<Image> {
        const imagePet = this.ormRepository.create({
            image, pet_id
        });

        await this.ormRepository.save(imagePet);

        return imagePet;
    }
}

export default ImagesRepository;