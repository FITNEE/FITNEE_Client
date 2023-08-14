import React from "react";
import styled from "styled-components/native";
import { days } from "./data";
import { Keyboard, ScrollView } from "react-native";
import { colors } from "../../colors";
import { ComponentTitle, listToObject } from "../Shared/MyRoutine_Shared";
import { ScheduleChanger } from "../ScheduleChanger";
import { ScreenWidth } from "../Shared";
import { WithLocalSvg } from "react-native-svg";
import Trash from "../../assets/SVGs/Trash.svg";
import { ContentContainer, NoRoutineText } from "../Shared/MyRoutine_Shared";

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding: 12px 16px;
  width: 100%;
  border-radius: 8px;
  margin-top: 4px;
`;
const ExerciseTitle = styled.Text`
  font-size: 17px;
  margin: 8px;
  font-weight: 500;
`;

const BottomContainer = styled.View`
  width: 100%;
`;
const Blank = styled.View`
  width: 100%;
  height: 40px;
`;
const ScrollPressable = styled.Pressable`
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
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
`;
const DeleteButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  margin-left: 20px;
`;
const AddButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
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
  isDark,
}) => {
  const SetsText = styled.Text`
    font-size: 17px;
    color: ${isDark ? colors.grey_4 : colors.grey_8};
    font-weight: 400;
  `;
  return (
    <ExerciseContainer
      style={{ backgroundColor: isDark ? colors.grey_8 : colors.white }}
      onLongPress={() => popMessage()}
    >
      <ExerciseTitle style={{ color: isDark ? colors.white : colors.black }}>
        {title}
      </ExerciseTitle>
      <BottomContainer id>
        {content.map((item, contentId) => (
          <SetContainer
            style={{
              backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
            }}
            key={contentId}
          >
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
        <AddButton
          style={{ backgroundColor: isDark ? colors.d_sub_2 : colors.l_sub_2 }}
          onPress={() => editRoutine(id, "add", 0)}
        >
          <AddText>세트 추가</AddText>
        </AddButton>
      </BottomContainer>
    </ExerciseContainer>
  );
};

export default List_Custom = ({
  isDark,
  SCHEDULE,
  updateNewSCHE,
  newRoutine,
  editRoutine,
  popMessage,
}) => {
  return (
    <ScrollView
      style={{
        // backgroundColor: isDark ? colors.grey_9 : colors.grey_1,
        width: "100%",
        height: "100%",
      }}
    >
      <ScrollPressable onPress={() => Keyboard.dismiss()}>
        <ComponentTitle
          title="요일 변경"
          subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
          // isDark={isDark}
        />
        <ScheduleChanger
          updateNewSCHE={updateNewSCHE}
          SCHEDULE={SCHEDULE}
          days={days}
          isDark={isDark}
        />
        <ComponentTitle
          title="운동 편집"
          subTitle="루틴을 원하는 요일에 끌어다 놓을 수 있어요"
          // isDark={isDark}
        />
        {newRoutine ? (
          <>
            {newRoutine?.map((item, id) => (
              <ExerciseItem_Custom
                key={id}
                id={id}
                content={item.content}
                title={item.exerciseName}
                editRoutine={editRoutine}
                // isDark={isDark}
                popMessage={() => popMessage(id)}
              />
            ))}
            <Blank />
          </>
        ) : (
          <ContentContainer>
            <NoRoutineText style={{ marginTop: 160 }}>
              해당 요일에는 루틴이 없어요
            </NoRoutineText>
          </ContentContainer>
        )}
      </ScrollPressable>
    </ScrollView>
  );
};
