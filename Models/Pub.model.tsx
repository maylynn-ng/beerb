export interface Pub {
  name: string;
  place_id: string;
  geometry: location;
  business_status: string;
}

type location = {
  lat: number;
  lng: number;
};
