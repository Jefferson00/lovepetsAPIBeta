import ICreatePetDTO from "../dtos/ICreatePetDTO";
import Pet from "../infra/typeorm/entities/Pet";

export default interface IPetsRepository {
    create (data: ICreatePetDTO): Promise<Pet>;
    //findBySpecie(specie: string): Promise<Pet | undefined>;
    //findByGender(gender: string): Promise<Pet | undefined>;
    //findAllByLocation(): Promise<Pet[] | undefined>;
}