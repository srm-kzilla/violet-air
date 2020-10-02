import React, { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SplashScreen({ navigation }) {
	useEffect(() => {
		const timer = setTimeout(() => {

			navigation.replace('App');

		}, 1500);
		
		return () => clearTimeout(timer);
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<Image source={require('./assets/icon.png')} style={styles.backgroundImage} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		flex: 1,
		resizeMode: 'contain', // or 'stretch		
	}
});