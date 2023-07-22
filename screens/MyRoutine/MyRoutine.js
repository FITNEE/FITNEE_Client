import React, { useState } from 'react';
import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Header } from '../../components/Shared/MyRoutine_Shared';
import { colors } from '../../colors';
import { ScreenWidth } from '../../Shared';

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
const ExerciseContainer = styled.TouchableOpacity`
  padding: 16px;
  height: 92px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
  margin-top: 8px;
  background-color: ${colors.white};
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

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: [
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
    '일요일',
  ],
  dayNamesShort: ['월', '화', '수', '목', '금', '토', '일'],
};
LocaleConfig.defaultLocale = 'ko';

const MyRoutine = ({ route, navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const test = [
    { id: 1, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
    { id: 2, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
    { id: 3, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
    { id: 4, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
    { id: 5, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
    { id: 6, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
    { id: 7, title: '데드리프트', subText: '전신 | 3세트 | 빈 봉' },
  ];
  const renderItem = ({ item, index }) => {
    return (
      <ExerciseContainer>
        <ExerciseImg />
        <ExerciseTextContainer>
          <ExerciseTitle>{item.title}</ExerciseTitle>
          <ExerciseSubText>{item.subText}</ExerciseSubText>
        </ExerciseTextContainer>
        <DropDown onPress={() => setSelectedId(item.id)}></DropDown>
      </ExerciseContainer>
    );
  };
  return (
    <ScreenBase>
      <Header title='마이루틴' mode={false} />
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
