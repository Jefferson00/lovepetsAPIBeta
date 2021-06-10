import ICreatePetDTO from "../dtos/ICreatePetDTO";
import IFindByDistanceDTO from "../dtos/IFindByDistanceDTO";
import Pet from "../infra/typeorm/entities/Pet";

export default interface IPetsRepository {
    create (data: ICreatePetDTO): Promise<Pet>;
    findByDistance (data: IFindByDistanceDTO): Promise<Pet[] | undefined>;
}