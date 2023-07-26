import { Dimensions } from "react-native";

export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;

export const iOSBoxShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 16 },
  shadowOpacity: 0.12, // Shadow opacity (0 to 1)
  shadowRadius: 6, // Shadow radius in points
};
