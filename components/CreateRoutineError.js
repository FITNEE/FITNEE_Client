import styled from "styled-components/native";
import { colors } from "../colors";

export default function CreateRoutineError({ isDark, retryPress, navigation }) {
  return (
    <ErrorContainer>
      <Image isDark={isDark} />
      <Title isDark={isDark}>앗 !</Title>
      <SubTitle
        isDark={isDark}
      >{`일시적인 오류로 인해 루틴을 루틴을 생성하지 못했어요.
                        잠시후 다시 시도해주세요.`}</SubTitle>
      <Retry onPress={retryPress}>
        <RetryText>다시 시도</RetryText>
      </Retry>
      <Home onPress={() => navigation.navigate("Home")}>
        <HomeText>홈으로 돌아가기</HomeText>
      </Home>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 80px;
`;

const Image = styled.View`
  width: 125px;
  height: 125px;
  background-color: white;
  border-radius: 62.5px;
  margin-bottom: 20px;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
`;
const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;
const SubTitle = styled.Text`
  margin-bottom: 20px;
  color: ${(props) => (props.isDark ? colors.white : colors.black)};
`;
const Retry = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.l_main};
  border-radius: 12px;
  margin-bottom: 10px;
`;
const RetryText = styled.Text`
  color: ${colors.white};
  font-weight: bold;
`;
const Home = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  align-items: center;
  justify-content: center;
  border: 1px;
  border-radius: 12px;
  border-color: ${colors.l_main};
`;
const HomeText = styled.Text`
  color: ${colors.l_main};
  font-weight: bold;
`;
