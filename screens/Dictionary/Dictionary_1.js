import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native';
import {
    TextInput, 
    Text, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ActivityIndicator
    } from 'react-native';
import { colors } from '../../colors'
import { AppContext } from '../../components/ContextProvider'
import Dictionary_AutoSearch from '../../components/Dictionary_AutoSearch'
import Dictionary_List from '../../components/Dictionary_List'
import axios from 'axios'

const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: white;
`

const TopContainer = styled.View`
    padding: 8px 24px;
    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey_1};
`
const SearchContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center; 
`
const SearchInputContainer = styled.View`
    background-color: ${colors.grey_1};
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
`
const Logo = styled.Image`
    width: 24px;
    height: 24px;
    background-color: ${colors.red};

    margin-right: 12px;
`
const SearchInput = styled.TextInput`
    font-size: 16px;
    font-weight: 400;
    color: ${colors.black};
    width: 240px;
`
const DeleteAllBtn = styled.TouchableOpacity`
    width: 24px;
    height: 24px;
    background-color: ${colors.red};
    margin-left: 16px;
`
const PartContainer = styled.ScrollView`
    padding-top: 8px;
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
const BottomContainer = styled.View`
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
    flex-direction: row;
    flex-wrap: wrap;
`
const KeywordContainer = styled.TouchableOpacity`
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

export default function Dictionary_1( {navigation} ){

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

    const { isDark } = useContext( AppContext )

    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [part, setPart] = useState([['유산소', false], ['어깨', false], ['상체', false], ['가슴', false], ['등', false], ['복근', false], ['하체', false], ['엉덩이', false], ])
    const [popularKeywords, setPopularKeywords] = useState([])
    const [recentKeywords, setRecentKeywords] = useState([])
    const [searchList, setSearchList] = useState([])
    
    // 사용자가 키보드에서 검색 버튼 눌렀을 때
    const onSubmitEditing = () => {
        setIsSubmit(true)
        setIsSearching(false)
        postKeywords(search)
    }

    // 사용자가 검색창에 onFocus 했을 때
    const onFocusInput = ()=>{
        setIsSubmit(false)
        search.length == 0? null: setIsSearching(true)
    }
    
    // 검색List창에서 부위 버튼 toggle
    const onPressPart = (i) => {
        let temp = [...part]
        temp[i][1] = !temp[i][1]
        setPart(temp)
    }
    // 검색창 옆 X 버튼 눌렀을 때
    const onDeleteInput = () => {
        setSearch('') 
        setIsSearching(false) // 키워드들 보이게
        setIsSubmit(false)
    }

    // 검색어(search)가 비어있으면 IsSearching = true / 아니면 false
    useEffect(()=>{
        search.length === 0?
            setIsSearching(false)
            : setIsSearching(true)
    }, [search])
    
    // 최근 검색 키워드, 인기 키워드 받아오는 API
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
    // getKeywords로 키워드들 받아와서 recetKeywords, popularKeywords에 저장
    useEffect(()=>{
        getKeywords().then((result)=>{
            let temp = result.recentKeywords
            let temp2 = temp.map((keyword)=>keyword.text)
            setRecentKeywords(temp2)

            temp = result.popularKeywords
            temp2 = temp.map((keyword)=>keyword.text)
            setPopularKeywords(temp2)
        })
    }, [isSearching, isSubmit])
         

    // 검색한 단어를 최근 검색 키워드에 저장하는 API  
    const postKeywords = async (search) => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/usersearch"
            const response = await axios.post(url + detailAPI, null, 
                {
                    params: {
                        search: search
                    }
                })
            const result = response.data

            if(result.isSuccess) console.log(`검색기록 저장 성공(검색어: ${search})`)
            else console.log(`검색기록 저장 실패(검색어: ${search})`)
        } 
        catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
          console.error("Failed to fetch data:", error);
        }
    } 

    // 검색어에 따라 일치하는 운동리스트 불러오는 API
    const postSearch = async (text) => {
        try {
            let url = "https://gpthealth.shop/"
            let detailAPI = "/app/dictionary/searchexercise"
            const response = await axios.post(url + detailAPI, null, 
                {
                    params: {
                        search: text
                    }
                })
            const result = response.data
            return result.result

            if(result.isSuccess) console.log('검색리스트 불러오기 성공')
            else console.log('검색리스트 불러오기 실패')
        } 
        catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
            console.error("Failed to fetch data:", error);
        }
    } 
    // 검색어 변경될 때마다 search값 update
    const onChangeText = (event) => {
        const {eventCount, target, text} = event.nativeEvent
        setSearch(text)
        postSearch(text).then((result)=>setSearchList(result))
    }

    const onPressKeyword = (keyword) => {
        postSearch(keyword).then((result)=>setSearchList(result))
        setSearch(keyword)
        setIsSubmit(true)
    }

    return(
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
                <Container>
                    <TopContainer>
                        <SearchContainer>
                            <SearchInputContainer onPress={isSubmit? print: null}>
                                <Logo/>
                                <SearchInput
                                    autoFocus={true}
                                    placeholder='운동명, 부위 검색'
                                    placeholderTextColor={colors.grey_4}
                                    returnKeyType='search'
                                    onChange={onChangeText}
                                    value={search}
                                    onSubmitEditing={onSubmitEditing}
                                    onFocus={onFocusInput}
                                    >
                                </SearchInput>
                            </SearchInputContainer>
                            <DeleteAllBtn onPress={onDeleteInput}/>
                        </SearchContainer>
                        { isSubmit && <PartContainer 
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
                        </PartContainer>}
                    </TopContainer>
                    { !isSearching && !isSubmit &&
                        <BottomContainer>
                            <RecentContainer style={{marginBottom: 56}}>
                                <RecentTitle>최근 검색 키워드</RecentTitle>
                                <RecentKeywordContainer>
                                {
                                    recentKeywords.map((keyword) => (
                                        <KeywordContainer onPress={()=>onPressKeyword(keyword)}>
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
                                        <KeywordContainer onPress={()=>onPressKeyword(keyword)}>
                                            <Keyword>{keyword}</Keyword>
                                        </KeywordContainer>
                                    ))
                                }
                                </PopularKeywordsContainer>
                            </HotContainer>
                        </BottomContainer>
                    }
                    { isSearching && !isSubmit && 
                        <Dictionary_AutoSearch 
                            navigation = {navigation} 
                            parentSearch = {search}
                            parentSearchList = {searchList}
                    />}
                    { isSubmit && <Dictionary_List
                        navigation = {navigation}
                        searchList = {searchList}
                    />}
                </Container>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
} 


