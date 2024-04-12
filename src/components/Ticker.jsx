import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, Image, Text } from "react-native";

const Ticker = ({ tracks, navigation }) => {
  const handlePress = (id) => {
    navigation.navigate("rtockScreen", { id });
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      {tracks.map((track, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(track.data.id)}
        >
          <Image
            source={{
              uri: track.data.albumOfTrack.coverArt.sources[0].url,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={{ width: 200 }}>
            {track.data.name} by {track.data.artists.items[0].profile.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};
export default Ticker;
