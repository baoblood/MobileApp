import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cài Đặt</Text>
      <Text>Đây là trang cài đặt</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
