import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';

import { setUserInfo } from '../redux/actions';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import Navigation from '../Components/Navigation';

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });
const auth0ClientId: any = process.env.REACT_NATIVE_AUTH0_CLIENT_ID;
const authorizationEndpoint: any = process.env.REACT_NATIVE_AUTH_ENDPOINT;

const Login = ({ user, setUser }: any) => {
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
    try {
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

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
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

  return (
    <View style={{ width: '100%', height: '100%' }}>
      {!user.sub ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/logo.png')} style={{ height: 250, width: 250 }} />
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
            onPress={() => promptAsync({ useProxy })}
          >
            <Text style={{ fontWeight: '700', fontSize: 22 }}>Hops in!</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Navigation />
      )}
    </View>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.user,
  };
}

function mapDispatch(dispatch: any) {
  return {
    setUser: (user: object) => dispatch(setUserInfo(user)),
  };
}

export default connect(mapStateToProps, mapDispatch)(Login);
