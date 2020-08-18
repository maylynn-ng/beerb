const EXPO_UNTAPPED_URL: string = 'https://api.untappd.com/v4/search/beer?q=';
const EXPO_UNTAPPED_CLIENT_ID: string = 'BB560E63A24CD50E77E5217743C6AE5FD687C569';
const EXPO_UNTAPPED_CLIENT_SECRET: string = '7B011532D27B030405018E603FF8783D9E60C130';

export type Action = {
  type: string;
  payload: any;
};

export type Beer = {
  beerId: number;
  haveHad: boolean;
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

export function fetchSearchBeers(searchTerm: string) {
  return function (dispatch: any) {
    dispatch(setSearchTerm(searchTerm));
    let results: Beer[] = [];
    fetch(
      `${EXPO_UNTAPPED_URL}${searchTerm}&client_id=${EXPO_UNTAPPED_CLIENT_ID}&client_secret=${EXPO_UNTAPPED_CLIENT_SECRET}`
    )
      .then(res => res.json())
      .then(res => {
        let beers = res.response.beers.items;
        for (let i = 0; i < beers.length; i++) {
          results.push({
            beerId: beers[i].beer.bid,
            haveHad: beers[i].have_had,
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

// export function fetchBeers() => {
//   return function (dispatch: any) {
// fetch('')
//   }
// }