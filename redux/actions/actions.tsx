const API_URL = process.env.EXPO_UNTAPPED_URL;
const CLIENT_ID = process.env.EXPO_CLIENT_ID;
const CLIENT_SECRET = process.env.EXPO_CLIENT_SECRET;

export type Action = {
  type: string;
  payload: any;
};

export type Beer = {
  beerName: string;
  beerLabel: string;
  beerIbu: number;
  beerDescription: string;
  beerStyle: string;
  breweryName: string;
  breweryCountry: string;
  breweryLabel: string;
  breweryUrl: string;
};

export function storeBorough(currentBorough: string): Action {
  return {
    type: 'STORE_BOROUGH',
    payload: currentBorough,
  };
}

export function setSearchTerm(input: string) {
  return {
    type: 'SET_SEARCH_TERM',
    payload: input,
  };
}

export function fetchBeers(searchTerm: string) {
  return function (dispatch: any) {
    dispatch(setSearchTerm(searchTerm));

    let results: Beer[] = [];

    const url = `${API_URL}${searchTerm}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
    console.log(url);

    fetch(`${API_URL}${searchTerm}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
      .then(res => res.json())
      .then(res => {
        let beers = res.response.beers.items;
        for (let i = 0; i < beers.length; i++) {
          results.push({
            beerName: beers[i].beer.beer_name,
            beerLabel: beers[i].beer.beer_label,
            beerIbu: beers[i].beer.beer_ibu,
            beerDescription: beers[i].beer.beer_description,
            beerStyle: beers[i].beer.beer_style,
            breweryName: beers[i].brewery.brewery_name,
            breweryCountry: beers[i].brewery.country_name,
            breweryLabel: beers[i].brewery.brewery_label,
            breweryUrl: beers[i].brewery.contact.url,
          });
        }
      })
      .then(dispatch({ type: 'SET_SEARCH_BEER_RESULTS', payload: results }));
  };
}
