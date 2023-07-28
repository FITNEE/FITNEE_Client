import styled from "styled-components/native";
import { colors } from "../../colors";
import { ScreenWidth } from "../../Shared";

const HeaderContainer = styled.View`
  width: ${ScreenWidth}px;
  background-color: white;
  height: 56px;
  align-items: center;
  justify-content: center;
`;
const Title = styled.Text`
  font-size: 17px;
  font-weight: 600;
  color: ${colors.black};
`;

const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: 400;
  color: ${colors.grey_8};
`;
const Button = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;
  right: 12px;
  height: 56px;
  width: 56px;
`;
const Icon = styled.View`
  background-color: red;
  width: 24px;
  height: 24px;
`;

export const Header = ({ mode, parentFunction }) => {
  const handleSubmit = () => {
    parentFunction();
  };
  return (
    <HeaderContainer>
      <Title>{mode ? "루틴커스텀" : "마이루틴"}</Title>
      <Button onPress={handleSubmit}>
        {mode ? <ButtonText>완료</ButtonText> : <ButtonText>설정</ButtonText>}
      </Button>
    </HeaderContainer>
  );
};

export function clamp(value, lowerBound, upperBound) {
  "worklet";
  return Math.max(lowerBound, Math.min(value, upperBound));
}

export function objectMove(object, from, to) {
  "worklet";
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}
export function listToObject(list) {
  const values = Object.values(list);
  const object = {};
  for (let i = 0; i < values.length; i++) {
    console.log(values[i].id);
    object[values[i].id] = i;
  }

  return object;
}
export const ComponentTitle = ({ title, subTitle }) => {
  const TextContainer = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  `;
  const _ComponentTitle = styled.Text`
    font-size: 17px;
    font-weight: 600;
  `;
  const _ComponentSubTitle = styled.Text`
    font-size: 13px;
    flex: 1;
    color: ${colors.grey_6};
    margin-top: 2px;
    margin-left: 8px;
    font-weight: 300;
  `;
  return (
    <TextContainer>
      <_ComponentTitle>{title}</_ComponentTitle>
      <_ComponentSubTitle>{subTitle}</_ComponentSubTitle>
    </TextContainer>
  );
};
