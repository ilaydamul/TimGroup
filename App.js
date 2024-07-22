import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import LoadingOverlay from './components/UI/LoadingOverlay';

//SCREENS
import Login from './screens/Login';
import SecurityHome from './screens/SecurityHome';
import Home from './screens/Home';
import Audit from './screens/Audit';
import QR from './screens/QR';
import Menu from './screens/Menu';
import Documents from './screens/Documents';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen name='Menu' component={Menu} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

function SupervizorAuth() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Audit' component={Audit} />
        {/* <Stack.Screen name='SecurityHome' component={SecurityHome} /> */}
      </Stack.Navigator>
    </>
  )
}

function SecurityAuth() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SecurityHome' component={SecurityHome} />
        <Stack.Screen name='Documents' component={Documents} />
        <Stack.Screen name='QR' component={QR} />
      </Stack.Navigator>
    </>
  )
}

function AuthenticatedStack() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>


        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='QR' component={QR} />
        <Stack.Screen name='Documents' component={Documents} />

        <Stack.Screen name='Audit' component={Audit} />
        <Stack.Screen name='SecurityHome' component={SecurityHome} />

      </Stack.Navigator>
    </>
  )
}


function Root() {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        console.log(token);
        console.log(role);
        if (token) {
          authCtx.authenticate(token, role);
        }
      } catch (error) {
        console.error('Token alınırken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchToken();
  }, []);

  if (loading) {
    return <LoadingOverlay message={"Yükleniyor..."} />;
  }

  return (
    <NavigationContainer>
      {authCtx.isAuthenticated ?
        (authCtx.isSecurity ? <SecurityAuth /> : <SupervizorAuth />)
        // <AuthenticatedStack />
        : <AuthStack />}
    </NavigationContainer>
  );
}


export default () => {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
