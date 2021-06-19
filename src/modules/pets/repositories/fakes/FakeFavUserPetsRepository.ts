import ICreatePetDTO from "@modules/pets/dtos/ICreatePetDTO";
import IFindByDistanceDTO from "@modules/pets/dtos/IFindByDistanceDTO";
import FavUserPets from "@modules/pets/infra/typeorm/entities/FavUserPets";
import Pet from "@modules/pets/infra/typeorm/entities/Pet";
import { uuid } from "uuidv4";
import IFavUserPetsRepository from "../IFavUserPetsRepository";
import IPetsRepository from "../IPetsRepository";

class FakeFavUserPetsRepository implements IFavUserPetsRepository{
    private favs: FavUserPets[] = [];

    public async create(user_id:string, pet_id:string): Promise<FavUserPets> {
        const fav = new FavUserPets();

        Object.assign(fav, {
            id: uuid(), 
            user_id,
            pet_id,
        });

        this.favs.push(fav);

        return fav;
    }


    public async findByUser(user_id:string): Promise<FavUserPets[]>{
        let favs = this.favs.filter(fav => fav.user_id === user_id);

        return favs;
    }

    public async findById(id:string): Promise<FavUserPets | undefined>{
        let fav = this.favs.find(fav => fav.id === id);

        return fav;
    }

    public async delete(id: string): Promise<void>{
        const findIndex = this.favs.findIndex(findFav => findFav.id === id);

        this.favs.splice(findIndex, 1);
    }
}

export default FakeFavUserPetsRepository;