import { Beer } from './Beer.model';
import { Badge } from './Badge.model';
import { Location } from './Locations.model';

export interface User {
  badges: Badge[];
  beerFreqs: [string, number][];
  beerSearchResults: Beer[];
  boroughCounter: {
    [key: string]: number;
  };
  drunkBeers: Beer[];
  favouriteBeers: Set<Object>;
  id: number;
  Locations: Location[];
  name: string;
  nickname: string;
  picture: string;
  sub: string;
  uniqueDrunkIds: number[];
}

export const InitialUser: User = {
  badges: [],
  beerFreqs: [],
  beerSearchResults: [],
  boroughCounter: {},
  drunkBeers: [],
  favouriteBeers: new Set(),
  id: 0,
  Locations: [],
  name: '',
  nickname: '',
  picture: '',
  sub: '',
  uniqueDrunkIds: [],
};
