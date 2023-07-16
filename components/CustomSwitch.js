import React, {useState} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';

const CustomSwitch = ({
  selectionMode,
  option1,
  option2
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updatedSwitchData = val => {
    setSelectionMode(val);
  };

  return (
    <View>
      <View
        style={{
          height: 36,
          width: 64,
          backgroundColor: getSelectionMode == 1 ? '#f3f3f3' : '#757575',
          borderRadius: 1000,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 4,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 1 ? 'white':'#757575',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? '#bfbfbf' : '#757575',
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            backgroundColor: getSelectionMode == 2 ? 'white':'#f3f3f3',
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? '#757575' : "#f3f3f3",
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;