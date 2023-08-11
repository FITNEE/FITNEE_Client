import Toast from "react-native-toast-message";
import Check from "../../assets/SVGs/Check.svg";
import { WithLocalSvg } from "react-native-svg";
import styled from "styled-components/native";
import { colors } from "../../colors";

const ToastBase = styled.View`
  height: 44px;
  width: 90%;
  border-radius: 12px;
  background-color: ${colors.black};
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
`;
const ToastText = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: 600;
  flex: 1;
`;

const toastConfig = {
  success: () => (
    <ToastBase>
      <ToastText>닉네임이 변경되었습니다.</ToastText>
      <WithLocalSvg width={24} height={24} asset={Check} />
    </ToastBase>
  ),
};
export const NickToast = () => {
  return <Toast config={toastConfig} />;
};

export const showNickToast = () => {
  Toast.show({
    type: "success",
    position: "bottom",
    visibilityTime: 2500,
    bottomOffset: 20,
  });
};