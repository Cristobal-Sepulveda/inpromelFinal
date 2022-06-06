import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Graficos from "../components/Graficos";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tareas = ({ isBottomSheetFullOpen }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: token,
        title: "InpromelApp",
        body: "Task task task task",
        data: { data: "goes here" },
        _displayInForeground: true,
      }),
    });
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

          <Text style={{ alignSelf: "center", marginTop: 20, fontSize: 20 }}>
            Envia tus Pendientes
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => sendNotification(expoPushToken)}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Notificar Pendientes
            </Text>
          </TouchableOpacity>
        </>
      )}
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
    alignSelf: "center",
    position: "absolute",
    top: "140%",
  },
  lineSheets: {
    borderTopColor: "#E5E5E5",
    borderTopWidth: 6,
    borderRadius: 5,
    width: "25%",
  },
});
export default Tareas;
