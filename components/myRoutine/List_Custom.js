import React from "react";
import styled from "styled-components/native";
import { days } from "./data";
import { Keyboard, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { colors } from "../../colors";
import { ComponentTitle } from "../Shared/MyRoutine_Shared";
import { ScheduleChanger } from "../ScheduleChanger";
import { ScreenWidth } from "../Shared";

import { WithLocalSvg } from "react-native-svg";
import Trash from "../../assets/SVGs/Trash.svg";
import { ContentContainer, NoRoutineText } from "./styled";

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding: 12px 16px;
  background-color: ${colors.grey_1};
  width: 100%;
  border-radius: 8px;
  margin-top: 4px;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  margin: 8px;
  font-weight: 500;
`;
const SetsText = styled.Text`
  font-size: 17px;
  color: ${colors.grey_8};
  font-weight: 400;
`;
const ExtendedContainer = styled.View`
  width: 100%;
`;
const TextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;
const ExerciseContainer = styled.Pressable`
  padding: 8px;
  flex-direction: column;
  border-radius: 12px;
  width: ${ScreenWidth - 48}px;
  margin-top: 16px;
  background-color: ${colors.white};
`;
const DeleteButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  margin-left: 20px;
`;
const AddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: ${colors.l_sub_2};
  width: 100%;
  border-radius: 8px;
  margin-top: 4px;
  height: 48px;
  border: 1px dashed ${colors.l_main};
`;
const AddText = styled.Text`
  font-size: 17px;
  color: ${colors.l_main};
  font-weight: 600;
`;

const ExerciseItem_Custom = ({
  id,
  content,
  title,
  popMessage,
  editRoutine,
}) => {
  return (
    <ExerciseContainer onLongPress={() => popMessage()}>
      <ExerciseTitle>{title}</ExerciseTitle>
      <ExtendedContainer id>
        {content.map((item, contentId) => (
          <SetContainer key={contentId}>
            <TextContainer>
              <SetsText>{contentId + 1}</SetsText>
              <SetsText>
                {item.weight ? item.weight + `   kg` : `-   kg`}
              </SetsText>
              <SetsText>{item.rep + `   회`}</SetsText>
            </TextContainer>
            <DeleteButton
              onPress={() => editRoutine(id, "deleteSet", contentId)}
            >
              <WithLocalSvg width={24} height={24} asset={Trash} />
            </DeleteButton>
          </SetContainer>
        ))}

        <AddButton onPress={() => editRoutine(id, "add", 0)}>
          <AddText>세트 추가</AddText>
        </AddButton>
      </ExtendedContainer>
    </ExerciseContainer>
  );
};

const ScreenBaseCustom = styled.View`
  background-color: ${colors.black};
  width: 100%;
  height: 100%;
  flex: 1;
`;
const ScrollPressable = styled.Pressable`
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
`;

export default List_Custom = ({
  modalState,
  SCHEDULE,
  newRoutine,
  editRoutine,
  popMessage,
  setNewSCHE,
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: colors.grey_1,
      opacity: withSpring(modalState != 0 ? 0.2 : 1),
    };
  }, [modalState]);

  return (
    <ScrollView
      style={{
        width: "100%",
        flex: 1,
      }}
    >
      <ScreenBaseCustom>
        <Animated.View style={animatedStyle}>
          <ScrollPressable onPress={() => Keyboard.dismiss()}>
            <ComponentTitle
              title="요일 변경"
              subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
            />
            <ScheduleChanger
              SCHEDULE={SCHEDULE}
              days={days}
              setNewSCHE={setNewSCHE}
            />

            <ComponentTitle
              title="운동 편집"
              subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
            />

            {newRoutine ? (
              newRoutine?.map((item, id) => (
                <ExerciseItem_Custom
                  key={id}
                  id={id}
                  content={item.content}
                  title={item.exerciseName}
                  editRoutine={editRoutine}
                  popMessage={() => popMessage(id)}
                />
              ))
            ) : (
              <ContentContainer>
                <NoRoutineText style={{ marginTop: 160 }}>
                  해당 요일에는 루틴이 없어요
                </NoRoutineText>
              </ContentContainer>
            )}
          </ScrollPressable>
        </Animated.View>
      </ScreenBaseCustom>
    </ScrollView>
  );
};
