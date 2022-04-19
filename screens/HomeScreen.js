import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

import NavOptions from "../components/NavOptions";
import { setDestination, setOrigin } from "../slices/navSlice";
import NavFavorites from "../components/NavFavorites";

const HomeScreen = () => {
	const dispatch = useDispatch();

	return (
		<SafeAreaView style={tw`h-full bg-white`}>
			<View style={tw`p-5`}>
				<Image
					style={[tw`h-24 w-24`, { resizeMode: "contain" }]}
					source={{
						uri: "https://links.papareact.com/gzs",
					}}
				/>

				<GooglePlacesAutocomplete
					placeholder="Where From?"
					nearbyPlacesAPI="GooglePlacesSearch"
					debounce={400}
					enablePoweredByContainer={false}
					fetchDetails={true}
					query={{
						key: GOOGLE_MAPS_API_KEY,
						language: "en",
					}}
					styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
					onPress={(data, details = null) => {
						dispatch(
							setOrigin({
								location: details.geometry.location,
								description: data.description,
							})
						);

						dispatch(setDestination(null));
					}}
				/>

				<NavOptions />
				<NavFavorites />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
