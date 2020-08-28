import { Beer } from './Beer.model';
import { Location } from './Locations.model';

export type NewEntry = {
  location: Location;
  beers: Beer[];
};
