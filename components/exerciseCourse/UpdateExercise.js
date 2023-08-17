import { Text } from "react-native";
import styled from "styled-components/native";
import { colors } from "../../colors";
import Line from "../../assets/SVGs/Line.svg";

export default function UpdateExercise() {
  return (
    <Container>
      <Title>
        <TitleText>데드리프트</TitleText>
      </Title>
      <Content>
        <Image />
        <CountBox>
          <Count>
            <CountName>세트</CountName>
            <Line width={70} height={1} />
            <CountNum>+1회</CountNum>
          </Count>
          <Count>
            <CountName>횟수</CountName>
            <Line width={70} height={1} />
            <CountNum>+1회</CountNum>
          </Count>
          <Count>
            <CountName>무게</CountName>
            <Line width={70} height={1} />
            <CountNum>+1kg</CountNum>
          </Count>
        </CountBox>
      </Content>
    </Container>
  );
}

const Container = styled.View`
  width: 327px;
  height: 170px;
  background-color: white;
  border-radius: 20px;
`;
const Title = styled.View`
  height: 45px;
  justify-content: center;
  margin-left: 20px;
`;
const TitleText = styled.Text`
  font-weight: bold;
`;
const Content = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;
const Image = styled.View`
  width: 91px;
  height: 91px;
  background-color: ${colors.grey_1};
  border-radius: 100px;
  margin: 0px 25px;
`;
const CountBox = styled.View`
  justify-content: space-around;
`;
const Count = styled.View`
  flex-direction: row;
  align-items: center;
`;
const CountName = styled.Text`
  color: ${colors.grey_6};
  margin-right: 15px;
`;
const CountNum = styled.Text`
  margin-left: 15px;
`;
