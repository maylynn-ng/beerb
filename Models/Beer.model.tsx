export type Beer = {
  beerId: number;
  beerName: string;
  beerLabel: string;
  beerAbv: number;
  beerIbu: number;
  beerDescription: string;
  beerStyle: string;
  breweryName: string;
  breweryCountry: string;
  breweryLabel: string;
  breweryUrl: string;
};

export const InitalBeer = {
  beerId: 0,
  beerName: '',
  beerLabel: '',
  beerAbv: 0,
  beerIbu: 0,
  beerDescription: '',
  beerStyle: '',
  breweryName: '',
  breweryCountry: '',
  breweryLabel: '',
  breweryUrl: '',
};

export type DisplayBeer = {
  beerId: number;
  beerName: string;
  beerLabel: string;
};
