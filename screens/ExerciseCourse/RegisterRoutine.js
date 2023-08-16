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
  background: ${colors.white};
`;

const RoutineText = styled.Text`
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  line-height: 33.6px;
  color: ${colors.black};
`;

const RoutineExplain = styled.View`
  align-items: center;
  justify-content: center;
  width: 327px;
`;

const RoutineExplainText = styled.Text`
  color: ${colors.black};
  padding: 8px;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
  margin-bottom: 21px;
`;

const CreateRoutine = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  background: ${colors.l_main};
  justify-content: center;
`;

const CreateRoutineText = styled.Text`
  color: ${colors.grey_1};
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
`;

const CircleBox1 = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

const CircleBox2 = styled.View`
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const RoutineCircle = styled.View`
  width: 80px;
  height: 80px;
  background: ${colors.grey_2};
  border-radius: 100%;
  margin-bottom: 8px;
`;

const UnderCircle = styled.View`
  background: ${colors.grey_2};
  height: 15px;
  width: 55px;
  margin-bottom: 19px;
`;

const RoutineRec = styled.View`
  width: 311px;
  height: 175px;
  border-radius: 12px;
  background: ${colors.grey_2};
  margin-bottom: 40px;
`;

export default function RegisterRoutine({ navigation }) {
  const isFocus = useIsFocused();
  const isDark = useRecoilValue(IsDarkAtom);
  const setIsTabVisible = useSetRecoilState(TabBarAtom);
  const goToCreateRoutine = () => navigation.navigate("CreateRoutineNav");

  useEffect(() => {
    isFocus && setIsTabVisible(true);
  }, [isFocus]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Container>
        <RoutineText>루틴을 생성해 주세요!</RoutineText>
        <RoutineExplain>
          <RoutineExplainText>
            회원님께 딱 맞는 루틴으로 {"\n"}
            간편하게 운동하고 결과를 분석해보세요.
          </RoutineExplainText>
        </RoutineExplain>

        <CircleBox1>
          <CircleBox2>
            <RoutineCircle />
            <UnderCircle />
          </CircleBox2>

          <CircleBox2>
            <RoutineCircle />
            <UnderCircle />
          </CircleBox2>

          <CircleBox2>
            <RoutineCircle />
            <UnderCircle />
          </CircleBox2>
        </CircleBox1>

        <RoutineRec />
        <CreateRoutine onPress={goToCreateRoutine}>
          <CreateRoutineText>루틴 등록하기</CreateRoutineText>
        </CreateRoutine>
      </Container>
    </SafeAreaView>
  );
}
