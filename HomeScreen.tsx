import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageProps,
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
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export type City = {
  cityId: string;
  name: string;
  country: string;
};

export type Sensor = {
  ID: string | number;
  PM2_5Value?: string;
  Lat: number;
  Lon: number;
  Label: string;
}

function CityRow({ city }: { city: City }) {
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

function CitiesSearch({ filter }: { filter: string }): JSX.Element {
  const cities: City[] | null = useCitySearch(filter);
  if (!cities) {
    return <></>;
  }
  return (
    <>
      {cities.map((city: City) => (
        <CityRow city={city} key={city.cityId} />
      ))}
    </>
  );
}

function SearchIcon(props: Partial<ImageProps> | undefined) {
  return <Icon {...props} name="search-outline" />;
}

function FavoriteCities(): JSX.Element {
  const favorites = useFavorites();
  if (!favorites) return <></>;
  return (
    <>
      {favorites.map((city: City) => (
        <CityRow city={city} key={city.cityId} />
      ))}
    </>
  );
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
            if (citySearch === "") return <></>;
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
});
