import React from "react";
import * as eva from "@eva-design/eva";
import HomeStackScreen from "./HomeScreen";
import SettingsStackScreen from "./SettingsScreen";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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

const Tab = createBottomTabNavigator();

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={THEME}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Settings" component={SettingsStackScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  </>
);
