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
  Button,
  TopNavigation,
  Divider,
} from "@ui-kitten/components";
import { useCitySearch } from "./Cities";
import { useCityFavorite, useFavorites } from "./CityFavorites";
import { useCityStats } from './CityAir';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const PM25avgLimit = 50;

function CityRow({ city }) {
  const { navigate } = useNavigation();
  city.stats = useCityStats( city.cityId );
  
  function cityHasAlert(avgPM2_5 = 0) {
    return avgPM2_5 >= PM25avgLimit;
  }
  const cityCardAlert = cityHasAlert(city.stats?.avgPM2_5) ? styles.cityCardAlert : '';
  const cityCardAlertText = cityHasAlert(city.stats?.avgPM2_5) ? styles.cityCardAlertText : '';
  const cityAlertIcon = cityHasAlert(city.stats?.avgPM2_5) ? '⚠️' : '';
  
  return (
    <Card
      style={styles.cityRowCard, cityCardAlert}
      onPress={() => {
        navigate("City", { city });
      }}
    >
      <View style={styles.cityCardRow}>
        <View style={styles.cityCardText}>
          <Text style={cityCardAlertText}>
            {city.name}, {city.country} {cityAlertIcon}
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

export default function HomeScreen() {
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
  cityCardAlert : {
    backgroundColor : 'red'
  },
  cityCardAlertText : {
    color : 'white'
  },
  leftText : {
    textAlign : "left"
  },
  rightText : {
    textAlign : "right"
  }
});
