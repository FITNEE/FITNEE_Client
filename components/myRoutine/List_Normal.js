import React, { useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { ScreenWidth } from '../../Shared'
import ToggleDown from '../../assets/SVGs/ToggleDown.svg'
import ToggleUp from '../../assets/SVGs/ToggleUp.svg'
import { FlatList } from 'react-native'
import { SetsText_Normal } from '../Shared/MyRoutine_Shared'
import { pngPath } from '../../imagePath'

const SetContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  width: 100%;
`
const ExerciseTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`
const ExerciseTitle = styled.Text`
  font-size: 17px;
  font-family: Pretendard-Medium;
`
const ExerciseSubText = styled.Text`
  font-size: 13px;
  margin-top: 4px;
  font-family: Pretendard-Regular;
  color: ${colors.l_main};
`
const DropDown = styled.TouchableOpacity`
  width: 40px;
  justify-content: center;
  align-items: center;
  height: 40px;
`
const ExtendedContainer = styled.View`
  width: 100%;
  padding: 8px 16px 0px 16px;
`
const ExerciseContainer = styled.View`
  padding: 16px;
  flex-direction: column;
  border-radius: 12px;
  width: ${ScreenWidth - 48}px;
  margin-left: 24px;
  margin-top: 8px;
`
const DefaultContainer = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`
const ExerciseView = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${(props) => (props.isDark ? colors.black : colors.grey_1)};
  margin-right: 16px;
`

export default List_Normal = ({ routineData, isDark, selectedArr, setSelectedArr }) => {
  //DropDown 누른 운동 구분하기위함.
  const handlePress = (id) => {
    let newArr = JSON.parse(JSON.stringify(selectedArr))
    newArr[id] = !newArr[id]
    setSelectedArr(newArr)
  }

  const renderItem = ({ item, index }) => {
    let isCardio = item.healthCategoryIdx == 24 || item.healthCategoryIdx == 25
    return (
      <ExerciseContainer style={{ backgroundColor: isDark ? colors.grey_9 : colors.white }}>
        <DefaultContainer>
          <ExerciseView isDark={isDark} source={pngPath.path[item.healthCategoryIdx - 1]} />
          <ExerciseTextContainer>
            <ExerciseTitle style={{ color: isDark ? colors.white : colors.black }}>{item.exerciseName}</ExerciseTitle>
            <ExerciseSubText>
              {item.exerciseParts} | {item.content.length}세트
            </ExerciseSubText>
          </ExerciseTextContainer>
          <DropDown
            onPress={() => {
              handlePress(index)
            }}
          >
            {selectedArr[index] == true ? (
              <ToggleUp width={24} height={24} color={isDark ? colors.white : colors.black} />
            ) : (
              <ToggleDown width={24} height={24} color={isDark ? colors.white : colors.black} />
            )}
          </DropDown>
        </DefaultContainer>
        {selectedArr[index] == true && (
          <ExtendedContainer>
            {item.content?.map((Contentitem, id) => (
              <SetContainer
                key={id}
                style={{
                  fontWeight: 600,
                }}
              >
                <SetsText_Normal style={{ color: isDark ? colors.white : colors.grey_8 }}>{id + 1}</SetsText_Normal>
                {!isCardio && (
                  <SetsText_Normal style={{ color: isDark ? colors.white : colors.grey_8 }}>
                    {Contentitem.weight ? `${Contentitem.weight} kg` : `-  kg`}
                  </SetsText_Normal>
                )}
                <SetsText_Normal style={{ color: isDark ? colors.white : colors.grey_8 }}>
                  {isCardio ? `${Contentitem.rep * 100} m` : `${Contentitem.rep} 회`}
                </SetsText_Normal>
              </SetContainer>
            ))}
          </ExtendedContainer>
        )}
      </ExerciseContainer>
    )
  }

  return (
    <FlatList
      contentContainerStyle={{ marginTop: 16, paddingBottom: 48 }}
      showsVerticalScrollIndicator
      data={routineData}
      renderItem={renderItem}
    />
  )
}
