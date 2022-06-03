import React, { useEffect, useState, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/context";
import SplashScreen from "../screens/SplashScreen";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";
import Home from "../screens/Home";
import { delay } from "../utils/funciones";
import { select_session, drop_session } from "../model";

const Stack = createStackNavigator();

const RootNavigation = () => {
  const [usuarioLogeado, setUsuarioLogeado] = useState(false);
  const [splashScreen, setSplashScreen] = useState(true);

  const authContext = useMemo(
    () => ({
      signIn: () => {
        setUsuarioLogeado(true);
      },

      signOut: async () => {
        setUsuarioLogeado(false);
        await drop_session();
        setSplashScreen(true);
        await delay(2000);
        setSplashScreen(false);
      },
    }),
    []
  );

  //Funcion utilizada para ver si el usuario pasa a la screen Welcome o Login
  const existeUsuarioLogeado = async () => {
    await delay(2000);
    const usuario = await select_session();
    if (usuario.rows._array.length !== 0) {
      setSplashScreen(false);
      setUsuarioLogeado(true);
      return;
    } else {
      setSplashScreen(false);
      return;
    }
  };

  useEffect(() => {
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
