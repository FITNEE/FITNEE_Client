import React, { useState } from "react";
import CustomSwitch from "../components/CustomSwitch";
import { useColorScheme } from "react-native";

export default function Mode(){
  
  const onSelectSwitch = () => {
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