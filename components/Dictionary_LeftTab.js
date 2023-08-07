import React, {useState, useContext} from 'react'
import styled from 'styled-components/native'
import WrappedText from 'react-native-wrapped-text'
import { BottomSheetScrollView } from "@gorhom/bottom-sheet"
import {colors} from '../colors'
import { AppContext } from './ContextProvider'

const ProcessContainer = styled.View`
    margin: 16px 24px;
`
const Process = styled.View`
    background-color: ${colors.grey_1};
    border-radius: 12px;
    padding: 20px 24px;
    margin-bottom: 8px;

    flex-direction: row;
`

const ProcessContent = styled.View`
    align-items: flex-start;
    margin-left: 8px;
    margin-right: 21px;
`
const ProcessName = styled.Text`
    color: ${colors.black};
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 8px;
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
    font-weight: 600;
    font-size: 15px;
`
const CautionContentContainer = styled.View`
    padding: 24px;
    background-color: ${colors.grey_1};
    border-radius: 12px;
`
const CautionDetailContainer = styled.View`
    flex-direction: row;
    align-items: center;   
`
const CautionDetail = styled.Text`
    color: ${colors.black};
    font-weight: 400;
    font-size: 13px;
`

export default function Dictionary_LeftTab(props){
    // const {exerciseDetail} = props.exerciseDetail
    const {isDark} = useContext(AppContext)

    const ProcessNum = styled.Text`
    color: ${ isDark ? colors.d_main : colors.l_main};
    font-weight: 600;
    font-size: 15px;
    `
    const CautionDot = styled.View`
    background-color: ${ isDark ? colors.d_sub_1 : colors.l_sub_1};
    width: 12px;
    height: 12px;
    border-radius: 6px;
    margin-right: 4px;
    margin-top: 4px;
    margin-bottom: 4px;
    `
    const [processName, setProcessName] = useState(['안장 높낮이 조절', '시작 자세', '마무리 자세'])
    const [caution, setCaution] = useState(['허리를 과도하게 안으로 넣지 마세요.', '적절한 무게로 승모근에 무리가 가지 않도록 하세요.', '안장과 바의 위치점을 올바르게 맞춰주세요.'])

    return(
        <BottomSheetScrollView 
        showsVerticalScrollIndicator={false}
        >            
            <ProcessContainer>
            {                            
                processName.map((processName, i) => (
                    <Process>
                        <ProcessNum>{'0'+ (i+1)}</ProcessNum>
                        <ProcessContent>
                            <ProcessName>{processName}</ProcessName>
                            <WrappedText textStyle={{fontWeight: 400, fontSize: 13, color: `${colors.black}`}}>
                                안장의 높이를 삼두 중앙보다 약간 위쪽과 같도록 맞춘 후 손잡이를 잡아주세요.
                            </WrappedText>
                        </ProcessContent>
                    </Process>
                ))
            }
            </ProcessContainer>
            <CautionContainer>
                <CautionTitleContainer>
                    <CautionImage/>
                    <CautionTitle>이 부분은 특히 주의해주세요!</CautionTitle>
                </CautionTitleContainer>
                <CautionContentContainer>
                {
                    caution.map((caution) => (
                        <CautionDetailContainer>
                            <CautionDot/>
                            <CautionDetail>{ caution }</CautionDetail>
                        </CautionDetailContainer>
                    ))
                }
                </CautionContentContainer>
            </CautionContainer>
        </BottomSheetScrollView>
    )
}