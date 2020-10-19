import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import {
  Layout,
  Text,
  Input,
  Icon,
  Card,
  TopNavigation,
  Divider,
} from "@ui-kitten/components";
import { useCitySearch } from "./Cities";
import { useCityFavorite, useFavorites } from "./CityFavorites";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import CityScreen from "./CityScreen";

function CityRow({ city }) {
  const { navigate } = useNavigation();
  return (
    <Card
      style={styles.cityRowCard}
      onPress={() => {
        navigate("City", { city });
      }}
    >
      <View style={styles.cityCardRow}>
        <View style={styles.cityCardText}>
          <Text>
            {city.name}, {city.country}
          </Text>
        </View>
      </View>
    </Card>
  );
}

function CitiesSearch({ filter }) {
  const cities = useCitySearch(filter);
  if (!cities) {
    return null;
  }
  return cities.map((city) => <CityRow city={city} key={city.cityId} />);
}

function SearchIcon(props) {
  return <Icon {...props} name="search-outline" />;
}

function FavoriteCities() {
  const favorites = useFavorites();
  if (!favorites) return null;
  return favorites.map((city) => <CityRow city={city} key={city.cityId} />);
}

function HomeScreen() {
  const [citySearch, setCitySearch] = React.useState("");

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation title="Violet Air" alignment="center" />
      <Divider />
      <Layout style={styles.layout}>
        <Input
          value={citySearch}
          style={styles.input}
          placeholder="Search for your City"
          accessoryLeft={SearchIcon}
          accessoryRight={(props) => {
            if (citySearch === "") return null;
            return (
              <TouchableWithoutFeedback
                onPress={() => {
                  setCitySearch("");
                }}
              >
                <Icon {...props} name="close-circle-outline" />
              </TouchableWithoutFeedback>
            );
          }}
          onChangeText={setCitySearch}
        />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
        >
          {citySearch ? (
            <CitiesSearch filter={citySearch} />
          ) : (
            <FavoriteCities />
          )}
        </ScrollView>
      </Layout>
    </SafeAreaView>
  );
}

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="City" component={CityScreen} />
    </HomeStack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
  },
  input: { marginTop: 12, marginHorizontal: 12 },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    padding: 12,
  },
  cityRowCard: {
    marginBottom: 8,
  },
  cityCardRow: {
    flexDirection: "row",
  },
  cityCardText: {
    flex: 1,
  },
});
