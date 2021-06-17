import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import CreatePetService from "./CreatePetService";
import UpdatePetService from "./UpdatePetService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let updatePet: UpdatePetService;

describe('UpdatePet', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeUsersRepository = new FakeUsersRepository();

        updatePet = new UpdatePetService(
            fakePetsRepository, fakeUsersRepository
        )
    });

    it('should be able to update a pet', async () => {
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

        const updatedPet = await updatePet.execute({
            user_id: pet.user_id,
            id: pet.id,
            name: '',
            species: 'dog',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            location_lat: 'location-id',
            location_lon: '',
            city: '',
            state: ''
        })

        expect(updatedPet.name).toBe('doguinho');
        expect(updatedPet.species).toBe('dog');
    });

    it('should Not be able to update a pet without a valid user_id', async () => {
        await expect(
            updatePet.execute({
                id:'id',
                name: 'Bixano',
                species: 'cat',
                age: '1 ano',
                description: 'description',
                gender: 'male',
                is_adopt: false,
                user_id: 'non-existing-id',
                location_lat: 'location-id',
                location_lon: '',
                city: '',
                state: ''
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should Not be able to update a pet without a valid pet_id', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });
        await expect(
            updatePet.execute({
                id:'non-existing-id',
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
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});