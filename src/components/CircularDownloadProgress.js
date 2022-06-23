import React from "react";
import { StyleSheet, View } from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";

const CircularDownloadProgress = () => {
  return (
    <CircularProgress
      value={100}
      radius={80}
      // duration={3700}
      duration={30700}
      progressValueColor={"#ecf0f1"}
      titleStyle={{ color: "#ecf0f1", fontSize: 18 }}
      subtitleStyle={{ color: "#ecf0f1", fontSize: 10 }}
      activeStrokeColor={"#2465FD"}
      // activeStrokeSecondaryColor={"#ecf0f1"}
      activeStrokeSecondaryColor={"#000000"}
    />
  );
};

export default CircularDownloadProgress;
