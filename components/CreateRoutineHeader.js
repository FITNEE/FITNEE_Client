import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

export default function CreateRoutineHeader({ title, index, children }) {
  const navigation = useNavigation();
  useEffect(() => {
    console.log("인덱스 : ", index, typeof index);
  }, []);
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
          <StackBar>
            <StackBarPin index={index} />
          </StackBar>
        </HeaderContainer>
      )}
    </>
  );
}
const NoHeader = styled.View`
  height: 110px;
  background-color: #f3f3f3;
  align-items: center;
  justify-content: center;
  padding: 10px;
  opacity: 1;
`;
const HeaderContainer = styled.View`
  height: 150px;
  background-color: #f3f3f3;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const Header = styled.View`
  flex-direction: row;
  width: 95%;
  height: 56px;
  background-color: #f3f3f3;
  align-items: center;
  padding: 10px;
`;
const BackButton = styled.TouchableOpacity``;
const Title = styled.Text`
  font-weight: bold;
  font-size: 16;
  margin-left: 112px;
`;

const StackBar = styled.View`
  width: 90%;
  height: 10px;
  background-color: #dddddd;

  border-radius: 10px;
`;
const StackBarPin = styled.View`
  width: ${({ index }) => (index + 1) * 25}%;
  height: 100%;
  background-color: #757575;
  border-radius: 10px;
`;
