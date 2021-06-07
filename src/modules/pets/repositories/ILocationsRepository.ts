import ICreateLocationDTO from "../dtos/ICreateLocationDTO";
import IFindByDistanceDTO from "../dtos/IFindByDistanceDTO";
import Location from "../infra/typeorm/entities/Location";

export default interface ILocationsRepository {
    create (data: ICreateLocationDTO): Promise<Location>;
    findByDistance (data: IFindByDistanceDTO): Promise<Location[] | undefined>
}