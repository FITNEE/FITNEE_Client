import styled from "styled-components/native";
import { colors } from "./colors";
import { ActivityIndicator, Dimensions } from "react-native";
import Back from "./assets/left_arrow.png";

export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
//****************** 뒤로가기  *******************************************************/
const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 24px;
  left: 0px;
  width: 32px;
  height: 32px;
`;

const BackImg = styled.Image`
  width: 100%;
  height: 100%;
`;

export const BackButton = ({ onPress }) => {
  return (
    <BackButtonContainer onPress={onPress}>
      <BackImg source={Back}></BackImg>
    </BackButtonContainer>
  );
};

//****************** 버튼  *******************************************************/
const MyButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 52px;
  border-radius: 16px;
  width: 100%;
  margin-bottom: 24px;
`;
const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: 400;
  font-weight: 800;
`;
export const Button = ({
  enabled,
  onPress,
  text = "확인",
  loading = false,
  mode = "normal",
}) => {
  return (
    <MyButton
      disabled={!enabled}
      onPress={onPress}
      style={[
        enabled
          ? {
              backgroundColor: colors.l_main,
            }
          : { backgroundColor: colors.grey_3 },
        mode == "absolute" && {
          width: ScreenWidth - 48,
          marginLeft: 24,
        },
      ]}
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

//****************** 버튼  *******************************************************/
