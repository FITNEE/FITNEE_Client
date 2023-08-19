import React, { useEffect, useState } from "react";

import { Text, View, TouchableOpacity, Animated, Easing } from "react-native";
import { colors } from "../../colors";
import { useRecoilState } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

const CustomSwitch = () => {
  const [isDark, setIsDark] = useRecoilState(IsDarkAtom);

  const [animatedValue] = useState(new Animated.Value(isDark ? 0 : 28));

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
    <TouchableOpacity activeOpacity={0.5} onPress={() => updatedSwitchData()}>
      <View
        style={{
          activeOpacity: 0.5,
          height: 36,
          width: 64,
          backgroundColor: isDark ? colors.d_main : colors.grey_2,
          borderRadius: 1000,
          flexDirection: "row",
          padding: 4,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => updatedSwitchData()}
          style={{
            backgroundColor: isDark ? colors.grey_9 : colors.white,
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
              color: isDark ? colors.white : colors.black,
              fontSize: 11,
              fontFamily: "Pretendard-SemiBold",
              lineHeight: 16.5,
            }}
          >
            {isDark ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
export default CustomSwitch;
