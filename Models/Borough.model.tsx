import { Coordinates } from './Coordinates.model';
export interface Borough {
  boroughName: string;
  boroughId: number;
  boroughCoords: Coordinates[];
}
