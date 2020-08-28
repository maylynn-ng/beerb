import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { Video } from 'expo-av';
import { connect } from 'react-redux';

import { setUserInfo, changeLoading } from '../redux/actions';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from '../Components/Navigation';
import Loading from './Loading';
import { AppDispatch, Action } from '../Models/Redux.model';
import { State } from '../redux/reducers';
import { User } from '../Models/User.model';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const auth0ClientId: any = process.env.REACT_NATIVE_AUTH0_CLIENT_ID;
const authorizationEndpoint: any = process.env.REACT_NATIVE_AUTH_ENDPOINT;

const Login = ({
  user,
  setUser,
  isLoading,
  setLoading,
}: {
  user: User;
  setUser: (user: User) => Action;
  isLoading: boolean;
  setLoading: (status: boolean) => Action;
}): JSX.Element => {
  useEffect(() => {
    try {
      setLoading(true);
      AsyncStorage.getItem('@session_token').then(value => {
        if (value) {
          setUser(JSON.parse(value));
        }
      });
    } catch (error) {
      console.info('error while fetching session token');
      setUser({});
    }
  }, []);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      responseType: 'id_token',
      scopes: ['openid', 'profile'],
      extraParams: {
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        setLoading(false);
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded: any = jwtDecode(jwtToken);
        setUser(decoded);
        AsyncStorage.setItem('@session_token', JSON.stringify(decoded));
      }
    }
  }, [result]);

  useEffect(() => {
    user.sub === '' && setLoading(false);
  }, [user.sub]);

  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        overflow: 'visible',
      }}
    >
      {isLoading ? <Loading /> : null}
      {!user.sub ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isLoading ? 0 : 1,
          }}
        >
          <Video
            source={require('../assets/AniLogo.mp4')}
            rate={0.7}
            isMuted={true}
            resizeMode="cover"
            shouldPlay
            isLooping={false}
            style={{ height: 400, width: 400 }}
          />
          <TouchableOpacity
            style={{
              backgroundColor: 'gold',
              paddingHorizontal: 50,
              paddingVertical: 10,
              borderRadius: 10,
              position: 'relative',
              top: -50,
              elevation: 10,
            }}
            onPress={() => {
              setLoading(true);
              promptAsync({ useProxy });
            }}
          >
            <Text style={{ fontWeight: '700', fontSize: 22 }}>Hops in!</Text>
          </TouchableOpacity>
          <Text
            style={{ position: 'absolute', bottom: 30, paddingHorizontal: 30, textAlign: 'center' }}
          >
            BeerB is an app to explore London's boroughs and have fun while drinking beer.
          </Text>
          <Text
            style={{
              position: 'absolute',
              bottom: 10,
              paddingHorizontal: 30,
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Please drink responsibly
          </Text>
        </View>
      ) : (
        <Navigation />
      )}
    </View>
  );
};

function mapStateToProps(state: State) {
  return {
    user: state.user,
    isLoading: state.isLoading,
  };
}

function mapDispatch(dispatch: AppDispatch) {
  return {
    setUser: (user: User) => dispatch(setUserInfo(user)),
    setLoading: (status: boolean) => dispatch(changeLoading(status)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Login);
