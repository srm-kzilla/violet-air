import React, { useState } from "react";
import {
  Button,
  Divider,
  Icon,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from "@ui-kitten/components";
import { StyleSheet, View, ImageProps } from "react-native";
import { useCity, CityStats as CityStatsType } from "./CityAir";
import { useCityFavorite } from "./CityFavorites";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import { City } from "./HomeScreen";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "./App";

type Props = StackScreenProps<RootStackParamList, 'City'>;

function BackIcon(props: Partial<ImageProps> | undefined) {
  return <Icon {...props} name="arrow-back" />;
}

function MapIcon(props: Partial<ImageProps> | undefined) {
  return <Icon {...props} name="map" />;
}
function InfoIcon(props: Partial<ImageProps> | undefined) {
  return <Icon {...props} name="info" />;
}

function FavoriteRow({ city }:{ city: City }) {
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

function CityStats({ city }:{ city: City }) {
  const stats = useCity(city.cityId);
  return (
    <Layout style={styles.layout}>
      {stats && (
        <>
          {stats.avgPM2_5 && (
            <View style={styles.valueRow}>
              <Text category="h4">PM2.5</Text>
              <Text>{stats.avgPM2_5.toFixed(0)}</Text>
            </View>
          )}
          {stats.avgTempF && (
            <View style={styles.valueRow}>
              <Text category="h4">Temperature</Text>
              <Text>{stats.avgTempF.toFixed(0)}°F</Text>
            </View>
          )}
          {stats.avgHumidity && (
            <View style={styles.valueRow}>
              <Text category="h4">Humidity</Text>
              <Text>{stats.avgHumidity.toFixed(0)}%</Text>
            </View>
          )}
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
  );
}
function Map({ fullCity }:{ fullCity: CityStatsType }) {
  return (
    <MapView
      initialRegion={{
        latitude: fullCity?.lat,
        longitude: fullCity?.lon,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
      style={{ flex: 1 }}
    >
      {fullCity.sensors.map(
        (sensor) =>
          sensor.PM2_5Value && (
            <Marker
              key={sensor.ID}
              coordinate={{
                latitude: sensor.Lat,
                longitude: sensor.Lon,
              }}
              title={sensor.Label}
              description={sensor.PM2_5Value && `PM2.5 = ${sensor.PM2_5Value}`}
            />
          )
      )}
    </MapView>
  );
}
function CityMap({ city }: { city: City }) {
  const fullCity = useCity(city.cityId);
  if (!fullCity)
    return (
      <Layout style={styles.spinnerLayout}>
        <Spinner />
      </Layout>
    );
  return <Map fullCity={fullCity} />;
}

export default function CityScreen({ route, navigation }: Props) {
  const { city } = route.params;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const [isMapView, setIsMapView] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <TopNavigation
        title={city.name}
        alignment="center"
        accessoryLeft={BackAction}
        accessoryRight={() =>
          isMapView ? (
            <TopNavigationAction
              icon={InfoIcon}
              onPress={() => {
                setIsMapView(false);
              }}
            />
          ) : (
            <TopNavigationAction
              icon={MapIcon}
              onPress={() => {
                setIsMapView(true);
              }}
            />
          )
        }
      />
      <Divider />
      {isMapView ? <CityMap city={city} /> : <CityStats city={city} />}
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
  spinnerLayout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
