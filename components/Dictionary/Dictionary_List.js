import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { colors } from '../../colors'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import { useRecoilValue } from 'recoil'
import RightIcon from '../../assets/SVGs/Right.svg'
import { TouchableOpacity } from 'react-native'
import { pngPath } from '../../imagePath'

export default function Dictionary_List(props) {
    const isDark = useRecoilValue(IsDarkAtom)

    //props
    const { navigation, searchList, part } = props

    // 검색리스트의 아이템 터치시 사전상세페이지로 이동, exercise = {equipment, muscle, name, parts}
    const onPress = (exercise) => navigation.navigate('Dictionary_2', { exercise })

    // 부위toggle버튼 클릭시 해당되는 운동들만 보여줌
    const [filteredList, setFilteredList] = useState(searchList)

    // const [selectedParts, setSelectedParts] = useState([])
    const filterList = () => {
        const selectedParts = part.filter((item) => item[1]).map((item) => item[0])

        if (selectedParts.length == 0) {
            // 선택된 버튼이 없으면 전부 보여주기(default)
            setFilteredList(searchList)
        } else {
            const tempList = searchList.filter((item) => selectedParts.includes(item.parts))
            setFilteredList(tempList)
        }
    }
    useEffect(() => {
        filterList()
    }, [part, searchList])

    const editMuscle = (muscle) => {
        if(muscle.length >= 9){
            return muscle.substring(0, 9) + '...'
        }
        else return muscle
    }

    return (
        <ListContainer
            showsVerticalScrollIndicator={false}
            style={{ backgroundColor: isDark ? `${colors.d_background}` : `${colors.l_background}` }}
        >
            {filteredList === undefined
                ? null
                : filteredList?.map((exercise, i) => (
                      <ExerciseContainer
                          key={i}
                          onPress={() => onPress(exercise)}
                          style={{ backgroundColor: isDark ? `${colors.d_background}` : `${colors.l_background}` }}
                      >
                          <ExerciseLeftContainer>
                                <ExerciseImg
                                    style={{ backgroundColor: isDark ? `${colors.black}` : `${colors.grey_1}` }}
                                    source={pngPath.path[exercise.healthCategoryIdx-1]}
                                />
                              <ExerciseDetailContainer>
                                  <ExerciseName style={{ color: isDark ? `${colors.grey_3}` : `${colors.black}` }}>
                                      {exercise.name}
                                  </ExerciseName>
                                  <ExerciseArea style={{ color: isDark ? `${colors.grey_3}` : `${colors.grey_7}` }}>
                                      {exercise.parts} | {editMuscle(exercise.muscle)} | {exercise.equipment}
                                  </ExerciseArea>
                              </ExerciseDetailContainer>
                          </ExerciseLeftContainer>
                          <TouchableOpacity onPress={() => onPress(exercise)}>
                              <RightIcon
                                  width={24}
                                  height={24}
                                  color={isDark ? colors.grey_3 : colors.black} // dark 모드 색 임의로 넣어놈
                              />
                          </TouchableOpacity>
                      </ExerciseContainer>
                  ))}
        </ListContainer>
    )
}

const ListContainer = styled.ScrollView``
const ExerciseContainer = styled.TouchableOpacity`
    padding: 16px 24px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const ExerciseLeftContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const ExerciseImg = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`
const ExerciseDetailContainer = styled.View`
    margin-left: 16px;
`
const ExerciseName = styled.Text`
    font-family: Pretendard-Medium;
    font-size: 17px;
    margin-bottom: 5px;
    line-height: 25.5px;
`
const ExerciseArea = styled.Text`
    font-family: Pretendard-Regular;
    font-size: 13px;
`
