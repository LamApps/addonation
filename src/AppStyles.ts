import { Platform, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

export const AppStyles = {
  color: {
    primary: "#EC6700",
    text: "#444",
    textMute: "#666",
    white: "white",
    border: '#d1d1d1',
    secondary: "#F7C198",
    menuInactive: "#FCCC7A"
  },
  fontSize: {
    extraLarge: 40,
    large: 28,
    medium: 18,
    normal: 14,
    small: 12
  },
  buttonWidth: {
    main: "70%"
  },
  textInputWidth: {
    main: "80%"
  },
  borderRadius: {
    main: 25,
    round: 100
  }
};