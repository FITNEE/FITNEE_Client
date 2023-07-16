import React, { useState } from "react";
import { Switch } from "react-native";

export default function Mode(){
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return(
        <Switch
        trackColor={{false: '#f3f3f3', true: '9747ff'}}
        thumbColor={"#fff"}
        ios_backgroundColor="#fff"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    );
}