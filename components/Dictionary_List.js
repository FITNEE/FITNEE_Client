import React, {useEffect, useState} from 'react'
import styled from 'styled-components/native'
import {colors} from '../colors'

const ListContainer = styled.ScrollView`
    background-color: ${colors.grey_1};
`
const ExerciseContainer = styled.TouchableOpacity`
    padding: 16px 24px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: white;
`
const ExerciseLeftContainer = styled.View`
    flex-direction: row;
    align-items: center;
`
const ExerciseImg = styled.Image`
    background-color: ${colors.grey_1};
    width: 60px;
    height: 60px;
    border-radius: 30px;
`
const ExerciseDetailContainer = styled.View`
    margin-left: 16px;
`
const ExerciseName = styled.Text`
    font-weight: 600;
    font-size: 17px;
    color: ${colors.black};

    margin-bottom: 5px;
`
const ExerciseArea = styled.Text`
    font-weight: 400;
    font-size: 13px;
    color: ${colors.grey_4};
`
const AddtoBtn = styled.TouchableOpacity`
    background-color: ${colors.red};
    width: 24px;
    height: 24px;
`

export default function Dictionary_List(props){

    const { navigation, searchList } = props
    const onPress = (exercise) => navigation.navigate('Dictionary_3', {exercise})

    return(
        <ListContainer showsVerticalScrollIndicator='false'>
        {
            searchList === undefined?
            null
            :
            searchList.map((exercise) => (
                <ExerciseContainer onPress={()=> onPress(exercise)}>
                    <ExerciseLeftContainer>
                        <ExerciseImg></ExerciseImg>
                        <ExerciseDetailContainer>
                            <ExerciseName>{exercise.name}</ExerciseName>
                            <ExerciseArea>{exercise.parts} | {exercise.muscle} | {exercise.equipment}</ExerciseArea>                        
                        </ExerciseDetailContainer>
                    </ExerciseLeftContainer>
                    <AddtoBtn/>
                </ExerciseContainer>
            ))
        }
        </ListContainer>
    )
}