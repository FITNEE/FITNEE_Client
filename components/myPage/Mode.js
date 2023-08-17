import React from "react";
import CustomSwitch from "./CustomSwitch";
import { useSetRecoilState } from "recoil";
import { IsDarkAtom } from "../../recoil/MyPageAtom";

export default function Mode() {
  const setIsDark = useSetRecoilState(IsDarkAtom);

  const onSelectSwitch = () => {
    setIsDark(false);
  };

  return (
    <CustomSwitch
      option_left={"OFF"}
      option_right={"ON"}
      onSelectSwitch={onSelectSwitch}
    />
  );
}
