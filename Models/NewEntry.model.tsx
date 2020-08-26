import { Beer } from './Beer.model';

export type NewEntry = {
  location: {
    beerName: string;
    beerId: number;
    placeName: string;
    placeId: string;
    boroughName: string;
    boroughId: number;
    longitude: number;
    latitude: number;
    UserId: string;
  };
  beers: Beer[];
};
