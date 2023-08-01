import React, { useContext, useState } from "react";
import CustomSwitch from "../components/CustomSwitch";
import colors from '../colors'
import { useColorScheme } from "react-native";
import { AppContext, Context } from "./ContextProvider";

export default function Mode(){
  const { isDark, setIsDark } = useContext(AppContext);

  const onSelectSwitch = () => {
    setIsDark(false);
  };

    return(
      <CustomSwitch
      option_left={'OFF'}
      option_right={'ON'}
      onSelectSwitch={onSelectSwitch}
    />
    );
}