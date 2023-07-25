import styled from 'styled-components/native';
import { colors } from '../../colors';

export const Title = styled.Text`
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  color: ${colors.black};
`;

export const Input = styled.TextInput`
  padding: 15px 7px;
  border-radius: 4px;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 48px;
`;

export const SubText = styled.Text`
  font-size: 13px;
  margin-top: 8px;
  font-weight: 400;
  line-height: 19px;
  color: ${colors.black};
`;
export const StatusText = styled.Text`
  font-size: 12px;
  width: 100%;
  text-align: right;
  margin-bottom: 12px;
  margin-right: 8px;
  font-weight: 300;
  color: ${colors.grey_4};
`;

const ScreenContainer = styled.SafeAreaView`
  flex: 1;
`;
const KeyBoardAwareContainer = styled.KeyboardAvoidingView`
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin-left: 5%;
  flex: 1;
  /* height: 90%; */
`;

export const ScreenLayout = ({ children }) => {
  return (
    <ScreenContainer>
      <KeyBoardAwareContainer behavior={Platform.select({ ios: 'padding' })}>
        {children}
      </KeyBoardAwareContainer>
    </ScreenContainer>
  );
};
