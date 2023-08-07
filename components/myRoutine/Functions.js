import { Alert } from "react-native";

export const pressBack = (setMode) => {
  setMode(false);
  Alert.alert("이 변경 사항을 폐기하시겠습니까?", "", [
    {
      text: "계속 편집하기",
      onPress: () => {
        setMode(true);
      },
      style: "default",
    },
    {
      text: "변경사항 폐기",
      onPress: () => console.log("변경사항 폐기"),
      style: "destructive",
    },
  ]);
};
