import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";

export default function CreateRoutineHeader({ title, index, children }) {
  const [width, setWidth] = useState(0);
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(-300 + 80 * index)).current;
  const reactive = useRef(new Animated.Value(-1000)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: -width + (width * (index + 1)) / 4,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [index, width]);
  return (
    <>
      {index == 4 ? (
        <NoHeader />
      ) : (
        <HeaderContainer>
          <Header>
            <BackButton onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </BackButton>
            <Title>{title}</Title>
          </Header>
          <StackBar
            onLayout={(e) => {
              const newWidth = e.nativeEvent.layout.width;

              setWidth(newWidth);
            }}
          >
            <Animated.View
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
                backgroundColor: "#757575",
                transform: [
                  {
                    translateX: animatedValue,
                  },
                ],
              }}
            />
          </StackBar>
        </HeaderContainer>
      )}
    </>
  );
}
const NoHeader = styled.View`
  height: 90px;
  background-color: #f3f3f3;
  align-items: center;
  justify-content: center;
  padding: 10px;
  opacity: 1;
`;
const HeaderContainer = styled.View`
  height: 100px;
  background-color: #f3f3f3;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
`;
const Header = styled.View`
  flex-direction: row;
  width: 95%;
  height: 50px;
  background-color: #f3f3f3;
  align-items: center;
  padding: 10px;
  margin-top: 22px;
`;
const BackButton = styled.TouchableOpacity``;
const Title = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-left: 112px;
`;

const StackBar = styled.View`
  width: 90%;
  height: 8px;
  background-color: #dddddd;
  border-radius: 10px;
  overflow: hidden;
`;
const StackBarPin = styled.View`
  width: ${({ index }) => (index + 1) * 25}%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`;
