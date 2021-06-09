
import FakeGeoProvider from '../providers/GeoProvider/fakes/FakeGeoProvider';
import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FindPetsByLocationService from "./FindPetsByLocationService";
import CreatePetService from "./CreatePetService";


let fakePetsRepository: FakePetsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeGeoProvider: FakeGeoProvider;
let findPetsByLocation: FindPetsByLocationService;
let createPetsRepository: CreatePetService;

describe('FindLocation', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeGeoProvider = new FakeGeoProvider();
        fakeUsersRepository = new FakeUsersRepository();

        createPetsRepository = new CreatePetService(
            fakePetsRepository, fakeUsersRepository
        );

        findPetsByLocation = new FindPetsByLocationService(
            fakePetsRepository, fakeGeoProvider
        );
    });

    it('should be able to find locations by distance', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jeffin',
            email: 'jeffin@jeffin.com',
            password: '123456',
            phone: '61 0000000',
        });

        const pet = await createPetsRepository.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,    
            location_lat: '-15.785647',
            location_lon: '-48.141282',
            city: 'brasília',
            state: 'DF'
         });

        const pet2 = await createPetsRepository.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: false,
            user_id: user.id,  
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            city: 'brasília',
            state: 'DF'
         });

        const pets = await findPetsByLocation.execute({
           location_lat: '-15.785647',
           location_lon: '-48.141282',
           distance: '50',
        });

        expect(pets).toEqual([pet, pet2]);
    });
});