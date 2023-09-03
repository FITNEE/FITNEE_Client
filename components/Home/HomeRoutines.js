import React from 'react'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import { ScreenWidth } from '../../Shared'
import { imagePath, pngPath } from '../../imagePath'

const Container = styled.View`
  width: 100%;
`
const TitleBlock = styled.View`
  width: 100%;
  margin-top: 66px;
  margin-bottom: 31px;
  padding: 0px 24px;
  justify-content: space-between;
  align-items: center;
`
const NameText = styled.Text`
  height: 26px;
  font-family: Pretendard-Regular;
  font-size: 17px;
  font-style: normal;
  line-height: 25.5px;
  margin-bottom: 4px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const Title = styled.Text`
  height: 32px;
  font-size: 20px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  margin-bottom: 4px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const DayText = styled.Text`
  color: ${colors.l_main};
  height: 20px;
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
`
const SectionBlock = styled.View`
  height: 40px;
  margin: 0px 24px;
  padding: 0px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
  border-radius: 10px;
`
const CircleIcon = styled.View`
  width: 12px;
  height: 12px;
  border-radius: 10px;
  margin-right: 14px;
  background-color: ${colors.l_main};
`
const Section = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
`
const SectionText = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 22.5px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const NumText = styled.Text`
  color: ${colors.grey_7};
  font-size: 15px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 22.5px;
`
const Cards = styled.FlatList`
  margin-top: 16px;
  width: auto;
  padding: 0px 16px;
  margin-bottom: 76px;
`
const Card = styled.TouchableOpacity`
  width: 160px;
  height: 187px;
  border-radius: 20px;
  background-color: ${colors.white};
  margin: 0px 8px;
  align-items: center;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
`
const ExerciseView = styled.Image`
  width: 128px;
  height: 128px;
  border-radius: 100px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
  margin: 16px 0px 10px 0px;
`
const ExerciseName = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 22.5px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const Button = styled.TouchableOpacity`
  margin-bottom: 8px;
  border-radius: 12px;
  align-items: center;
  width: ${ScreenWidth - 48}px;
  align-self: center;
  justify-content: center;
  max-width: 480px;
  height: 52px;
  background-color: ${colors.l_main};
`
const ButtonText = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 25.5px;
  color: ${(props) => (props.isDark ? colors.black : colors.white)};
`

export default function HomeRoutines({ isDark, data }) {
  const postSearch = async (text) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = '/app/dictionary/searchexercise'
      const response = await axios.post(url + detailAPI, null, {
        params: {
          search: text,
        },
      })
      const exercise = response.data.result[0]
      console.log('exercise :', exercise)
      navigation.navigate('Dictionary_2', { exercise })
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }
  const itemPress = (name) => {
    postSearch(name)
  }
  const renderItem = ({ item }) => (
    <Card isDark={isDark} onPress={() => itemPress(item.name)}>
      <ExerciseView isDark={isDark} source={pngPath.path[item.idx - 1]} />
      <ExerciseName isDark={isDark}>{item.name}</ExerciseName>
    </Card>
  )

  const navigation = useNavigation()
  const navigateToExercise = () => {
    navigation.navigate('ExerciseCourse')
  }

  return (
    <Container isDark={isDark}>
      <TitleBlock>
        <NameText isDark={isDark}>{data.userNickName} 님</NameText>
        {data.isToday ? (
          <Title isDark={isDark}>오늘 예정된 운동 루틴이에요</Title>
        ) : (
          <Title isDark={isDark}>다음에 예정된 운동루틴이에요</Title>
        )}

        <DayText isDark={isDark}>{data.todayStrKo}</DayText>
      </TitleBlock>
      <SectionBlock isDark={isDark}>
        <Section isDark={isDark}>
          <CircleIcon />
          <SectionText isDark={isDark}>{data.exerciseParts}</SectionText>
        </Section>
        <Section isDark={isDark}>
          <NumText isDark={isDark}>{data.exerciseCount}개의 운동</NumText>
        </Section>
      </SectionBlock>
      <Cards
        horizontal={true}
        data={data.exercises}
        keyExtractor={(item) => item.idx}
        contentContainerStyle={{ paddingRight: 32 }}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
      />
      {data.isToday ? (
        <Button isDark={isDark} onPress={navigateToExercise}>
          <ButtonText isDark={isDark}>운동하러 가기</ButtonText>
        </Button>
      ) : null}
    </Container>
    //data.isToday
  )
}
