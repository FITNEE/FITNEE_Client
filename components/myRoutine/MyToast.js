import Toast from "react-native-toast-message";
import Check from "../../assets/SVGs/Check.svg";
import styled from "styled-components/native";
import { colors } from "../../colors";

const ToastBase = styled.View`
  height: 44px;
  width: 90%;
  border-radius: 12px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 0px 16px;
`;
const ToastText = styled.Text`
  font-size: 13px;
  font-family: Pretendard-SemiBold;
  flex: 1;
`;

export const MyToast = (isDark) => {
  const toastConfig = {
    success: () => (
      <ToastBase
        style={{ backgroundColor: isDark ? colors.white : colors.black }}
      >
        <ToastText style={{ color: isDark ? colors.black : colors.white }}>
          루틴이 수정되었습니다.
        </ToastText>
        <Check width={24} height={24} color={colors.white} />
      </ToastBase>
    ),
  };
  return <Toast config={toastConfig} />;
};

export const showToast = () => {
  Toast.show({
    type: "success",
    position: "bottom",
    visibilityTime: 2500,
    bottomOffset: 20,
  });
};
