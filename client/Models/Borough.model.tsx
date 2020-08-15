import { Coordinates } from './Coordinates.model';
export interface Borough {
  type: string;
  id: number;
  properties: {
    ons_label: string;
    name: string;
    partic_per: number;
    pop_2001: number;
  };
  geometry: {
    type: string;
    coordinates: [Coordinates[]];
  };
}
