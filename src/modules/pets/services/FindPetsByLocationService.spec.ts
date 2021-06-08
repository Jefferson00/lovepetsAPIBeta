
import FindLocationService from "./FindPetsByLocationService";
import FakeGeoProvider from '../providers/GeoProvider/fakes/FakeGeoProvider';
import FakePetsRepository from "../repositories/fakes/FakePetsRepository";
import CreatePetService from "./CreatePetService";


let fakePetsRepository: FakePetsRepository;
let findLocation: FindLocationService;
let fakeGeoProvider: FakeGeoProvider;
let createPetsRepository: CreatePetService;

describe('FindLocation', () => {
    beforeEach(() => {
        fakePetsRepository = new FakePetsRepository();
        fakeGeoProvider = new FakeGeoProvider();

        createPetsRepository = new CreatePetService(
            fakePetsRepository
        );

        findLocation = new FindLocationService(
            fakePetsRepository, fakeGeoProvider
        );
    });

    it('should be able to find locations by distance', async () => {
        const location = await createPetsRepository.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: true,
            user_id: 'user-id',    
            location_lat: '-15.785647',
            location_lon: '-48.141282',
            city: 'brasília',
            state: 'DF'
         });

        const location2 = await createPetsRepository.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: true,
            user_id: 'user-id',  
            location_lat: '-15.805086',
            location_lon: '-48.121796',
            city: 'brasília',
            state: 'DF'
         });

        const location3 = await createPetsRepository.execute({
            name: 'Bixano',
            species: 'cat',
            age: '1 ano',
            description: 'description',
            gender: 'male',
            is_adopt: true,
            user_id: 'user-id',  
            location_lat: '-16.687690',
            location_lon: '-49.269107',
            city: 'goiânia',
            state: 'GO'
         });

        const locations = await findLocation.execute({
           location_lat: '-15.785647',
           location_lon: '-48.141282',
           distance: '50',
        });

        expect(locations).toEqual([location, location2]);
    });
});