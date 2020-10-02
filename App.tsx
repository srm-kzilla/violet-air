import React from "react";
import * as eva from "@eva-design/eva";
import HomeScreen, { City } from "./HomeScreen";
import CityScreen from "./CityScreen";
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

export type RootStackParamList = {
  Home: undefined;
  City: { city: City };
};

const Stack = createStackNavigator<RootStackParamList>();

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={THEME}>
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="City" component={CityScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
