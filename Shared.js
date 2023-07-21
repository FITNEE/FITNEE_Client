import styled from 'styled-components/native';
import { colors } from './colors';
import { ActivityIndicator, Dimensions } from 'react-native';

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;

const MyButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 46px;
  border-radius: 16px;
  width: 100%;
  margin-bottom: 24px;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  font-weight: 800;
`;
export const Title = styled.Text`
  font-size: 24px;
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

export const StatusText = styled.Text`
  position: absolute;
  right: 0;
  top: -50%;
  font-size: 12px;
  margin-bottom: 12px;
  margin-right: 8px;
  font-weight: 300;
  color: ${colors.grey_4};
`;

export const Button = ({
  enabled,
  onPress,
  text = '확인',
  loading = false,
}) => {
  return (
    <MyButton
      disabled={!enabled}
      onPress={onPress}
      style={
        enabled
          ? {
              backgroundColor: colors.l_main,
            }
          : { backgroundColor: colors.grey_3 }
      }
    >
      {loading ? (
        <ActivityIndicator color={colors.grey_7} />
      ) : (
        <ButtonText
          style={enabled ? { color: colors.white } : { color: colors.grey_7 }}
        >
          {text}
        </ButtonText>
      )}
    </MyButton>
  );
};
