import AppError from "@shared/errors/AppError";
import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import CreatePetService from "./CreatePetService";


let fakePetsRepository: FakePetsRepository;
let createPet: CreatePetService;

describe('CreatePet', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();

        createPet = new CreatePetService(
            fakePetsRepository,
        );
    });

    it('should be able to create a new pet', async () => {
        const pet = await createPet.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: 'user-id',
            location_id: 'location-id',
        });

        expect(pet).toHaveProperty('id');
        expect(pet.user_id).toBe('user-id');
        expect(pet.location_id).toBe('location-id');
    });

    it('should be able to create a new pet without name', async () => {
        const pet = await createPet.execute({
            name: null,
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: 'user-id',
            location_id: 'location-id',
        });

        expect(pet).toHaveProperty('id');
        expect(pet.name).toBe('bixano');
        expect(pet.user_id).toBe('user-id');
        expect(pet.location_id).toBe('location-id');

        const pet2 = await createPet.execute({
            name: null,
            species: 'dog',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: 'user-id',
            location_id: 'location-id',
        });

        expect(pet2).toHaveProperty('id');
        expect(pet2.name).toBe('doguinho');
        expect(pet2.user_id).toBe('user-id');
        expect(pet2.location_id).toBe('location-id');

        const pet3 = await createPet.execute({
            name: null,
            species: 'fish',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: 'user-id',
            location_id: 'location-id',
        });

        expect(pet3).toHaveProperty('id');
        expect(pet3.name).toBe('pet');
        expect(pet3.user_id).toBe('user-id');
        expect(pet3.location_id).toBe('location-id');
    });

    it('should Not be able to create a new pet with is_adopt true', async () => {
        await expect(
            createPet.execute({
                name: 'Bixano',
                species: 'cat',
                age: '1 ano',
                description: 'description',
                gender: 'male',
                is_adopt: true,
                user_id: 'user-id',
                location_id: 'location-id',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});