import React, {useState} from 'react'
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

    const navigateToDic3 = () => props.navigateToDic3()
    const [exerciseName, setExerciseName] = useState(['데드리프트', '데드리프트'])

    const getPartsExercise = async () => {
        try {
          let url = "https://gpthealth.shop/";
          let detailAPI = "/app/dictionary/exerciseinfo";
          const response = await axios.get(url + detailAPI, {
            params:{
                parts: "엉덩이"
            }
          });
          const result = response.data;
          console.log(result.result)
          return result;
        } 
        catch (error) {
          console.error("Failed to fetch data:", error);
        }
    }

    return(
        <ListContainer showsVerticalScrollIndicator='false'>
        {
            exerciseName.map((exercise) => (
  
                <ExerciseContainer onPress={navigateToDic3}>
                    <ExerciseLeftContainer>
                        <ExerciseImg></ExerciseImg>
                        <ExerciseDetailContainer>
                            <ExerciseName>데드리프트</ExerciseName>
                            <ExerciseArea>전신 | 코어 | 바벨</ExerciseArea>                        
                        </ExerciseDetailContainer>
                    </ExerciseLeftContainer>
                    <AddtoBtn/>
                </ExerciseContainer>
            ))
        }
        </ListContainer>
    )
}