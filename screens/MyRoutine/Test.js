import React, { useRef, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

// const MarkerView = styled.View``;

const Test = () => {
  const [moving, setMoving] = useState(false);
  const X = useSharedValue(250);
  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY;
      const positionX = event.absoluteX;
      X.value = withTiming(positionX - 32, { duration: 16 });
    },
    onFinish() {
      //positionX에 가장 가까이 위치한
      X.value = 10;
      runOnJS(setMoving)(false);
    },
  });
  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      left: X.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: { height: 0, width: 0 },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);
  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View
          style={{
            backgroundColor: 'chartreuse',
            width: 64,
            height: 64,
          }}
        ></Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Test;
