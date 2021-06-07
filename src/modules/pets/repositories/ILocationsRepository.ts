import ICreateLocationDTO from "../dtos/ICreateLocationDTO";
import Location from "../infra/typeorm/entities/Location";

export default interface ILocationsRepository {
    create (data: ICreateLocationDTO): Promise<Location>;
}