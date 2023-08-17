import React, { useEffect } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { TabBarAtom, IsDarkAtom } from "../../recoil/MyPageAtom";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${({ isDark }) => (isDark ? colors.grey_9 : colors.grey_1)};
`;

const RoutineText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  line-height: 32px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  padding-bottom: 10px;
`;

const RoutineExplain = styled.Text`
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
`;

const RoutineCircle = styled.View`
  width: 125px;
  height: 125px;
  background: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  border-radius: 100%;
  margin-bottom: 8px;
`;

export default function RegisterRoutine({ navigation }) {
  const isFocus = useIsFocused();
  const isDark = useRecoilValue(IsDarkAtom);
  const setIsTabVisible = useSetRecoilState(TabBarAtom);

  useEffect(() => {
    isFocus && setIsTabVisible(true);
  }, [isFocus]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey_1 }}>
      <Container isDark={isDark}>
        <RoutineCircle isDark={isDark}></RoutineCircle>
        <RoutineText isDark={isDark}>오늘은 운동이 없어요</RoutineText>
        <RoutineExplain>
          오늘 운동을 하시려면 루틴을 수정해주세요.
        </RoutineExplain>
      </Container>
    </SafeAreaView>
  );
}
