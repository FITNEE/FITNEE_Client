import styled from "styled-components/native";
import { colors } from "../../colors";
import { ScreenWidth } from "../../Shared";
import { WithLocalSvg } from "react-native-svg";
import Edit from "../../assets/SVGs/Edit.svg";
import Left from "../../assets/SVGs/Left.svg";

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
  font-size: 17px;
  font-weight: 600;
  color: ${colors.l_main};
`;
const Button = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-items: center;

  height: 56px;
  width: 56px;
`;

export const Header = ({ mode, parentFunction, onPress }) => {
  const handleSubmit = () => {
    parentFunction();
  };
  return (
    <HeaderContainer>
      {mode && (
        <Button style={{ left: 12 }} onPress={onPress}>
          <WithLocalSvg width={24} height={24} asset={Left} />
        </Button>
      )}
      <Title>{mode ? "루틴커스텀" : "마이루틴"}</Title>
      <Button style={{ right: 12 }} onPress={handleSubmit}>
        {mode ? (
          <ButtonText>완료</ButtonText>
        ) : (
          <WithLocalSvg width={24} height={24} asset={Edit} />
        )}
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
    object[values[i].id] = i;
  }

  return object;
}
export const ComponentTitle = ({ title, subTitle }) => {
  const TextContainer = styled.View`
    flex-direction: row;
    margin-top: 40px;
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
    color: ${colors.grey_7};
    margin-top: 4px;
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
