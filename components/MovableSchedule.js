import React, { useState } from "react";
import { Platform, View, Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import { clamp, objectMove } from "./Shared/MyRoutine_Shared";
import { colors } from "../colors";
import { ScreenWidth } from "../Shared";

const SCHEDULE_W = (ScreenWidth - 60) / 7;
export function Schedule({ part = "", valid }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 64,
        borderRadius: 4,
        width: SCHEDULE_W,
        justifyContent: "center",
        backgroundColor: valid == true ? colors.l_sub_1 : colors.grey_2,
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "400",
          color: valid ? colors.black : colors.grey_6,
        }}
      >
        {valid ? part : "휴식"}
      </Text>
    </View>
  );
}

export const MovableSchedule = ({
  id,
  day,
  part,
  positions,
  songsCount,
  valid,
}) => {
  const [moving, setMoving] = useState(false);
  const left = useSharedValue(positions.value[id] * SCHEDULE_W);

  useAnimatedReaction(
    () => positions.value[id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          left.value = withSpring(currentPosition * SCHEDULE_W);
        }
      }
    },
    [moving]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
      if (Platform.OS === "ios") {
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Medium);
      }
    },
    onActive(event) {
      const positionX = event.absoluteX;
      left.value = withTiming(positionX - SCHEDULE_W, {
        duration: 16,
      });

      const newPosition = clamp(
        Math.floor(positionX / SCHEDULE_W),
        0,
        songsCount - 1
      );

      if (newPosition !== positions.value[id]) {
        positions.value = objectMove(
          positions.value,
          positions.value[id],
          newPosition
        );

        if (Platform.OS === "ios") {
          runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        }
      }
    },
    onFinish() {
      left.value = positions.value[id] * SCHEDULE_W;
      console.log("변경된 positions 배열:", positions.value);
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: left.value,
      borderRadius: 12,
      zIndex: moving ? 1 : 0,
      shadowColor: "black",
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <BlurView intensity={moving ? 100 : 0} tint="light">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View>
            <Schedule valid={valid} day={day} part={part} />
          </Animated.View>
        </PanGestureHandler>
      </BlurView>
    </Animated.View>
  );
};
