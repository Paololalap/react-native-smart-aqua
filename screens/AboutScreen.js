import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";

export default function About() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.centerContent}>
        <Image
          source={require("../assets/icon.png")}
          style={[
            styles.headerImage,
            {
              width: 300,
              height: 300,
            },
          ]}
        />
        <Text style={[styles.header, { marginTop: 15 }]}>
          <Text style={{ color: "#7BAA13" }}>Smart </Text>
          <Text style={{ color: "#4E96A9" }}>Aqua</Text>
        </Text>
        <Text style={[styles.description, { width: 250 }]}>
          An app integrating Internet of Things to monitor the water quality of
          the aquaponics.
        </Text>
        <Text style={[styles.description, { width: 300 }]}>
          Leaf: The leaf typically symbolizes nature, growth, and a green,
          eco-friendly approach to things. It could suggest that the
          organization or product it represents is environmentally conscious.
        </Text>
        <Text style={[styles.description, { width: 300 }]}>
          Computer Monitor with Gear and Wifi: This indicates technology,
          specifically something related to computing or information technology.
          The gear suggests engineering or mechanics, while the wifi could imply
          the use of an internet connection. Mobile Device: The presence of what
          appears to be a smartphone or tablet indicates a focus on mobile
          technology or services that are accessible on the go.
        </Text>
        <Text style={[styles.description, { width: 300, marginBottom: 15 }]}>
          Fish: The fish, swimming below the technology icons, could represent
          aquatic life oran emphasis on marine environments. It might also
          symbolize adaptability and the concept of being 'always moving'. The
          circular arrangement suggests completeness or a holistic
          approach,integrating these elements into a unified service or
          philosophy. The logo might belong to a company that specializes in
          eco-friendly technology solutions, perhaps with a focus on performance
          optimization, and that values the balance between technological
          advancement and environmental sustainability. The colors, teal and
          green, further reinforce the theme of technology (often associated
          with blue tones) merged with a natural or eco-friendly (green tones)
          focus.
        </Text>
        <View style={styles.hr} />
        <Text style={[styles.header, {marginBottom: 20}]}>
          Meet Our Team
        </Text>
        <Image
          source={require("../assets/teamPictures/paoloLalap.jpg")}
          style={styles.image}
        />
        <Text
          style={[styles.description, { marginTop: 10, marginVertical: 10, fontSize: 24, fontWeight: 'bold' }]}
        >
          Paolo Lalap
        </Text>
        <View style={[styles.hr, {width: 250}]} />
        <Image
          source={require("../assets/teamPictures/wencySalta.jpg")}
          style={styles.image}
        />
        <Text
          style={[styles.description, { marginTop: 10, marginVertical: 10, fontSize: 24, fontWeight: 'bold' }]}
        >
          Wency Salta
        </Text>
        <View style={[styles.hr, {width: 250}]} />
        <Image
          source={require("../assets/teamPictures/carlDolores.jpg")}
          style={styles.image}
        />
        <Text
          style={[styles.description, { marginTop: 10, marginBottom: 20, fontSize: 24, fontWeight: 'bold' }]}
        >
          Carl Dolores
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
  },
  centerContent: {
    alignItems: "center",
  },
  headerImage: {
    borderRadius: 25,
    borderColor: "gray",
    borderWidth: 2,
    overflow: "hidden",
    elevation: -2,
    backgroundColor: "white",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    width: "80%", 
    marginVertical: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 200,
  },
  description: {
    marginTop: 15,
    textAlign: "justify",
  },
});
