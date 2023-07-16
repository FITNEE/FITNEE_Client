import React, { useState } from "react";
import CustomSwitch from "../components/CustomSwitch";

export default function Mode(){
  const onSelectSwitch = mode => {
    //다크모드 변경
  };

    return(
      <CustomSwitch
      selectionMode={1}
      option1={'OFF'}
      option2={'ON'}
      onSelectSwitch={onSelectSwitch}
    />
    );
}