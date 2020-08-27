import { Coordinates, InitialCoordinates } from './Coordinates.model';

export interface Borough {
  boroughName: string;
  boroughId: number;
  boroughCoords: Coordinates[];
}

export const InitialBorough: Borough = {
  boroughName: '',
  boroughId: 0,
  boroughCoords: [InitialCoordinates],
};
