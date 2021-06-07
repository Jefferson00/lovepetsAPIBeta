
import FakeLocationsRepository from "../repositories/fakes/FakeLocationsRepository";
import CreateLocationService from "./CreateLocationService";
import FindLocationService from "./FindLocationsService";
import FakeGeoProvider from '../providers/GeoProvider/fakes/FakeGeoProvider';


let fakeLocationsRepository: FakeLocationsRepository;
let findLocation: FindLocationService;
let fakeGeoProvider: FakeGeoProvider;
let createLocation: CreateLocationService;

describe('FindLocation', () => {
    beforeEach(() => {
        fakeLocationsRepository = new FakeLocationsRepository();
        fakeGeoProvider = new FakeGeoProvider();

        createLocation = new CreateLocationService(
            fakeLocationsRepository
        );

        findLocation = new FindLocationService(
            fakeLocationsRepository, fakeGeoProvider
        );
    });

    it('should be able to find locations by distance', async () => {
        const location = await createLocation.execute({
            lat: '-15.785647',
            long: '-48.141282',
            city: 'brasília',
            state: 'DF'
         });

        const location2 = await createLocation.execute({
            lat: '-15.805086',
            long: '-48.121796',
            city: 'brasília',
            state: 'DF'
         });

        const location3 = await createLocation.execute({
            lat: '-16.687690',
            long: '-49.269107',
            city: 'goiânia',
            state: 'GO'
         });

        const locations = await findLocation.execute({
           lat: '-15.785647',
           long: '-48.141282',
           distance: '50',
        });

        expect(locations).toEqual([location, location2]);
    });
});