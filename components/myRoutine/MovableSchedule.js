import React, { useState } from "react";
import { Platform, Text } from "react-native";
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
import { clamp, objectMove } from "../Shared/MyRoutine_Shared";
import { colors } from "../../colors";
import { ScreenWidth } from "../../Shared";
import { styled } from "styled-components/native";

const SCHEDULE_W = (ScreenWidth - 60) / 7;

export const MovableSchedule = ({
  id,
  isDark,
  positions,
  routineId,
  SCHEDULE,
  setNewSCHE,
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
        SCHEDULE.length - 1
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
      runOnJS(setMoving)(false);
      runOnJS(setNewSCHE)(positions.value);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      left: left.value,
      borderRadius: 12,
      zIndex: moving ? 1 : 0,
      shadowColor: "#645B7E",
      shadowOffset: {
        height: 3,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.3 : 0),
      shadowRadius: 8,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View>
          <Schedule title={SCHEDULE[id].parts} isDark={isDark} />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const ScheduleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 64px;
  border-radius: 4px;
  width: ${SCHEDULE_W}px;
`;

export function Schedule({ title, isDark }) {
  return (
    <ScheduleContainer
      style={
        title && {
          borderWidth: 1,
          borderStyle: "dashed",
          borderColor: colors.l_main,
          backgroundColor: isDark ? colors.grey_9 : colors.l_sub_2,
        }
      }
    >
      <Text
        style={{
          fontSize: title ? 13 : 11,
          fontFamily: "Pretendard-Regular",
          color: title ? colors.l_main : colors.grey_6,
        }}
      >
        {title ? title : "휴식"}
      </Text>
    </ScheduleContainer>
  );
}
