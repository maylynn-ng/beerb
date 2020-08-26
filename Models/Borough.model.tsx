import { Coordinates } from './Coordinates.model';
export interface Borough {
  boroughName: string;
  boroughId: number;
  boroughCoords: Coordinates[];
}

export const InitialBorough: Borough = {
  boroughName: '',
  boroughId: 0,
  boroughCoords: [{ latitude: 0, longitude: 0 }],
};
