import React, {useContext, useState} from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import { colors } from '../colors';
import { AppContext } from './ContextProvider';

const CustomSwitch = ({
  selectionMode,
  option1,
  option2
}) => {
  const { isDark, setIsDark } = useContext(AppContext);

  const updatedSwitchData = val => {
    setIsDark(val);
  };

  //72px
  return (
    <View>
      <View
        style={{
          height: 36,
          width: 64,
          backgroundColor: isDark == 0 ? colors.white : colors.grey_4,
          borderRadius: 1000,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 4,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(0)}
          style={{
            flex: 1,
            backgroundColor: isDark == 0 ? colors.white : colors.grey_4,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: isDark == 0 ? colors.grey_3 : colors.grey_4,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,
            backgroundColor: isDark == 1 ? colors.grey_1 : colors.white,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: isDark == 1 ? colors.grey_4 : colors.grey_1,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;