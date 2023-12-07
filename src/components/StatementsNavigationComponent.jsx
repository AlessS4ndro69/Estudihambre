import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton } from "react-native-paper";

const StatementNavigation = ({ statements, navigateTo, currentPage, handleHelp }) => {
  

  /*const navigateTo = (direction) => {
    const nextPage = direction === "next" ? currentPage + 1 : currentPage - 1;
    if (nextPage >= 1 && nextPage <= statements.length) {
      setCurrentPage(nextPage);
    }
  };*/

  const handleWildcardPress = () => {
    // Implement your wildcard functionality here
    console.log("Wildcard pressed!");
  };

  return (
    <View style={styles.container}>
      <IconButton
        icon="arrow-left"
        color="#3498db"
        size={30}
        onPress={() => navigateTo("prev")}
      />
      <View style={styles.pageContainer}>
        <Text style={styles.pageText}>{currentPage+1}/{statements.length}</Text>
      </View>
      <TouchableOpacity onPress={handleHelp}>
        <IconButton
          icon="star"
          color="#3498db"
          size={30}
        />
      </TouchableOpacity>
      <IconButton
        icon="arrow-right"
        color="#3498db"
        size={30}
        onPress={() => navigateTo("next")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ecf0f1",
  },
  pageContainer: {
    alignItems: "center",
  },
  pageText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
  },
});

export default StatementNavigation;
