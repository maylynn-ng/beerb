import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Image, Text, View, StyleSheet } from 'react-native';
import { Badge } from '../Models/Badge.model';
import { AppDispatch } from '../Models/Redux.model';
import Topbar from '../Components/Topbar';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Achievements({ badges, allBadges, navigation, user }: any) {
  const [currentAward, setCurrentAward] = useState('');

  useEffect(() => {
    setCurrentAward('');
  }, [navigation]);

  const badgeNames: string[] = badges.map((badge: Badge) => badge.badgeName);

  return (
    <View style={styles.mainContainer}>
      <Topbar
        navigation={navigation}
        user={user}
        currentBorough="ACHIEVEMENTS"
        allBadges={allBadges}
      />
      <Text style={styles.currentAward}>{currentAward}</Text>
      <View style={styles.container}>
        {allBadges.map((badge: Badge, index: number) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                setCurrentAward(badge.badgeText);
              }}
            >
              <Image
                style={[styles.badge, { opacity: badgeNames.includes(badge.badgeName) ? 1 : 0.3 }]}
                source={{ uri: badge.badgeImage }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
}

function mapStateToProps(state: any) {
  return {
    badges: state.user.badges,
    allBadges: state.allBadges,
    user: state.user,
  };
}

// function mapDispatch(dispatch: AppDispatch) {
//   return {
//     populateBadges: () => dispatch(getBadges()),
//   };
// }

export default connect(mapStateToProps)(Achievements);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  currentAward: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  container: {
    height: '100%',
    width: '100%',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  badge: {
    height: 100,
    width: 100,
  },
  text: {
    color: 'gray',
    fontSize: 10,
  },
});
