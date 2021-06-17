import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";
import AppError from "@shared/errors/AppError";
import FakeImagesRepository from "../repositories/fakes/FakeImagesRepository";
import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import CreatePetService from "./CreatePetService";
import DeletePetService from "./DeletePetService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeImagesRepository: FakeImagesRepository;
let fakeStorageProvider: FakeStorageProvider;
let deletePet: DeletePetService;

describe('DeletePet', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        fakeImagesRepository = new FakeImagesRepository();
        fakeStorageProvider = new FakeStorageProvider();

        deletePet = new DeletePetService(
            fakePetsRepository,fakeUsersRepository, fakeImagesRepository, fakeStorageProvider
        );
    });

    it('should be able to delete a pet', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const pet = await fakePetsRepository.create({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        });

        expect(pet).toHaveProperty('id');
        expect(pet.user_id).toBe(user.id);
    });
});