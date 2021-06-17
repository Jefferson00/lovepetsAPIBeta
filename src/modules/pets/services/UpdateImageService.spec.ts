
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import FakeImagesRepository from "../repositories/fakes/FakeImagesRepository";
import CreateImageService from "./CreateImageService";
import UpdateImageService from "./UpdateImageService";


let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let createImagePet: CreateImageService;
let updateImagePet: UpdateImageService;

describe('UpdateImagePet', () => {
    beforeEach(() => {
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        createImagePet = new CreateImageService(
            fakeImagesRepository, fakeStorageProvider
        );

        updateImagePet = new UpdateImageService(
            fakeImagesRepository, fakeStorageProvider
        );
    });

    it('should be able to update an image', async () => {
        const createImage = jest.spyOn(fakeStorageProvider, 'saveFile');

        const image = await createImagePet.execute({
            image: 'teste.jpg',
            pet_id: 'pet-id'
        });

        const imageUpdated = await updateImagePet.execute({
            id: image.id,
            pet_id: 'pet-id',
            image: 'teste2.jpg',
        })

        expect(createImage).toHaveBeenCalledWith('teste2.jpg');
        expect(imageUpdated.image).toBe('teste2.jpg');
    });
});