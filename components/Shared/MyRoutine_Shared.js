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

export const Header = ({ title, mode }) => {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <Button>{mode ? <Text></Text> : <Icon></Icon>}</Button>
    </HeaderContainer>
  );
};
