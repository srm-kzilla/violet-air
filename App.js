import React from "react";
import { StyleSheet } from "react-native";
import * as eva from "@eva-design/eva";
import HomeScreen from "./HomeScreen";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider
      {...eva}
      theme={{
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
      }}
    >
      <HomeScreen />
    </ApplicationProvider>
  </>
);
