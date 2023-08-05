import React, {useEffect, useState} from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import {colors} from '../colors'
import axios from 'axios'

const BottomContainer = styled.TouchableOpacity`
    padding: 40px 22px; 
`
const RecentContainer = styled.View`
    height: 50px;
    width: 100%;

    margin-bottom: 56px;
`
const RecentTitle = styled.Text`
    font-weight: 600;
    font-size: 16px;
    color: ${colors.black};

    margin-bottom: 16px;
`
const RecentKeywordContainer = styled.View`
    display: inline-block;
    flex-direction: row;
    flex-wrap: wrap;
`
const HotContainer =  styled.View`
    height: 123px;
    width: 100%;
`
const HotTitle = styled.Text`
    font-weight: 600;
    font-size: 16px;
    color: ${colors.black};          

    margin-bottom: 16px;
`
const PopularKeywordsContainer = styled.View`
    display: inline-block;
    flex-direction: row;
    flex-wrap: wrap;
`

const KeywordContainer = styled.View`
    background-color: ${colors.grey_1}; 
    border-radius: 100px;

    margin-right: 4px;
    margin-bottom: 4px; 
    padding: 10px 14px;
`
const Keyword = styled.Text`
    font-weight: 600;
    font-size: 13px;
    color: ${colors.grey_7}; 
`

export default function Dictionary_Keyword(){

    const [popularKeywords, setPopularKeywords] = useState([])
    const [recentKeywords, setRecentKeywords] = useState([])

    const getKeywords = async () => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary"
            const response = await axios.get(url + detailAPI)
            const result = response.data
            return result.result;
        } 
        catch (error) {
          console.error("Failed to fetch data:", error);
        }
    }
    useEffect(()=>{
        getKeywords().then((result)=>{
            let temp = result.recentKeywords
            let temp2 = temp.map((keyword)=>keyword.text)
            setRecentKeywords(temp2)

            temp = result.popularKeywords
            temp2 = temp.map((keyword)=>keyword.text)
            setPopularKeywords(temp2)
        })
    }, [])
    

    return(
        <BottomContainer onPress={getKeywords}>
            <RecentContainer style={{marginBottom: 56}}>
                <RecentTitle>최근 검색 키워드</RecentTitle>
                <RecentKeywordContainer>
                {
                    recentKeywords.map((keyword) => (
                        <KeywordContainer>
                            <Keyword>{keyword}</Keyword>
                        </KeywordContainer>
                    ))
                }    
                </RecentKeywordContainer>                
            </RecentContainer>
            <HotContainer>
                <HotTitle>인기 키워드</HotTitle>
                <PopularKeywordsContainer>
                {
                    popularKeywords.map((keyword) => (
                        <KeywordContainer>
                            <Keyword>{keyword}</Keyword>
                        </KeywordContainer>
                    ))
                }
                </PopularKeywordsContainer>
            </HotContainer>
        </BottomContainer>
    )
}
