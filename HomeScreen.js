import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Layout, Text, Input, Icon, Card } from "@ui-kitten/components";
import { useCitySearch } from "./Cities";

function CityRow({ city }) {
  return (
    <Card style={styles.cityRowCard}>
      <Text>
        {city.name}, {city.country}
      </Text>
    </Card>
  );
}

function CitiesList({ filter }) {
  const cities = useCitySearch(filter);
  if (!cities) {
    return null;
  }
  return cities.map((city) => <CityRow city={city} key={city.cityId} />);
}

function SearchIcon(props) {
  return <Icon {...props} name="search-outline" />;
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
        onChangeText={setCitySearch}
      />
      <ScrollView style={styles.scrollView}>
        <CitiesList filter={citySearch} />
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
});
