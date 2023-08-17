import styled from "styled-components/native";
import { colors } from "./colors";
import { ActivityIndicator, Dimensions } from "react-native";
import Left from "./assets/SVGs/Left.svg";

export const ScreenWidth = Dimensions.get("screen").width;
export const ScreenHeight = Dimensions.get("screen").height;
//****************** 뒤로가기  *******************************************************/
const BackButtonContainer = styled.TouchableOpacity`
  position: absolute;
  top: 24px;
  left: 0px;
  width: 48px;
  height: 48px;
`;

export const BackButton = ({ onPress, isDark }) => {
  return (
    <BackButtonContainer onPress={onPress}>
      <Left
        width={24}
        height={24}
        color={isDark ? colors.white : colors.black}
      />
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
  isDark,
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
              backgroundColor: isDark ? colors.d_main : colors.l_main,
            }
          : { backgroundColor: isDark ? colors.grey_8 : colors.grey_3 },
        mode == "absolute" && {
          width: ScreenWidth - 48,
          marginLeft: 24,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isDark ? colors.grey_3 : colors.grey_7} />
      ) : (
        <ButtonText
          style={
            enabled
              ? { color: isDark ? colors.black : colors.white }
              : { color: isDark ? colors.white : colors.grey_7 }
          }
        >
          {text}
        </ButtonText>
      )}
    </MyButton>
  );
};

//****************** 버튼  *******************************************************/
