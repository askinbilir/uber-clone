import React, { useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_MAPS_API_KEY } from "@env";
import {
	selectDestination,
	selectOrigin,
	setTravelTimeInformation,
} from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";

const Map = () => {
	const origin = useSelector(selectOrigin);
	const destination = useSelector(selectDestination);
	const mapRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!origin || !destination) return;

		const getTravelTime = async () => {
			const URL = `https://maps.googleapis.com/maps/api/distancematrix/json
			?units=imperial&origins=${origin.description}&destinations=${destination.description}
			&key=${GOOGLE_MAPS_API_KEY}`;

			await fetch(URL)
				.then((response) => response.json())
				.then((data) => {
					const travelTime = data.rows[0].elements[0];
					dispatch(setTravelTimeInformation(travelTime));
				});
		};

		getTravelTime();
	}, [origin, destination, GOOGLE_MAPS_API_KEY]);

	return (
		<MapView
			ref={mapRef}
			mapType="mutedStandard"
			initialRegion={{
				latitude: origin.location.lat,
				longitude: origin.location.lng,
				latitudeDelta: 0.005,
				longitudeDelta: 0.005,
			}}
			style={tw`flex-1`}
		>
			{origin && destination && (
				<MapViewDirections
					origin={origin.description}
					destination={destination.description}
					apikey={GOOGLE_MAPS_API_KEY}
					strokeWidth={3}
					strokeColor="black"
					onReady={(result) => {
						mapRef.current.fitToCoordinates(result.coordinates, {
							edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
							animated: true,
						});
					}}
				/>
			)}

			{origin?.location && (
				<Marker
					coordinate={{
						latitude: origin.location.lat,
						longitude: origin.location.lng,
					}}
					title="Origin"
					description={origin.description}
					identifier="origin"
				/>
			)}

			{destination?.location && (
				<Marker
					coordinate={{
						latitude: destination.location.lat,
						longitude: destination.location.lng,
					}}
					title="Destination"
					description={destination.description}
					identifier="destination"
				/>
			)}
		</MapView>
	);
};

export default Map;