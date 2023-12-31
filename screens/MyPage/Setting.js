import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, SafeAreaView } from 'react-native'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import axios from 'axios'
import { CommonActions, StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { IsDarkAtom, TabBarAtom } from '../../recoil/MyPageAtom'
import Right from '../../assets/SVGs/Right.svg'
import { loggedInState } from '../../recoil/AuthAtom'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import CustomSwitch from '../../components/myPage/CustomSwitch'
import Profile_man from '../../assets/SVGs/Profile_man.svg'
import Profile_woman from '../../assets/SVGs/Profile_woman.svg'

export default function Setting({ navigation }) {
  const isFocused = useIsFocused()
  const isDark = useRecoilValue(IsDarkAtom)
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom)

  useEffect(() => {
    isFocused && setIsTabVisible(false)
  }, [isFocused, isTabVisible])

  const Logout = () => {
    AsyncStorage.clear()
    setLoggedIn(false)
  }
  const [userInfo, setUserInfo] = useState([
    {
      birthYear: '',
      userId: '',
      userNickname: '',
      gender: '',
    },
  ])

  const getUserInfoData = async () => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/mypage/userinfo`
      const response = await axios.get(url + detailAPI)
      const result = response.data
      return result
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  useEffect(() => {
    isFocused &&
      getUserInfoData().then((result) => {
        setUserInfo(result.result)
      })
  }, [isFocused])

  const getUserName = userInfo[0].userNickname
  const getGender = userInfo[0].gender

  return (
    <SafeAreaView backgroundColor={isDark ? colors.grey_9 : colors.white}>
      <Container isDark={isDark}>
        <Profile
          onPress={() => {
            navigation.navigate('UserInfo')
          }}
        >
          <ProfileInfo>
            {getGender == 1 ? (
              <Profile_man
                style={{ marginRight: 8 }}
                width={40}
                height={40}
                color={isDark ? colors.grey_7 : colors.grey_2}
              />
            ) : (
              <Profile_woman
                style={{ marginRight: 8 }}
                width={40}
                height={40}
                color={isDark ? colors.grey_7 : colors.grey_2}
              />
            )}
            <ProfileContents>
              <Name isDark={isDark}>{getUserName}</Name>
            </ProfileContents>
          </ProfileInfo>
          <Right
            width={20}
            height={20}
            // asset={Right}
            color={colors.grey_7}
          />
        </Profile>
        <ModeView>
          <BlockText isDark={isDark}>다크화면 모드</BlockText>
          <BlockContent>
            <CustomSwitch />
          </BlockContent>
        </ModeView>
        <Bar isDark={isDark} />
        <PremiumBlock>
          <PremiumBack source={require('../../assets/Imgs/MyPageBanner.png')}>
            <ComingBox>
              <ComingText>Coming Soon</ComingText>
            </ComingBox>
            <PremiumText>프리미엄 플랜으로 건강한 몸을 더 쉽게 만들어보세요</PremiumText>
          </PremiumBack>
        </PremiumBlock>
        <Block
          isDark={isDark}
          onPress={() => {
            Alert.alert('루틴을 다시 생성할까요?', '현재 이용 중인 루틴은 삭제되며\n다시 불러올 수 없습니다.', [
              {
                text: '취소',
                style: 'default',
              },
              {
                text: '다시 생성하기',
                style: 'default',
                isPreferred: true,
                onPress: () => navigation.dispatch(StackActions.replace('CreateRoutineNav')),
              },
            ])
          }}
        >
          <BlockText isDark={isDark}>루틴 재설정</BlockText>
        </Block>
        <Block isDark={isDark} onPress={() => navigation.navigate('PrivacyPolicy')}>
          <BlockText isDark={isDark}>개인정보 처리방침</BlockText>
        </Block>
        <Block isDark={isDark} onPress={() => navigation.navigate('TermsOfService')}>
          <BlockText isDark={isDark}>서비스 이용약관</BlockText>
        </Block>
        <Block
          isDark={isDark}
          onPress={() => {
            Logout()
            navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Setting' }] }))
          }}
        >
          <BlockText isDark={isDark}>로그아웃</BlockText>
        </Block>
      </Container>
    </SafeAreaView>
  )
}

const Profile = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 35px;
  padding-left: 24px;
  margin-bottom: 22px;
  padding-right: 30px;
  justify-content: space-between;
`
const ProfileInfo = styled.View`
  flex-direction: row;
`
const ProfileImage = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ddd;
  margin-right: 8px;
`
const ProfileContents = styled.View`
  justify-content: center;
`
const ModeView = styled.View`
  padding: 15px 24px;
  flex-direction: row;
  align-items: center;
`
const BlockContent = styled.View`
  margin-left: auto;
  margin-right: 0;
`
const Container = styled.View`
  background-color: ${({ isDark }) => (isDark ? colors.d_background : colors.l_background)};
  height: 100%;
`
const Bar = styled.View`
  height: 16px;
  background-color: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
`
const Name = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const Block = styled.TouchableOpacity`
  padding: 19px 24px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ isDark }) => (isDark ? colors.d_background : colors.l_background)};
`
const BlockText = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`

const PremiumBlock = styled.View`
  //height: 128px;
  padding: 16px 24px;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`
const PremiumBack = styled.ImageBackground`
  width: 100%;
  //height: 92px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  //gap: 8px;
  padding: 16px 0px 16px 0px;
`
const ComingBox = styled.View`
  width: 105px;
  height: 32px;
  padding: 6px 12px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  border: 1px solid #8457f1;
  margin-bottom: 8px;
`
const ComingText = styled.Text`
  text-align: center;
  font-family: Pretendard-SemiBold;
  font-size: 13px;
  font-style: normal;
  color: ${colors.l_main};
`
const PremiumText = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 13px;
  font-style: normal;
  color: ${colors.white};
`
