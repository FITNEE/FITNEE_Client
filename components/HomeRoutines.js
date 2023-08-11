import React from "react";
import { styled } from "styled-components/native";
import { colors } from "../colors";
import { Dimensions } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const Container = styled.View`
  width: 100%;
`;
const TitleBlock = styled.View`
  width: 100%;
  margin-top: 66px;
  margin-bottom: 31px;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
`;
const NameText = styled.Text`
  height: 26px;
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 25.5px;
  margin-bottom: 4px;
`;
const Title = styled.Text`
  height: 32px;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin-bottom: 4px;
`;
const DayText = styled.Text`
  color: ${colors.l_main};
  height: 20px;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 19.5px;
`;
const SectionBlock = styled.View`
  width: 324px;
  height: 40px;
  margin: 0px 24px;
  padding-left: 14px;
  padding-right: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 10px;
`;
const CircleIcon = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 10px;
  margin-right: 14px;
  background-color: ${colors.l_main};
`;
const Section = styled.View`
  flex-direction: row;
  width: 268px;
  justify-content: space-between;
`;
const SectionText = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22.5px;
`;
const NumText = styled.Text`
  color: ${colors.grey_7};
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 22.5px;
`;
const Cards = styled.FlatList`
  margin-top: 16px;
  width: auto;
  padding: 0px 16px;
  margin-bottom: 76px;
`;
const Card = styled.TouchableOpacity`
  width: 160px;
  height: 187px;
  border-radius: 20px;
  background-color: ${colors.white};
  margin: 0px 8px;
  align-items: center;
`;
const ExerciseView = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 100px;
  background-color: ${colors.grey_1};
  margin: 16px 0px 10px 0px;
`;
const ExerciseName = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: 22.5px;
`;
const Button = styled.TouchableOpacity`
  margin-left: 16px;
  margin-right: 16px;
  margin-bottom: 8px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  height: 52px;
  background-color: ${colors.l_main};
`;
const ButtonText = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 25.5px;
  color: ${colors.white};
`;

export default function HomeRoutines() {
  const ExerciseData = [
    { id: 1, name: "데드리프트" },
    { id: 2, name: "덤벨프레스" },
    { id: 3, name: "바벨 로우" },
    { id: 4, name: "사이드 레터럴 레이즈" },
    { id: 5, name: "레그프레스" },
    { id: 6, name: "크런치" },
  ];

  const renderItem = ({ item }) => (
    <Card>
      <ExerciseView />
      <ExerciseName>{item.name}</ExerciseName>
    </Card>
  );

  const navigation = useNavigation();
  const navigateToExercise = () => {
    navigation.navigate("ExerciseCourse");
  };

  return (
    <Container>
      <TitleBlock>
        <NameText>{"초코맛 프로틴"}님</NameText>
        <Title>오늘 예정된 운동 루틴이에요</Title>
        <DayText>{"2023. 07. 03 (월)"}</DayText>
      </TitleBlock>
      <SectionBlock>
        <CircleIcon />
        <Section>
          <SectionText>{"하체, 코어"}</SectionText>
          <NumText>{ExerciseData.length}개의 운동</NumText>
        </Section>
      </SectionBlock>
      <Cards
        horizontal={true}
        data={ExerciseData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
      <Button onPress={navigateToExercise}>
        <ButtonText>운동하러 가기</ButtonText>
      </Button>
    </Container>
  );
}
