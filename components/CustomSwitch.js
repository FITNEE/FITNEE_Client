import React, { useContext, useEffect, useRef, useState } from "react";

import { Text, View, TouchableOpacity, Animated, Easing } from "react-native";
import { colors } from "../colors";
import { AppContext } from "./ContextProvider";

const CustomSwitch = ({ option_left, option_right }) => {
  const { isDark, setIsDark } = useContext(AppContext);

  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isDark ? 28 : 0,
      duration: 150,
      easing: Easing.linear,
      delay: 0,
      useNativeDriver: true,
    }).start();
  }, [isDark, animatedValue]);

  const updatedSwitchData = () => {
    setIsDark(!isDark);
  };

  return (
    <View>
      <View
        style={{
          activeOpacity: 0.5,
          height: 36,
          width: 64,
          backgroundColor: isDark == 0 ? colors.grey_2 : colors.grey_4,
          borderRadius: 1000,
          flexDirection: "row",
          padding: 4,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => updatedSwitchData(0)}
          style={{
            backgroundColor: colors.white,
            width: 28,
            height: 28,
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            transform: [
              {
                translateX: animatedValue,
              },
            ],
          }}
        >
          <Text
            style={{
              color: colors.black,
              fontSize: 11,
              fontWeight: 600,
              lineHeight: 16.5,
            }}
          >
            {isDark ? option_right : option_left}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
