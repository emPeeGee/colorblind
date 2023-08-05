import React, { useCallback, Component, useEffect, useState } from 'react';
import { Text, Button, View, StatusBar } from 'react-native';
import { Routes } from './screens/Routes';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          dogbyte: require('./assets/fonts/dogbyte.otf')
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsFontLoaded(true);
      }
    }

    prepare();
  }, []);

  // const onLayoutRootView = useCallback(async () => {
  //   if (isFontLoaded) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [isFontLoaded]);

  if (!isFontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <Routes />
    </>
  );
}
