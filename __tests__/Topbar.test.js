import React from 'react';
import Topbar from '../Components/Topbar';
import { render, fireEvent } from 'react-native-testing-library'
import '@testing-library/jest-native/extend-expect'
import { useRoute } from '@react-navigation/core';
jest.mock('@react-navigation/core')

const navigation = {
  openDrawer: jest.fn(),
}

const mockUser = {
  badges: ['mockBadge', 'mockBadge'],
  beerFreqs: [],
  beerSearchResults: [],
  boroughCounter: {
    mockKey1: true,
    mockKey2: true,
  },
  drunkBeers: ['mock', 'mock', 'mock'],
  favouriteBeers: new Set(),
  id: 0,
  Locations: [],
  name: '',
  nickname: '',
  picture: '',
  sub: '',
  uniqueDrunkIds: [],
}

const mockBorough = {
  boroughName: 'Test Borough Name',
  boroughId: 0,
  boroughCoords: [{
    latitude: 51.507388,
    longitude: -0.12789,
  }],
};

const mockBadges = ['mockBadge', 'mockBadge', 'mockBadge', 'mockBadge']

describe('Topbar', () => {
  describe('Shared functionality:', () => {

    let topbarInstance;

    beforeEach(() => {
      useRoute.mockReturnValue({
        name: 'Any Route'
      })
      topbarInstance = render(<Topbar navigation={navigation} user={mockUser} currentBorough={mockBorough} allBadges={mockBadges} />);
    })

    afterEach(() => {
      topbarInstance.unmount();
    })

    it('should render the Topbar component', () => {
      expect(topbarInstance.getByTestId('Topbar')).toBeTruthy();
    })

    it('should render the burger menu', () => {
      expect(topbarInstance.getByTestId('BurgerMenu')).toBeTruthy();
    })

    it('should open the burger menu when touched', () => {
      const menu = topbarInstance.getByTestId('BurgerMenu');
      expect(navigation.openDrawer).toHaveBeenCalledTimes(0);
      fireEvent.press(menu)
      expect(navigation.openDrawer).toHaveBeenCalledTimes(1);
    })

    it('should display the name of the Section', () => {
      expect(topbarInstance.getAllByText(useRoute().name).length).toEqual(1)
    })
  })

  describe('Home Screen:', () => {
    let topbarInstance;

    beforeEach(() => {
      useRoute.mockReturnValue({
        name: 'Home'
      })
      topbarInstance = render(<Topbar navigation={navigation} user={mockUser} currentBorough={mockBorough} allBadges={mockBadges} />);
    })

    afterEach(() => {
      topbarInstance.unmount();
    })

    it('should display the name of the borough when in the home route', () => {
      expect(topbarInstance.getByText(mockBorough.boroughName)).toBeTruthy()
    })

    it('should display the number of visited boroughs when in the home route', () => {
      const numBoroughs = Object.keys(mockUser.boroughCounter).length.toString()
      expect(topbarInstance.getByText(`${numBoroughs}/33`)).toBeTruthy();
    })
  })

  describe('Beerdex Screen:', () => {
    let topbarInstance;

    beforeEach(() => {
      useRoute.mockReturnValue({
        name: 'Beerdex'
      })
      topbarInstance = render(<Topbar navigation={navigation} user={mockUser} currentBorough={mockBorough} allBadges={mockBadges} />);
    })

    afterEach(() => {
      topbarInstance.unmount();
    })

    it('should display the number of discovered beers when in the home route', () => {
      const numBeers = mockUser.drunkBeers.length.toString()
      expect(topbarInstance.getByText(`Discovered: ${numBeers}`)).toBeTruthy();
    })
  })

  describe('Achievements Screen:', () => {
    let topbarInstance;

    beforeEach(() => {
      useRoute.mockReturnValue({
        name: 'Achievements'
      })
      topbarInstance = render(<Topbar navigation={navigation} user={mockUser} currentBorough={mockBorough} allBadges={mockBadges} />);
    })

    afterEach(() => {
      topbarInstance.unmount();
    })

    it('should render the number of obtained badges and the total of available badges', () => {
      const obtainedBadges = mockUser.badges.length;
      const totalBadges = mockBadges.length;
      expect(topbarInstance.getByText(`${obtainedBadges}/${totalBadges}`)).toBeTruthy();
    })
  })
})