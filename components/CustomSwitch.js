import React, {useState} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import { colors } from '../colors';

const CustomSwitch = ({
  selectionMode,
  option1,
  option2
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updatedSwitchData = val => {
    setSelectionMode(val);
  };
  //72px
  return (
    <View>
      <View
        style={{
          height: 36,
          width: 64,
          backgroundColor: getSelectionMode == 1 ? colors.white : colors.grey_4,
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
            backgroundColor: getSelectionMode == 1 ? colors.white : colors.grey_4,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 1 ? colors.grey_3 : colors.grey_4,
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
            backgroundColor: getSelectionMode == 2 ? colors.grey_1 : colors.white,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == 2 ? colors.grey_4 : colors.grey_1,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;