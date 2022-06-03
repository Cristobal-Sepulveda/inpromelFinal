import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  Grid,
  BarChart,
  YAxis,
  XAxis,
  LineChart,
} from "react-native-svg-charts";
import SwitchGraficos from "../components/SwitchGraficos";

const Graficos = ({}) => {
  const [graficoEnBarra, setGraficoEnBarra] = useState(false);
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const contentInset = { top: 10, bottom: 10 };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Image
          style={{ width: 25, height: 10 }}
          source={require("../../assets/icons/flechaArriba.png")}
        />
        <View></View>
        <View></View>
        <View></View>
        <View style={styles.lineSheets} />
        <View></View>
        <View></View>
        <View></View>
        <Image
          style={{ width: 25, height: 10 }}
          source={require("../../assets/icons/flechaArriba.png")}
        />
      </View>
      <Text style={{ alignSelf: "center", marginVertical: 20, fontSize: 20 }}>
        Elije el gráfico que deseas visualizar
      </Text>
      <SwitchGraficos
        graficoEnBarra={graficoEnBarra}
        setGraficoEnBarra={setGraficoEnBarra}
        style={styles.switch}
      />

      {!graficoEnBarra ? (
        <View>
          <View style={{ height: 200, padding: 20 }}>
            <LineChart
              style={{ flex: 1 }}
              data={data}
              gridMin={0}
              contentInset={{ top: 10, bottom: 10 }}
              svg={{ stroke: "rgb(134, 65, 244)" }}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10 }}
              data={data}
              formatLabel={(value, index) => index}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: "black" }}
            />
          </View>
        </View>
      ) : (
        <View style={{ height: 200, flexDirection: "row" }}>
          <YAxis
            data={data}
            contentInset={contentInset}
            svg={{
              fill: "grey",
              fontSize: 10,
            }}
            numberOfTicks={10}
            formatLabel={(value) => `${value}ºC`}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={data}
            svg={{ stroke: "rgb(134, 65, 244)" }}
            contentInset={contentInset}
          >
            <Grid />
          </LineChart>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  switch: {},
  lineSheets: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 6,
    borderRadius: 5,
    width: "25%",
  },
});

export default Graficos;
