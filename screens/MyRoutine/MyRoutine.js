import React, { useState } from "react";
import styled from "styled-components/native";
import { FlatList } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Header } from "../../components/Shared/MyRoutine_Shared";
import { colors } from "../../colors";
import { ScreenWidth } from "../../Shared";
import { MovableSchedule } from "../../components/MovableSchedule";

const ScreenBase = styled.SafeAreaView`
  width: 100%;
  flex: 1;
`;
const ContentBase = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  background-color: #f3f3f3;
`;
const ScreenLayout = styled.View`
  width: 100%;
`;
const ExerciseImg = styled.View`
  width: 60px;
  margin-right: 16px;
  height: 60px;
  background-color: ${colors.grey_3};
  border-radius: 30px;
`;
const ExerciseContainer = styled.View`
  padding: 16px;
  flex-direction: column;
  border-radius: 12px;
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
  margin-top: 8px;
  background-color: ${colors.white};
`;
const DefaultContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
const FlatListContainer = styled.View`
  width: 100%;
  height: 100%;
`;
const ExerciseTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  font-weight: 600;
`;
const ExerciseSubText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  color: #757575;
`;
const DropDown = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: chartreuse;
`;
const ExtendedContainer = styled.View`
  width: 100%;
  padding: 8px 16px 0px 16px;
`;

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  width: 100%;
`;

const SetsText = styled.Text`
  font-size: 17px;
  color: ${colors.grey_8};
  font-weight: 400;
`;

const MyRoutine = ({ route, navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState(false);
  const positions = useSharedValue(listToObject(Schedules));

  const test = [
    {
      id: 1,
      title: "데드리프트",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
    {
      id: 2,
      title: "사이드 레터럴레이션",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
    {
      id: 3,
      title: "데드리프트",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
    {
      id: 4,
      title: "데드리프트",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
    {
      id: 5,
      title: "데드리프트",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
    {
      id: 6,
      title: "데드리프트",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
    {
      id: 7,
      title: "데드리프트",
      subText: "전신 | 3세트 | 빈 봉",
      setsNum: [15, 15, 15],
    },
  ];
  const toggleMode = () => {
    setMode(!mode);
  };
  const renderItem = ({ item }) => {
    return (
      <>
        <ExerciseContainer>
          <DefaultContainer>
            <ExerciseImg />
            <ExerciseTextContainer>
              <ExerciseTitle>{item.title}</ExerciseTitle>
              <ExerciseSubText>{item.subText}</ExerciseSubText>
            </ExerciseTextContainer>
            <DropDown
              onPress={() => {
                selectedId == item.id
                  ? setSelectedId("")
                  : setSelectedId(item.id);
              }}
            />
          </DefaultContainer>
          {selectedId == item.id && (
            <ExtendedContainer>
              {item.setsNum.map((item, id) => (
                <SetContainer id style={{ fontWeight: 600 }}>
                  <SetsText>{id + 1}</SetsText>
                  <SetsText>-</SetsText>
                  <SetsText>{item}회</SetsText>
                </SetContainer>
              ))}
            </ExtendedContainer>
          )}
        </ExerciseContainer>
      </>
    );
  };
  return (
    <ScreenBase>
      <Header mode={mode} parentFunction={toggleMode} />
      {mode ? (
        <Animated.View
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "white",
          }}
          contentContainerStyle={{
            height: 60,
          }}
        >
          {Schedules.map((sche) => (
            <MovableSchedule
              key={sche.id}
              id={sche.id}
              part={sche.part}
              positions={positions}
              leftBound={10}
              day={sche.day}
              scheduleCount={sche.length}
            />
          ))}
        </Animated.View>
      ) : (
        <SetContainer style={{ fontWeight: 600 }}>
          <SetsText>hi</SetsText>
          <SetsText>-</SetsText>
          <SetsText>회</SetsText>
        </SetContainer>
      )}

      <ContentBase>
        <ScreenLayout>
          <FlatListContainer>
            <FlatList
              showsVerticalScrollIndicator
              data={test}
              keyExtractor={(test) => test.id}
              renderItem={renderItem}
            />
          </FlatListContainer>
        </ScreenLayout>
      </ContentBase>
    </ScreenBase>
  );
};

export default MyRoutine;
