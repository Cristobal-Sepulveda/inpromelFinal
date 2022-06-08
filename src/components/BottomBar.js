import React, { useState, useEffect } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import Perfil from "../screens/Perfil";
import { connect } from "react-redux";
import BottomSheet from "reanimated-bottom-sheet";
import { clear } from "react-native/Libraries/LogBox/Data/LogBoxData";
import Tareas from "../screens/Tareas";
import { isSoftMenuBarEnabled } from "react-native-extra-dimensions-android";

const BottomBar = ({
  showPerfilModal,
  setShowPerfilModal,
  showHome,
  setShowHome,
  isFocusedHome,
  setIsFocusedHome,
  redux,
}) => {
  const [isFocusedMap, setIsFocusedMap] = useState(false);
  const [isFocusedTareas, setIsFocusedTareas] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);
  const [isBottomSheetFullOpen, setIsBottomSheetFullOpen] = useState(false);
  const bottomBarOptions = ["Home", "Otros", "Perfil"];
  const tareas = React.useRef(null);

  const renderContentTareas = () => {
    return (
      <View style={styles.bodyBottomSheet}>
        <Tareas isBottomSheetFullOpen={isBottomSheetFullOpen} />
      </View>
    );
  };

  // backgroundColor:'#90baff'

  /** USEEFFECT CON UTILIDAD PARA FUTURA FUNCIONALIDAD */
  useEffect(() => {
    const temp = async () => {};
    const clear = () => {};

    if (isBottomSheetOpen) {
      temp();
    } else {
      clear();
    }
  }, [isBottomSheetOpen]);

  /** LAYOUT */
  return (
    <>
      <View>
        {/* AQUI SE DIBUJA TODO EL BOTTOMBAR */}
        <View style={styles.bottombar}>
          {bottomBarOptions.map((route, index) => {
            const BottomBarItem = ({ image, text, onPress }) => {
              return (
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    borderRadius: 10,
                    paddingVertical: 4,
                    width: 50,
                  }}
                  onPress={() => onPress(text)}
                >
                  <Image style={{ width: 22, height: 22 }} source={image} />
                </TouchableOpacity>
              );
            };

            const imageSource = () => {
              if (route === "Home" && isFocusedHome) {
                return require("../../assets/icons/home_black.png");
              } else if (route === "Home" && !isFocusedHome) {
                return require("../../assets/icons/home_white.png");
              } else if (route === "Mapa" && isFocusedMap) {
                return require("../../assets/icons/map_black.png");
              } else if (route === "Mapa" && !isFocusedMap) {
                return require("../../assets/icons/map_white.png");
              } else if (route === "Otros" && isFocusedTareas) {
                return require("../../assets/icons/task_black.png");
              } else if (route === "Otros" && !isFocusedTareas) {
                return require("../../assets/icons/task_white.png");
              } else if (route === "Perfil" && showPerfilModal) {
                return require("../../assets/icons/perfil_black.png");
              } else if (route === "Perfil" && !showPerfilModal) {
                return require("../../assets/icons/perfil_white.png");
              }
            };

            const onPress = () => {
              if (route === "Home") {
                setIsFocusedHome(true);
                setIsFocusedMap(false);
                setIsFocusedTareas(false);
                setShowPerfilModal(false);
                setShowHome(true);
                tareas.current.snapTo(2);
              } else if (route === "Mapa") {
                setIsFocusedHome(false);
                setIsFocusedMap(true);
                setIsFocusedTareas(false);
                setShowPerfilModal(false);
              } else if (route === "Otros") {
                setIsFocusedHome(false);
                setIsFocusedMap(false);
                setIsFocusedTareas(true);
                setShowPerfilModal(false);
                setShowHome(true);
                tareas.current.snapTo(0);
              } else if (route === "Perfil") {
                setIsFocusedHome(false);
                setIsFocusedMap(false);
                setIsFocusedTareas(false);
                setShowPerfilModal(true);
                tareas.current.snapTo(2);
              }
            };

            return (
              <View key={index}>
                <BottomBarItem
                  key={index++}
                  image={imageSource()}
                  text={route}
                  onPress={onPress}
                />
                <Text
                  key={index++}
                  style={{ fontSize: 12, textAlign: "center" }}
                >
                  {route}
                </Text>
              </View>
            );
          })}
        </View>

        {/* AQUI SE DIBUJA EL BOTTOMSHEET: TAREAS*/}
        <BottomSheet
          ref={tareas}
          callbackThreshold={0.1}
          initialSnap={2}
          snapPoints={[250, "65%", 0]}
          borderRadius={10}
          renderContent={renderContentTareas}
          onOpenStart={() => {
            setIsBottomSheetOpen(true);
          }}
          onOpenEnd={() => {
            setIsBottomSheetFullOpen(true);
          }}
          onCloseStart={() => {
            setIsBottomSheetFullOpen(false);
          }}
          onCloseEnd={() => {
            setIsBottomSheetOpen(false);
            setIsFocusedTareas(false);
            setIsFocusedHome(true);
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activity: { paddingVertical: 80 },
  bottombar: {
    backgroundColor: "#f6f6f6",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    zIndex: 1000,
  },
  snackBar: {
    bottom: 80,
    alignSelf: "center",
    width: 211,
    backgroundColor: "#696969",
    borderRadius: 30,
  },
  bodyBottomSheet: {
    backgroundColor: "#f6f6f6",
    paddingHorizontal: 8,
    paddingVertical: 12,
    height: "100%",
  },
});

const mapStateToProps = (state) => {
  return { redux: state };
};

const mapDispatchToProps = (dispatch) => ({});

const connectComponent = connect(mapStateToProps, mapDispatchToProps);
export default connectComponent(BottomBar);
