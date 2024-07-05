import 'react-native-gesture-handler';
import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './screens/Login';

import AuthContextProvider, { AuthContext } from './store/auth-context';
import { globalS } from './constants/styles';
import { Colors } from './constants/colors';
import Loader from './components/Layout/Loader';
import LoadingOverlay from './components/UI/LoadingOverlay';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Audit from './screens/Audit';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


// function AdvertsStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name='Adverts' component={Adverts} options={{ headerShown: false }} />
//       <Stack.Screen name='AdvertDetail' component={AdvertDetail} options={{ headerShown: false }} />
//     </Stack.Navigator>
//   )
// }


function AuthStack() {
  return (
    <>
      <StatusBar style="light" />
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
      </Stack.Navigator>
    </>
  )
}

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <Text style={[globalS.logoTitle, { color: Colors.blue, marginBottom: 24, marginHorizontal: 16 }]}>FRC Hub</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  )
}


function AuthenticatedStack() {
  return (
    // <Stack.Navigator screenOptions={{ headerShown: false }} drawerContent={(props) => <CustomDrawer {...props} />}>
    <>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Audit' component={Audit} />
        <Stack.Screen name='Profile' component={Profile} />
      </Stack.Navigator>
    </>
  )
}

const style = StyleSheet.create({
  icon: {
    width: 30,
    alignItems: 'center',
  },
});

function Root() {
  const [loading, setLoading] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          authCtx.authenticate(token);
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
      {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <AuthContextProvider>
      <Root />
    </AuthContextProvider>
  );
}
