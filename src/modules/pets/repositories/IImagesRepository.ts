import ICreateImageDTO from "../dtos/ICreateImageDTO";
import Image from "../infra/typeorm/entities/Image";

export default interface IImagesRepository{
    create (data: ICreateImageDTO): Promise<Image>;
}