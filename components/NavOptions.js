import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const data = [
	{
		id: "123",
		title: "Get a ride",
		image: "https://links.papareact.com/3pn",
		screen: "MapScreen",
	},
	{
		id: "456",
		title: "Order food",
		image: "https://links.papareact.com/28w",
		screen: "EatScreen",
	},
];

const NavOptions = () => {
	const navigation = useNavigation();
	const origin = useSelector(selectOrigin);

	return (
		<FlatList
			horizontal
			data={data}
			keyExtractor={(item) => item.id}
			renderItem={({ item }) => (
				<TouchableOpacity
					style={tw`pr-2 pl-8 pb-8 pt-4 m-2 w-40 bg-gray-200`}
					onPress={() => navigation.navigate(item.screen)}
					disabled={!origin}
				>
					<View style={!origin && tw`opacity-20`}>
						<Image
							style={{ width: 120, height: 120, resizeMode: "contain" }}
							source={{
								uri: item.image,
							}}
						/>

						<Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
						
						<Icon
							name="arrowright"
							type="antdesign"
							color="white"
							style={tw`p-2 bg-black rounded-full w-10 mt-4`}
						/>
					</View>
				</TouchableOpacity>
			)}
		/>
	);
};

export default NavOptions;
