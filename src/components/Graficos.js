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
import { connect } from "react-redux";
import * as Types from "../store/actions/types";
import { select_pendientes } from "../model";

const Graficos = ({ selectPendientes }) => {
  const [graficoEnBarra, setGraficoEnBarra] = useState(true);
  const [pendientesList, setPendientesList] = useState([0, 0, 0]);
  const [yNumber, setYNumber] = useState(0);
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];
  const contentInset = { top: 10, bottom: 10 };
  const [listaVacia, setListaVacia] = useState();

  const obtenerPendientes = async () => {
    const aux = await select_pendientes();
    let urgente = 0;
    let planificada = 0;
    let noUrgente = 0;
    const pendientes = aux.rows._array;
    if (pendientes.length === 0) {
      setListaVacia(true);
      return;
    }
    for (let i = 0; i < pendientes.length; i++) {
      console.log(pendientes[i]);
      if (pendientes[i].topico === "Urgente") {
        console.log("Urgente");
        const cantidad = pendientesList;
        console.log(cantidad);
        setPendientesList([cantidad[0]++, cantidad[1], cantidad[2]]);
        urgente++;
        console.log(pendientesList);
      }
      if (pendientes[i].topico === "Planificada") {
        console.log("Planificado");
        const cantidad = pendientesList;
        console.log(cantidad);
        setPendientesList([cantidad[0], cantidad[1]++, cantidad[2]]);
        planificada++;
        console.log(pendientesList);
      }
      if (pendientes[i].topico === "No Urgente") {
        console.log("No Urgente");
        const cantidad = pendientesList;
        console.log(cantidad);
        setPendientesList([cantidad[0], cantidad[1], cantidad[2]++]);
        noUrgente++;
        console.log(pendientesList);
      }
    }
    setPendientesList(pendientesList);
    if (urgente >= planificada && urgente >= noUrgente) {
      setYNumber(urgente);
    }
    if (planificada >= urgente && planificada >= noUrgente) {
      setYNumber(planificada);
    }
    if (noUrgente >= urgente && noUrgente >= planificada) {
      setYNumber(noUrgente);
    }
    setListaVacia(false);
  };

  useEffect(() => {
    obtenerPendientes();
  }, []);

  return (
    <>
      {/* Cabecera */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {/* <Image
          style={{ width: 25, height: 10 }}
          source={require("../../assets/icons/flechaAbajo.png")}
        /> */}
        <View style={{ width: 25, height: 10 }} />
        <View></View>
        <View></View>
        <View></View>
        <View style={styles.lineSheets} />
        <View></View>
        <View></View>
        <View></View>
        <Image
          style={{ width: 25, height: 10 }}
          source={require("../../assets/icons/flechaAbajo.png")}
        />
      </View>

      {/* Body */}
      <Text style={{ alignSelf: "center", marginVertical: 20, fontSize: 20 }}>
        Elije el gráfico que deseas visualizar
      </Text>
      <SwitchGraficos
        graficoEnBarra={graficoEnBarra}
        setGraficoEnBarra={setGraficoEnBarra}
      />
      {/* Posibles Graficos */}
      {graficoEnBarra ? (
        <>
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: "5%" }}>
            Pendientes
          </Text>
          {listaVacia ? (
            <View
              style={{
                alignItems: "center",
                height: 200,
              }}
            >
              <Image
                source={require("../../assets/icons/playa.jpg")}
                style={{
                  borderRadius: 10,
                  width: "70%",
                  height: 150,
                  resizeMode: "contain",
                  marginTop: "2%",
                }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  marginEnd: "4%",
                  marginTop: "4%",
                }}
              >
                No tienes pendientes
              </Text>
            </View>
          ) : (
            <>
              <View
                style={{
                  height: 200,
                  padding: 20,
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <YAxis
                  data={pendientesList}
                  contentInset={contentInset}
                  svg={{
                    fill: "grey",
                    fontSize: 10,
                  }}
                  numberOfTicks={yNumber}
                  min={0}
                  formatLabel={(value) => `${value}`}
                />
                <BarChart
                  style={{ flex: 1 }}
                  data={pendientesList}
                  svg={{ fontSize: 5, fill: "#4285f4" }}
                  contentInset={contentInset}
                  spacingInner={0.7}
                  spacingOuter={0.5}
                  gridMin={0}
                >
                  <Grid />
                </BarChart>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  marginTop: "-5%",
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ marginStart: "14.9%" }}>Urgente</Text>
                <Text style={{ marginStart: "4.4%" }}>Planificado</Text>
                <Text style={{ marginEnd: "8%" }}>No Urgente</Text>
              </View>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={{ textAlign: "center", fontSize: 20, marginTop: "5%" }}>
            Tareas Completas
          </Text>
          <View style={{ height: 220, padding: 20 }}>
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
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  lineSheets: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 6,
    borderRadius: 5,
    width: "25%",
  },
});

const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({
  selectPendientes: () =>
    dispatch({
      type: Types.SELECT_PENDIENTES,
      payload: {},
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Graficos);
