import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Layout, Text, Input, Icon, Card, Button } from "@ui-kitten/components";
import { useCitySearch } from "./Cities";
import { useCityFavorite, useFavorites } from "./CityFavorites";

function CityRow({ city }) {
  const [isSubscribed, setIsSubscribed] = useCityFavorite(city);
  return (
    <Card style={styles.cityRowCard}>
      <View style={styles.cityCardRow}>
        <View style={styles.cityCardText}>
          <Text>
            {city.name}, {city.country}
          </Text>
        </View>
        <Button
          onPress={() => {
            setIsSubscribed(!isSubscribed);
          }}
        >
          {isSubscribed ? "Unsubscribe" : "Subscribe"}
        </Button>
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
    <Layout style={styles.layout}>
      <Text category="h1" status="primary">
        violet air
      </Text>
      <Input
        value={citySearch}
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
      <ScrollView style={styles.scrollView}>
        {citySearch ? <CitiesSearch filter={citySearch} /> : <FavoriteCities />}
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 12,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    alignSelf: "stretch",
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
