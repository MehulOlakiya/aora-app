import { Link, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import {useFonts} from 'expo-font'
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync()

export default function App() {
    const [fontLoaded ,error] =useFonts({
        "Poppins-Black":require('../assets/fonts/Poppins-Black.ttf'),
        "Poppins-Bold":require('../assets/fonts/Poppins-Bold.ttf'),
        "Poppins-ExtraBold":require('../assets/fonts/Poppins-ExtraBold.ttf'),
        "Poppins-ExtraLigth":require('../assets/fonts/Poppins-ExtraLight.ttf'),
        "Poppins-Light":require('../assets/fonts/Poppins-Light.ttf'),
        "Poppins-Medium":require('../assets/fonts/Poppins-Medium.ttf'),
        "Poppins-Regular":require('../assets/fonts/Poppins-Regular.ttf'),
        "Poppins-SemiBold":require('../assets/fonts/Poppins-SemiBold.ttf'),
        "Poppins-Thin":require('../assets/fonts/Poppins-Thin.ttf'),

    })

    useEffect(()=>{
        if(error) throw   error
        if(fontLoaded) SplashScreen.hideAsync()
    },[])

    if(!fontLoaded && !error) return null

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-4xl">Aora!</Text>
      <StatusBar style="auto" />
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}

