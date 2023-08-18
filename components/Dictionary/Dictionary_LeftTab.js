import React, {useState, useContext, useEffect} from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import WrappedText from 'react-native-wrapped-text'
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import {colors} from '../../colors'
import axios from 'axios'
import { IsDarkAtom } from "../../recoil/MyPageAtom"
import { useRecoilValue } from "recoil"
import AlertIcon from '../../assets/SVGs/Alert.svg'

export default function Dictionary_LeftTab(props){
    const isDark = useRecoilValue(IsDarkAtom)
    const exerciseName = props.exerciseName

    const [exerciseDetail, setExerciseDetail] = useState()
    const getExerciseDetail = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/exercisemethod"
            const response = await axios.get(url + detailAPI, {
                params: {
                    name: exerciseName
                }
            })
            const result = response.data

            if(result.isSuccess) console.log(`과정, 주의사항 불러오기 성공 (검색어: ${exerciseName})`)
            else console.log(`과정, 주의사항 불러오기 실패 (검색어: ${exerciseName})`)
            
            return result.result;
        } 
        catch (error) {
          console.error("Failed to fetch data:", error);
        }
    }
    // const [caution, setCaution] = useState()
    useEffect(()=>{
        getExerciseDetail().then((result)=>{
            setExerciseDetail(result)
            // console.log(result.exercisecaution[0])
            // // const cautions = Object.values(exerciseDetail?.exercisecaution[0]?).map(value=>value)
            // // setCaution(cautions)
        })
    }, [])  

    return(
        <BottomSheetScrollView 
        showsVerticalScrollIndicator={false}
        >        
            <ProcessContainer>
            {                            
                exerciseDetail === undefined?
                null
                :
                exerciseDetail.exerciseinfo.map((exerciseinfo, i) => (
                    <Process 
                        key={i}
                        style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}
                    >
                        <ProcessNum style={{color: isDark? `${colors.d_main}`:`${colors.l_main}`}}>{`0${exerciseinfo.num}`}</ProcessNum>
                        <ProcessContent>
                            <ProcessName style={{color: isDark? `${colors.white}`:`${colors.black}`}}>{exerciseinfo.title}</ProcessName>
                            <WrappedText textStyle={{lineHeight: 19.5, fontFamily: 'Pretendard-Regular', fontSize: 13, color: isDark? `${colors.white}`:`${colors.black}`}}>
                                {exerciseinfo.content}
                            </WrappedText>
                        </ProcessContent>
                    </Process>
                ))
            } 
            </ProcessContainer>
            
            {
                <CautionContainer>
                    <CautionTitleContainer>
                        <AlertIcon
                            width={20}
                            height={20}
                            style={{marginRight: 4}}
                        />
                        <CautionTitle style={{color: isDark? `${colors.white}`:`${colors.black}`}}>이 부분은 특히 주의해주세요!</CautionTitle>
                    </CautionTitleContainer>
                    <CautionContentContainer style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}>  
                         <CautionDetailContainer style={{marginBottom: 4}}>
                            <CautionDot style={{backgroundColor: isDark? `${colors.d_main}`:`${colors.l_sub_1}`}}/>
                            <CautionDetail style={{color: isDark? `${colors.white}`:`${colors.black}`}}>{exerciseDetail?.exercisecaution[0].caution1}</CautionDetail>
                        </CautionDetailContainer>        
                        <CautionDetailContainer style={{marginBottom: 4}}>
                            <CautionDot style={{backgroundColor: isDark? `${colors.d_main}`:`${colors.l_sub_1}`}}/>
                            <CautionDetail style={{color: isDark? `${colors.white}`:`${colors.black}`}}>{exerciseDetail?.exercisecaution[0].caution2}</CautionDetail>
                        </CautionDetailContainer> 
                        <CautionDetailContainer>
                            <CautionDot style={{backgroundColor: isDark? `${colors.d_main}`:`${colors.l_sub_1}`}}/>
                            <CautionDetail style={{color: isDark? `${colors.white}`:`${colors.black}`}}>{exerciseDetail?.exercisecaution[0].caution3}</CautionDetail>
                        </CautionDetailContainer>                   
                    </CautionContentContainer>
                </CautionContainer>
            }
        </BottomSheetScrollView>
    )
}

const ProcessContainer = styled.View`
    margin: 16px 24px;
`
const Process = styled.View`
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 8px;
    flex-direction: row;
`
const ProcessNum = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 15px;
    line-height: 22.5px;
`
const ProcessContent = styled.View`
    align-items: flex-start;
    margin-left: 8px;
    margin-right: 21px;
`
const ProcessName = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 15px;
    margin-bottom: 8px;
    line-height: 22.5px;
`
const CautionContainer = styled.View`
    margin: 36px 24px;
`
const CautionTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`
const CautionImage = styled.Image`
    background-color: ${colors.red};
    width: 20px;
    height: 20px;
    margin-right: 4px;
`
const CautionTitle = styled.Text`
    color: ${colors.black};
    font-family: Pretendard-SemiBold; 
    font-size: 15px;
    line-height: 22.5px;
`
const CautionContentContainer = styled.View`
    padding: 24px;
    border-radius: 12px;
`
const CautionDetailContainer = styled.View`
    flex-direction: row;
    align-items: center;    
`
const CautionDetail = styled.Text`
    color: ${colors.black};
    font-family: Pretendard-Regular;
    font-size: 13px;
    line-height: 19.5px;
`
const CautionDot = styled.View`
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin-right: 4px;
`