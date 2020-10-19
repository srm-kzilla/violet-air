import React from "react";
import {
  StyleSheet
} from "react-native";
import {
  Layout,
  Text,
  Icon,
  TopNavigation,
  Divider,
  TopNavigationAction
} from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";

const SettingsStack = createStackNavigator();

export default function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator headerMode="none">
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Preferences" component={PreferencesScreen} />
    </SettingsStack.Navigator>
  );
}

function SettingsScreen({ navigation }) {

  const PreferencesAction = () => (
    <TopNavigationAction icon={gearIcon} onPress={() => navigation.navigate('Preferences')} />
  );

  const gearIcon = (props) => (
    <Icon {...props} name="settings-2-outline" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation 
        title="Settings" 
        alignment="center"
        accessoryRight={PreferencesAction}
      />
      <Divider />
      <Layout>
        <Text>Settings works</Text>
      </Layout>
    </SafeAreaView>
  );
}

function PreferencesScreen({ navigation }) {

  function BackIcon(props) {
    return <Icon {...props} name="arrow-back" />;
  }

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation 
        title="Preferences" 
        alignment="center" 
        accessoryLeft={BackAction}/>
      <Divider />
      <Layout>
        <Text>Preferences Works!</Text>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})