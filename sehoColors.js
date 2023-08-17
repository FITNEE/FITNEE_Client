import { useRecoilValue } from "recoil";
import { IsDarkAtom } from "./recoil/MyPageAtom";

export const sehoColors = () => {
  const isDark = useRecoilValue(IsDarkAtom);

  const colors = {
    background: isDark ? "#141414" : "#F6F8FA", // 조건에 따라 다크 모드 색상 또는 라이트 모드 색상 선택
    stackbar: isDark ? "#..." : "#E8EBF0",
    stackpin: isDark ? "#..." : "#C4C5D4",
    title: isDark ? "#..." : "#141414",
    item_background: isDark ? "#1E1B29" : "#FFFFFF",
    item_select: isDark ? "#332A53" : "#F2EEFD",
    item_only_select: isDark ? "#..." : "#8457F1",
  };

  return colors;
};
