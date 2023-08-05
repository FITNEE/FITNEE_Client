import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components/native';
import {
    TextInput, 
    Text, 
    TouchableWithoutFeedback, 
    Keyboard, 
    ScrollView,
    TouchableOpacity,
    SafeAreaView
    } from 'react-native';
import { colors } from '../../colors'
import { AppContext } from '../../components/ContextProvider';



const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: white;
`

const TopContainer = styled.View`
    padding: 8px 24px;

    flex-direction: row;
    justify-content: center;
    align-items: center; 

    border-bottom-width: 1px;
    border-bottom-color: ${colors.grey_1};
`

const SearchContainer = styled.View`
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
const HotKeywordContainer = styled.View`
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

const AutoSearchContainer = styled.ScrollView`
    width: 100%;
    height: 100%;
`
const AutoSearch = styled.TouchableOpacity`
    padding: 24px 16px;

    border-top-width: 1px;
    border-top-color: ${colors.grey_1};
`
const AutoSearchText = styled.Text`
    font-weight: 500;
    font-size: 15px;
    color: ${colors.black}; 
    display: inline;
`

export default function Dictionary_1( {navigation} ){

    const { isDark } = useContext( AppContext )

    const textInputRef = useRef()

    const [recentKeyword, setRecentKeyword] = useState([])
    const [hotKeyword, setHotKeyword] = useState(['바벨', '머신', '프리웨이트', '덤벨', '데드리프트', '사이드 레터럴 레이즈', '크런치'])
    const [search, setSearch] = useState('')
    const [isSearching, setIsSearching] = useState(true)

    const [exerciseList, setExerciseList] = ["레그프레스 머신","스미스 머신 스쿼트","레그익스텐션","레그컬","백 스쿼트","저처스쿼트","루마니안 데드리프트(하체&등)","고블릿 스쿼트","덤벨 런지","맨몸 스쿼트","맨몸 런지","삼두근 푸쉬다운 머신","바이셉 컬 머신","바벨 바이셉 컬","스컬 크러셔(라잉 트라이셉스 익스텐션)","해머 컬","덤벨 트라이셉스 킥백","팔굽혀펴기(삼두근 타겟팅)","딥스(삼두)","","숄더프레스 머신","래터럴 레이즈 머신","밀리터리 프레스(바벨 오버헤드 프레스)","바벨 업라이트 로우","덤벨 숄더 프레스","덤벨을 이용한 레터럴 레이즈","파이크 푸쉬업","와이드/디클라인 푸쉬업","체스트프레스 머신","펙 플라이 머신","벤치 프레스","인클라인/디클라인 벤치프레스","덤벨 벤치프레스","덤벨 플라이","푸쉬업","딥스(아랫가슴)","랫풀다운 머신","시티드로우 머신","바벨로우","데드리프트","원암 덤벨 로우","레니게이드 행","풀 업","y-t-i 레이즈","케이블 크런치","행잉 레그레이즈","바벨 롤아웃","스탠딩 바벨 트위스트","덤벨 러시안 트위스트","덤벨 사이드 벤드","윗몸일으키기","크런치(바이시클 크런치","플랭크(기본 플랭크","시티드 니업","레그레이즈(누워서)"]
    

    const onChangeText = (payload) => setSearch(payload)
    const onSubmitEditing = () => {
        let temp = [...recentKeyword]

        search.length == 0? 
            null
        :
        (  
            recentKeyword.length === 3? temp = temp.slice(0, 2) : null,
            temp = [search, ...temp],
            setRecentKeyword(temp),
            navigation.navigate('Dictionary_2', {search: {search}})
        )
    }

    useEffect(()=>{
        search.length === 0?
            setIsSearching(false)
            : setIsSearching(true)
    }, [search])

         
    return(
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <TouchableWithoutFeedback style={{flex:1}} onPress={Keyboard.dismiss}>
                <Container>
                    <TopContainer>
                        <SearchContainer>
                            <Logo/>
                            <SearchInput
                                ref={textInputRef}
                                placeholder='운동명, 부위 검색'
                                placeholderTextColor={colors.grey_4}
                                returnKeyType='search'
                                onChangeText={onChangeText}
                                value={search}
                                onSubmitEditing={onSubmitEditing}
                                >
                            </SearchInput>
                        </SearchContainer>
                        <DeleteAllBtn/>
                    </TopContainer>
                    { !isSearching && <BottomContainer>
                        <RecentContainer style={{marginBottom: 56}}>
                            <RecentTitle>최근 검색 키워드</RecentTitle>
                            <RecentKeywordContainer>
                            {
                                recentKeyword.length === 0?
                                    null:
                                    recentKeyword.map((keyword) => (
                                        <KeywordContainer>
                                            <Keyword>{keyword}</Keyword>
                                        </KeywordContainer>
                                    ))
                            }    
                            </RecentKeywordContainer>                
                        </RecentContainer>
                        <HotContainer>
                            <HotTitle>인기 키워드</HotTitle>
                            <HotKeywordContainer>
                            {
                                hotKeyword.map((keyword) => (
                                    <KeywordContainer>
                                        <Keyword>{keyword}</Keyword>
                                    </KeywordContainer>
                                ))
                            }
                            </HotKeywordContainer>
                        </HotContainer>
                    </BottomContainer>}
                    { isSearching && <AutoSearchContainer> 
                        {/* 라이트모드 다크모드 컬러 설정 필요 */}
                        <AutoSearch onPress={()=>navigation.navigate('Dictionary_3')}>
                            <AutoSearchText style={{color: '#9747FF'}}>사
                                <AutoSearchText>이드 레터럴 라이즈</AutoSearchText>
                            </AutoSearchText>
                        </AutoSearch>
                        <AutoSearch>
                            <AutoSearchText >사이드 
                                <AutoSearchText style={{color: '#9747FF'}}> 레터럴 </AutoSearchText>
                                라이즈
                            </AutoSearchText>
                        </AutoSearch>
                        <AutoSearch>
                            <AutoSearchText>사이드 레터럴 라이즈</AutoSearchText>
                        </AutoSearch>
                    </AutoSearchContainer>}
                </Container>
            </TouchableWithoutFeedback>
        </SafeAreaView>

    )
} 