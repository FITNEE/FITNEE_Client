import React, { useState, useContext, useEffect } from 'react'
import { Pressable, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';
import { colors } from '../../colors'
import { AppContext } from '../../components/ContextProvider';
import axios from 'axios';


const Container = styled.View`
    flex: 1;
    /* background-color: ${colors.grey_1}; */
`
const TopContainer = styled.View`
    padding: 8px 24px;

    justify-content: center;
    align-items: center; 

    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey_1};
`
const SearchContainer = styled.Pressable`
    background-color: ${colors.grey_1};

    border-radius: 12px;
    padding: 8px 12px;

    flex-direction: row;
    align-items: center;

    width: 100%;
`
const Logo = styled.Image`
    width: 24px;
    height: 24px;
    background-color: ${colors.red};

    margin-right: 12px;
`
const SearchInput = styled.Text`
    font-size: 16px;
    font-weight: 400;
    color: ${colors.black};
` 
const PartContainer = styled.ScrollView`
    margin-top: 8px;
    margin-right: -24px;
`
const Part = styled.TouchableOpacity`
    border-radius: 100px;
    background-color: ${colors.grey_1};
 
    padding: 8px 15px;
    margin-right: 8px;
`
const PartText = styled.Text`
    font-weight: 600;
    font-size: 14px;
    color: ${colors.black};
`

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

export default function Dictionary_2({ navigation, route }){

    const {isDark} = useContext(AppContext)
    const { search } = route.params

    const PressedPart = styled.TouchableOpacity`
        border-radius: 100px;
        background-color: ${ isDark ? colors.d_sub_2 : colors.l_sub_2};
        padding: 8px 15px;
        margin-right: 8px;
    `
    const PressedPartText = styled.Text`
        font-weight: 600;
        font-size: 14px;
        color: ${ isDark ? colors.d_main : colors.l_main};
    `

    const [part, setPart] = useState([['전신', false], ['어깨', false], ['상체', false], ['가슴', false], ['등', false], ['복근', false], ['하체', false], ['엉덩이', false], ['유산소', false]])
    const [exerciseName, setExerciseName] = useState(['데드리프트', '데드리프트'])

    const onPressPart = (i) => {
        let temp = [...part]
        temp[i][1] = !temp[i][1]
        setPart(temp)
    }

    const goBack = ()=>{
        navigation.setOptions({animationEnabled: false})
        navigation.goBack()
    }

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
      };
      

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <Container>
                <TopContainer>
                    <SearchContainer>
                        <Logo/>
                        <SearchInput>{search.search}</SearchInput>
                    </SearchContainer>
                    <PartContainer 
                        horizontal 
                        showsHorizontalScrollIndicator='false'>
                    {
                        part.map((part, i) => (
                            part[1] == false?
                                <Part onPress={()=> onPressPart(i)}><PartText>{part[0]}</PartText></Part>
                                :
                                <PressedPart onPress={()=> onPressPart(i)}><PressedPartText>{part[0]}</PressedPartText></PressedPart>

                        ))
                    }
                    </PartContainer>
                </TopContainer>
                
            </Container>
        </SafeAreaView>
    )
}