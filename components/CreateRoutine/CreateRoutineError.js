import styled from 'styled-components/native'
import { colors } from '../../colors'
import { color } from 'react-native-reanimated'

export default function CreateRoutineError({ isDark, retryPress, navigation }) {
  return (
    <ErrorContainer>
      <Image isDark={isDark} source={require('../../assets/Imgs/routineFail.png')} />
      <Title isDark={isDark}>앗 !</Title>
      <SubTitle isDark={isDark}>
        {`일시적인 오류로 인해 루틴을 루틴을 생성하지 못했어요.\n잠시후 다시 시도해주세요.`}
      </SubTitle>
      <Retry onPress={retryPress}>
        <RetryText>다시 시도</RetryText>
      </Retry>
      <Home
        onPress={() => navigation.navigate('HomeNav')}
        style={{
          borderColor: `${colors.l_main}`,
        }}
      >
        <HomeText style={{ color: isDark ? colors.d_main : colors.l_main }}>홈으로 돌아가기</HomeText>
      </Home>
    </ErrorContainer>
  )
}

const ErrorContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`

const Image = styled.Image`
  width: 125px;
  height: 125px;
  margin-bottom: 8px;
`
const Title = styled.Text`
  font-size: 20px;
  font-family: Pretendard-SemiBold;
  line-height: 32px;
  margin-bottom: 8px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`
const SubTitle = styled.Text`
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
  line-height: 19.5px;
  font-family: Pretendard-Regular;
  font-size: 13px;
  text-align: center;
`
const Retry = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.l_main};
  border-radius: 12px;
  margin-bottom: 8px;
  margin-top: 40px;
`
const RetryText = styled.Text`
  color: ${colors.white};
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`
const Home = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border: 1px;
  border-radius: 12px;
  border-color: ${colors.l_main};
`
const HomeText = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`
