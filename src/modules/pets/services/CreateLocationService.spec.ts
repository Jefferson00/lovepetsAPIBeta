
import FakeLocationsRepository from "../repositories/fakes/FakeLocationsRepository";
import CreateLocationService from "./CreateLocationService";



let fakeLocationsRepository: FakeLocationsRepository;
let createLocation: CreateLocationService;

describe('CreatePet', () => {
    beforeEach(() => {
        fakeLocationsRepository = new FakeLocationsRepository();

        createLocation = new CreateLocationService(
            fakeLocationsRepository
        );
    });

    it('should be able to create a new location', async () => {
        const location = await createLocation.execute({
           lat: '',
           long: '',
           city: 'brasília',
           state: 'DF'
        });

        expect(location).toHaveProperty('id');
        expect(location.city).toBe('brasília');
    });
});