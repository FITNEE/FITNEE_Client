import styled from 'styled-components/native';
import { colors } from '../../colors';
import { ScreenWidth } from '../../Shared';

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
      <Title>{mode ? '루틴커스텀' : '마이루틴'}</Title>
      <Button onPress={handleSubmit}>
        {mode ? <ButtonText>완료</ButtonText> : <ButtonText>설정</ButtonText>}
      </Button>
    </HeaderContainer>
  );
};
