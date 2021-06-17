
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeImagesRepository from "../repositories/fakes/FakeImagesRepository";
import CreateImageService from "./CreateImageService";
import DeleteImageService from "./DeleteImageService";


let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createImagePet: CreateImageService;
let deleteImagePet: DeleteImageService;

describe('DeleteImagePet', () => {
    beforeEach(() => {
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        createImagePet = new CreateImageService(
            fakeImagesRepository, fakeStorageProvider
        );

        deleteImagePet = new DeleteImageService(
            fakeImagesRepository, fakeStorageProvider
        );
    });

    it('should be able to delete an image', async () => {
        const deleteImage = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const image = await createImagePet.execute({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });

        const imageDeleted = await deleteImagePet.execute({
            id: image.id,
            pet_id: 'pet-id'
        })

        expect(deleteImage).toHaveBeenCalledWith('teste.jpg');
    });
});