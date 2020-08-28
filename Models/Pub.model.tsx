export interface Pub {
  name: string;
  place_id: string;
  geometry: { location: Location };
  business_status: string;
  [key: string]: any;
}

export type Location = {
  lat: number;
  lng: number;
};

export const InitialPub: Pub = {
  name: '',
  place_id: '',
  geometry: {
    location: { lat: 51.507388, lng: -0.12789 },
  },
  business_status: '',
};
