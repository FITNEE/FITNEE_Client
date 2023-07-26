import React, { useContext, useState } from "react";
import CustomSwitch from "../components/CustomSwitch";
import colors from '../colors'
import { useColorScheme } from "react-native";
import { AppContext, Context } from "./ContextProvider";

export default function Mode(){
  const { isDark, setIsDark } = useContext(AppContext);
  // const {colorMode,setColorMode}=useContext(Context);
  const onSelectSwitch = () => {
    setIsDark(false);
  };
  // style ={colorMode==1? {backgroundColor:${colors.l}}}

    return(
      <CustomSwitch
      selectionMode={1}
      option1={'OFF'}
      option2={'ON'}
      onSelectSwitch={onSelectSwitch}
    />
    );
}