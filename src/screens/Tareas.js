import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Graficos from "../components/Graficos";
import { connect } from "react-redux";
import * as Types from "../store/actions/types";
import { Snackbar } from "react-native-paper";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tareas = ({ isBottomSheetFullOpen, redux }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [showSnackBar, setShowSnackBar] = useState(false);

  const onDismissSnackBar = () => {
    setShowSnackBar(false);
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  const sendNotification = (token) => {
    console.log(redux.pendientes);
    const aux = redux.pendientes.length;
    if (redux.pendientes.length !== 0) {
      fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: token,
          title: "Inpromel",
          body: "Tus " + aux + " pendientes han sido notificados.",
          data: { data: "goes here" },
          _displayInForeground: true,
        }),
      });
    } else {
      setShowSnackBar(true);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  /** Layout */
  return (
    <View style={{ marginTop: 20 }}>
      {isBottomSheetFullOpen ? (
        <>
          <Graficos />
        </>
      ) : (
        <>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            {/* <Image
              style={{ width: 25, height: 10 }}
              source={require("../../assets/icons/flechaArriba.png")}
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
              source={require("../../assets/icons/flechaArriba.png")}
            />
          </View>

          <TouchableOpacity
            style={{ ...styles.button, marginTop: "12%" }}
            onPress={() => sendNotification(expoPushToken)}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Notificar Pendientes
            </Text>
          </TouchableOpacity>
        </>
      )}
      <Snackbar
        visible={showSnackBar}
        onDismiss={onDismissSnackBar}
        duration={2000}
        style={styles.snackBar}
      >
        No Tienes Pendientes para notificar
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: "#4285f4",
    width: "46%",
    marginTop: "5%",
    alignSelf: "center",
  },
  snackBar: {
    bottom: -12,
    alignSelf: "center",
    width: "73.7%",
    backgroundColor: "#696969",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
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
  insertLocation: (location) =>
    dispatch({
      type: Types.INSERT_LOCATION,
      payload: {
        location,
      },
    }),
  insertPendiente: (titulo, fecha, topico, tarea) =>
    dispatch({
      type: Types.INSERT_PENDIENTE,
      payload: { titulo, fecha, topico, tarea },
    }),
});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(Tareas);
