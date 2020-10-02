import React from "react";
import * as eva from "@eva-design/eva";
import HomeScreen from "./HomeScreen";
import CityScreen from "./CityScreen";
import SplashScreen from './SplashScreen';
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const THEME = {
  ...eva.light,
  "color-primary-100": "#F2F6FF",
  "color-primary-200": "#e9E4FF",
  "color-primary-300": "#c6C1FF",
  "color-primary-400": "#898BFF",
  "color-primary-500": "#7366FF",
  "color-primary-600": "#574BDB",
  "color-primary-700": "#4A34B8",
  "color-primary-800": "#402694",
  "color-primary-900": "#291C7A",
};

const AppStack = createStackNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator headerMode="none">
    <AppStack.Screen name="Home" component={HomeScreen} />
    <AppStack.Screen name="City" component={CityScreen} />
  </AppStack.Navigator>
);

const RootStack = createStackNavigator();

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={THEME}>
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="App" component={AppStackScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
