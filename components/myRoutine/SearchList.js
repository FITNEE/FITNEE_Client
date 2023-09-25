import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'

import CheckBox_blank from '../../assets/SVGs/CheckBox_blank.svg'
import CheckBox_checked from '../../assets/SVGs/CheckBox_checked.svg'
import { imagePath, pngPath } from '../../imagePath'
const ListContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`
const ResultContainer = styled.TouchableOpacity`
  padding: 24px 16px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  justify-content: space-between;
`
const TextContainer = styled.View`
  flex-direction: column;
  padding-left: 16px;
  flex: 1;
`
const IconContainer = styled.Image`
  width: 60px;
  height: 60px;
  background-color: ${colors.grey_2};
  border-radius: 32px;
`
const Title = styled.Text`
  font-family: Pretendard-Medium;
  font-size: 17px;
`
const SubText = styled.Text`
  font-family: Pretendard-Regular;
  font-size: 13px;
  margin-top: 4px;
`
const CheckButton = styled.View`
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`

export default function SearchList({ parentSearchList, editSelectedList, selectedItem, isDark }) {
  const [isSelected, setIsSelected] = useState(false)
  let tempArr = selectedItem.map((item) => item.healthCategoryIdx)

  return (
    <ListContainer>
      {parentSearchList?.map((words, index) => {
        return (
          <ResultContainer
            style={{ borderTopColor: isDark ? colors.grey_8 : colors.grey_1 }}
            key={index}
            onPress={() => {
              setIsSelected(true)
              editSelectedList('add', index, {
                exerciseName: words.name,
                exerciseParts: words.parts,
                healthCategoryIdx: words.healthCategoryIdx,
              })
            }}
          >
            <IconContainer
              source={pngPath.path[words.healthCategoryIdx - 1]}
              style={{ backgroundColor: isDark ? colors.black : colors.white }}
            />
            <TextContainer>
              <Title style={{ color: isDark ? colors.white : colors.black }}>{words.name}</Title>
              <SubText style={{ color: isDark ? colors.grey_1 : colors.grey_7 }}>
                {words.parts} | {words.equipment}
              </SubText>
            </TextContainer>
            <CheckButton>
              {isSelected & tempArr.includes(words.healthCategoryIdx) ? (
                <CheckBox_checked width={24} height={24} color={isDark ? colors.d_sub_1 : colors.l_sub_2} />
              ) : (
                <CheckBox_blank width={24} height={24} color={isDark ? colors.grey_3 : colors.grey_7} />
              )}
            </CheckButton>
          </ResultContainer>
        )
      })}
    </ListContainer>
  )
}
