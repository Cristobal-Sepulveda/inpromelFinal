import React, { useEffect, useState, useMemo, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/context";
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";
import {
  select_session,
  drop_session,
  create_pendientes_table,
  create_session_table,
} from "../model";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [splashScreen, setSplashScreen] = useState(true);
  const ref = useRef(null);

  const authContext = useMemo(
    () => ({
      signIn: () => {
        setUsuarioLogeado(true);
      },

      signOut: async () => {
        setUsuarioLogeado(false);
        setSplashScreen(true);
        try {
          await drop_session();
        } catch (e) {
          console.log(e.message);
        }
        setSplashScreen(false);
      },
    }),
    []
  );

  //Funcion utilizada para ver si el usuario pasa a la screen Welcome o Login
  const existeUsuarioLogeado = async () => {
    const usuario = await select_session();
    if (usuario.rows._array.length !== 0) {
      setUsuarioLogeado(true);
      return;
    } else {
      return;
    }
  };

  // Creador de las tablas a usar con el SQLite
  const crearTablas = async () => {
    try {
      await create_session_table();
      await create_pendientes_table();
    } catch (e) {
      console.log(e.message);
    }

    console.log("Aqui");
  };

  useEffect(() => {
    crearTablas();
    existeUsuarioLogeado();
  }, []);

  useEffect(() => {}, [usuarioLogeado]);

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {splashScreen ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {usuarioLogeado ? (
              <>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Home" component={Home} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={Home} />
              </>
            )}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default RootNavigation;
