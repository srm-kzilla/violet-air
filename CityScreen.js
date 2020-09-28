import React from "react";
import {
  Button,
  Divider,
  Icon,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useCityStats } from "./CityAir";
import { useCityFavorite } from "./CityFavorites";

function BackIcon(props) {
  return <Icon {...props} name="arrow-back" />;
}

function FavoriteRow({ city }) {
  const [isSubscribed, setIsSubscribed] = useCityFavorite(city);
  const theme = useTheme();
  return (
    <>
      <View style={styles.favoriteRow}>
        <Button
          onPress={() => {
            setIsSubscribed(!isSubscribed);
          }}
          status={isSubscribed ? "basic" : "info"}
        >
          {isSubscribed ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </View>
      <Icon
        name={isSubscribed ? "star" : "star-outline"}
        style={styles.favoriteIcon}
        fill={theme["color-info-400"]}
      />
    </>
  );
}

export default function CityScreen({ route, navigation }) {
  const { city } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );
  const stats = useCityStats(city.cityId);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title={city.name}
        alignment="center"
        accessoryLeft={BackAction}
      />
      <Divider />
      <Layout style={styles.layout}>
        {stats && (
          <>
            <View style={styles.valueRow}>
              <Text category="h4">PM2.5</Text>
              <Text>{stats.avgPM2_5.toFixed(0)}</Text>
            </View>
            <View style={styles.valueRow}>
              <Text category="h4">Temperature</Text>
              <Text>{stats.avgTempF.toFixed(0)}°F</Text>
            </View>
            <View style={styles.valueRow}>
              <Text category="h4">Humidity</Text>
              <Text>{stats.avgHumidity.toFixed(0)}%</Text>
            </View>
            <View style={styles.valueRow}>
              <Text category="h4">Sensor Count</Text>
              <Text>{stats.sensorCount}</Text>
            </View>
            <View style={styles.valueRow}>
              <Text category="h4">Population</Text>
              <Text>{stats.population}</Text>
            </View>
          </>
        )}
        <FavoriteRow city={city} />
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  favoriteRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  favoriteIcon: {
    width: 32,
    height: 32,
    position: "absolute",
    right: 0,
    bottom: 20,
  },
  container: { flex: 1 },
  layout: { flex: 1, paddingHorizontal: 12 },
});
