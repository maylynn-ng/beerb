import React from 'react';
import { Image, Text, StyleSheet, View, Share, TouchableOpacity, ToastAndroid } from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Borough } from '../Models/Borough.model';
import { Location } from '../Models/Locations.model';
import { State } from '../redux/reducers';
import { User } from '../Models/User.model';

function ShortProfile({
  isShownShortProfile,
  toggleShortProfile,
  user,
  lastBeer,
  currentBorough,
  takeScreenShot,
  beerFrequency,
}: {
  isShownShortProfile: boolean;
  toggleShortProfile: () => void;
  user: User;
  lastBeer: Location;
  currentBorough: Borough;
  takeScreenShot: () => Promise<void>;
  beerFrequency: [string, number][];
}): JSX.Element {
  const share = async (): Promise<void> => {
    try {
      const whatArticle = (): 'a' | 'an' => (/[AEIOU]/.test(lastBeer.beerName[0]) ? 'an' : 'a');

      const link = (): string => {
        let index = 0;
        if (user.Locations[index].placeName === 'somewhere') {
          let gps: string = `${user.Locations[index].latitude},${user.Locations[index].longitude}`;
          return `google.co.uk/maps/search/?api=1&query=${gps}`;
        } else {
          let pubName: string = user.Locations[index].placeName.split(' ').join('+');
          return `google.co.uk/maps/search/?api=1&query=${pubName}`;
        }
      };

      ToastAndroid.showWithGravity(
        '🍺 Share your beer and your location',
        ToastAndroid.SHORT,
        ToastAndroid.TOP
      );

      await Share.share({
        message: `Hey! Fancy joining me? I'm having ${whatArticle()} ${lastBeer.beerName} in ${
          lastBeer.placeName === 'somewhere' ? lastBeer.boroughName : lastBeer.placeName
        }. ${link()}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const picture = () => (user.picture ? { uri: user.picture } : 'require("./assets/user.png")');

  return (
    <>
      {isShownShortProfile ? (
        <Modal
          style={{
            justifyContent: 'center',
            backgroundColor: '#000000aa',
            margin: 0,
            flex: 1,
          }}
          transparent={true}
          visible={true}
          statusBarTranslucent={true}
          onBackdropPress={() => {
            toggleShortProfile();
          }}
        >
          <View style={styles.mainContainer}>
            <Image style={styles.userImage} source={picture()} />
            <Text style={styles.userName}>{user.nickname}</Text>
            <Text style={styles.currentB}>{currentBorough.boroughName}</Text>
            <View style={styles.infoView}>
              <View style={styles.info}>
                <Text style={styles.number}>{Object.keys(user.boroughCounter).length}</Text>
                <Text style={styles.text}>
                  {Object.keys(user.boroughCounter).length === 1 ? 'BOROUGH' : 'BOROUGHS'}
                </Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.number}>{beerFrequency.length}</Text>
                <Text style={styles.text}>{beerFrequency.length === 1 ? 'BEER' : 'BEERS'}</Text>
              </View>
            </View>
            <Text
              style={{
                opacity: 0.2,
                alignSelf: 'flex-start',
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 5,
              }}
            >
              Your last beer...
            </Text>
            <Text style={styles.lastBeer}>
              {lastBeer.beerName} in{' '}
              {lastBeer.placeName === 'somewhere' || lastBeer.boroughName === 'you!'
                ? lastBeer.boroughName
                : lastBeer.placeName}
            </Text>
            <View style={styles.shareView}>
              <TouchableOpacity style={styles.shareButton} onPress={() => takeScreenShot()}>
                <Image
                  source={require('../assets/shareImage.png')}
                  style={{ height: 30, width: 30 }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton} onPress={() => share()}>
                <Image source={require('../assets/share.png')} style={{ height: 30, width: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      ) : null}
    </>
  );
}

function mapStateToProps(state: State) {
  return {
    currentBorough: state.currentBorough,
    user: state.user,
    beerFrequency: state.user.beerFreqs,
  };
}

export default connect(mapStateToProps, null)(ShortProfile);

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    height: 500,
    marginHorizontal: 35,
  },
  userImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
    marginTop: 25,
  },
  userName: {
    fontSize: 30,
  },
  currentB: {
    fontSize: 15,
    fontStyle: 'italic',
  },
  infoView: {
    flexDirection: 'row',
    marginTop: '5%',
    marginHorizontal: 20,
    paddingBottom: 4,
    borderBottomColor: 'gold',
    borderBottomWidth: 3,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  number: {
    fontSize: 25,
    fontWeight: 'bold',
    elevation: 3,
    marginTop: '5%',
  },
  text: {
    color: 'grey',
  },
  lastBeer: {
    margin: '5%',
    marginTop: 0,
    padding: 10,
    backgroundColor: 'gold',
    textAlign: 'center',
    fontSize: 15,
    elevation: 5,
    borderRadius: 10,
    fontWeight: '400',
    width: '90%',
  },
  shareView: {
    flexDirection: 'row',
  },
  shareButton: {
    height: 30,
    width: 30,
    opacity: 0.3,
    margin: 20,
    alignItems: 'center',
  },
});
