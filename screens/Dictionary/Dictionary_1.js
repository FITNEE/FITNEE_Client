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
    ActivityIndicator, StatusBar
    } from 'react-native';
import { colors } from '../../colors'
import Dictionary_AutoSearch from '../../components/Dictionary/Dictionary_AutoSearch'
import Dictionary_List from '../../components/Dictionary/Dictionary_List'
import axios from 'axios'
import { IsDarkAtom } from "../../recoil/MyPageAtom"
import { useRecoilValue } from "recoil"
import SearchIcon from '../../assets/SVGs/Search.svg'
import DeleteIcon from '../../assets/SVGs/Delete.svg'
import DeleteDarkIcon from '../../assets/SVGs/Delete_Dark.svg'

export default function Dictionary_1({ navigation }) {
    const isDark = useRecoilValue(IsDarkAtom)

    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [part, setPart] = useState([['유산소', false], ['어깨', false], ['상체', false], ['가슴', false], ['등', false], ['복근', false], ['하체', false], ['엉덩이', false], ])
    const [popularKeywords, setPopularKeywords] = useState([])
    const [recentKeywords, setRecentKeywords] = useState([])
    const [searchList, setSearchList] = useState([])

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
    const postKeywords = async () => {
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
    // 최근검색어, 인기검색어 클릭시 검색List 화면으로 전환
    const onPressKeyword = (keyword) => {
        setSearch(keyword)
        postSearch(keyword).then((result)=>setSearchList(result))
        setIsSubmit(true)
    }
    // 사용자가 키보드에서 검색 버튼 눌렀을 때
    const onSubmitEditing = () => {
        setIsSubmit(true)
        setIsSearching(false)
    }
    useEffect(()=>{
        postKeywords()
    }, [isSubmit])

    return(
        <>
        <StatusBar barStyle={isDark? 'light-content': 'dark-content'}/>
        <SafeAreaView 
            style={{backgroundColor: isDark? `${colors.d_background}`:`${colors.l_background}`, flex: 1}}>
            <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
                <Container>
                    <TopContainer style={{borderBottomColor: isDark? `${colors.grey_8}`:`${colors.grey_2}`}}>
                        <SearchContainer>
                            <SearchInputContainer 
                                onPress={isSubmit? print: null}
                                style={{backgroundColor: isDark?`${colors.black}`: `${colors.grey_1}`}}
                            >
                                <SearchIcon
                                    style={{ marginRight: 12 }}
                                    width={24}
                                    height={24}
                                    color={isDark? colors.white: colors.black}
                                />
                                <SearchInput
                                    keyboardAppearance= {isDark? 'dark':'light'}
                                    autoFocus={true}
                                    placeholder='운동명, 부위 검색'
                                    placeholderTextColor={colors.grey_4}
                                    returnKeyType='search'
                                    onChange={onChangeText}
                                    value={search}
                                    onSubmitEditing={onSubmitEditing}
                                    onFocus={onFocusInput}
                                    style={{color: isDark? `${colors.grey_3}` : `${colors.black}`}}
                                    >
                                </SearchInput>
                                <TouchableOpacity 
                                    style={{ marginLeft: 16}}
                                    onPress={onDeleteInput}>
                                    {
                                        isDark? 
                                        <DeleteDarkIcon
                                            width={24}
                                            height={24}
                                        />
                                        :
                                        <DeleteIcon 
                                            width={24}
                                            height={24}
                                        />
                                    }
                                </TouchableOpacity>
                            </SearchInputContainer>
                        </SearchContainer>
                        { isSubmit && <PartContainer 
                            horizontal 
                            showsHorizontalScrollIndicator='false'>
                            {
                                part.map((part, i) => (
                                    part[1] == false?
                                        <Part 
                                            onPress={()=> onPressPart(i)}
                                            style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}
                                        >
                                            <PartText style={{color: isDark? `${colors.grey_4}`:`${colors.grey_6}`}}>{part[0]}</PartText>
                                        </Part>
                                        :
                                        <PressedPart 
                                            onPress={()=> onPressPart(i)}
                                            style={{backgroundColor: isDark? `${colors.d_sub_2}`:`${colors.l_sub_2}`}}
                                        >
                                            <PressedPartText style={{color: isDark? `${colors.d_main}`:`${colors.l_main}`}}>{part[0]}</PressedPartText>
                                        </PressedPart>
                                ))
                            }
                        </PartContainer>}
                    </TopContainer>
                    { !isSearching && !isSubmit &&
                        <BottomContainer>
                            <KeywordBox>
                                <KeywordTitle style={{color: isDark? `${colors.white}`:`${colors.black}`}}>
                                    최근 검색 키워드
                                </KeywordTitle>
                                <KeywordContainer>
                                {
                                    recentKeywords.map((keyword, i) => (
                                        <KeywordWrapper 
                                            onPress={()=>onPressKeyword(keyword)} 
                                            key={i}
                                            style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}
                                        >
                                            <Keyword style={{color: isDark? `${colors.grey_3}`:`${colors.grey_7}`}}>{keyword}</Keyword>
                                        </KeywordWrapper>
                                    ))
                                }    
                                </KeywordContainer>                
                            </KeywordBox>
                            <KeywordBox>
                                <KeywordTitle style={{color: isDark? `${colors.white}`:`${colors.black}`}}>
                                    인기 키워드
                                </KeywordTitle>
                                <KeywordContainer>
                                {
                                    popularKeywords.map((keyword, i) => (
                                        <KeywordWrapper 
                                            onPress={()=>onPressKeyword(keyword)}
                                            key={i} 
                                            style={{backgroundColor: isDark? `${colors.grey_8}`:`${colors.grey_1}`}}   
                                        >
                                            <Keyword style={{color: isDark? `${colors.grey_3}`:`${colors.grey_7}`}}>{keyword}</Keyword>
                                        </KeywordWrapper>
                                    ))
                                }
                                </KeywordContainer>
                            </KeywordBox>
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
                        part = {part}
                    />}
                </Container>
            </TouchableWithoutFeedback>
        </SafeAreaView></>
    )
} 


const Container = styled.View`
    flex: 1;
    width: 100%;
`
const TopContainer = styled.View`
    padding: 8px 24px;
    border-bottom-width: 1px;
    margin-top: 24px;
`
const SearchContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center; 
`
const SearchInputContainer = styled.View`
    border-radius: 12px;
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
`
const SearchInput = styled.TextInput`
    font-size: 16px;
    font-family: Pretendard-SemiBold;
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
    padding: 8px 20px;
    margin-right: 8px;
`
const PartText = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 14px;
    line-height: 21px;
`
const PressedPart = styled.TouchableOpacity`
    border-radius: 100px;
    padding: 8px 20px;
    margin-right: 8px;
`
const PressedPartText = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 14px;
    line-height: 21px;
`
const BottomContainer = styled.View`
    padding: 40px 22px;
`
const KeywordBox = styled.View`
    width: 100%;
    margin-bottom: 56px;
`
const KeywordTitle = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 16px;
    margin-bottom: 16px;
    line-height: 22.5px;
`
const KeywordContainer = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`
const KeywordWrapper = styled.TouchableOpacity`
    border-radius: 100px;
    margin-right: 4px;
    margin-bottom: 4px;
    padding: 10px 14px;
` 
const Keyword = styled.Text`
    font-family: Pretendard-SemiBold;
    font-size: 13px;
    line-height: 19.5px;
`