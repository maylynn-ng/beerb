import { Beer } from '../Models/Beer.model';

export const mockData: Beer[] = [
  {
    beerId: 3784,
    haveHad: false,
    beerName: 'Bud Light',
    beerLabel: 'https://untappd.akamaized.net/site/beer_logos/beer-3784_0e2c3_sm.jpeg',
    beerIbu: 6,
    beerDescription:
      'Bud Light is brewed using a blend of premium aroma hop varieties, both American-grown and imported, and a combination of barley malts and rice. Its superior drinkability and refreshing flavor makes it the world’s favorite light beer.',
    beerStyle: 'Lager - American Light',
    breweryName: 'Anheuser-Busch',
    breweryCountry: 'United States',
    breweryLabel: 'https://untappd.akamaized.net/site/brewery_logos/brewery-44_b0ef2.jpeg',
    breweryUrl: 'http://www.anheuser-busch.com',
  },
  {
    beerId: 16649,
    haveHad: false,
    beerName: 'Traditional Lager',
    beerLabel: 'https://untappd.akamaized.net/site/beer_logos/beer-16649_c244e_sm.jpeg',
    beerIbu: 16,
    beerDescription:
      'Famous for its rich amber color and medium-bodied flavor with roasted caramel malt for a subtle sweetness and a combination of cluster and cascade hops, this true original delivers a well-balanced taste with very distinct character. Born from a historic recipe that was resurrected in 1987, Yuengling Traditional Lager is a true classic.',
    beerStyle: 'Lager - American Amber / Red',
    breweryName: 'Yuengling Brewery',
    breweryCountry: 'United States',
    breweryLabel: 'https://untappd.akamaized.net/site/brewery_logos/brewery-1976_9c58e.jpeg',
    breweryUrl: 'http://www.yuengling.com/',
  },
];
