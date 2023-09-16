import React, { useEffect, useState } from 'react'
import { Alert, SafeAreaView } from 'react-native'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import axios from 'axios'
import { ScreenWidth } from '../../Shared'
import { CommonActions, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Right from '../../assets/SVGs/Right.svg'
import { useRecoilState, useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import Toast from 'react-native-toast-message'
import Profile_man from '../../assets/SVGs/Profile_man.svg'
import Profile_woman from '../../assets/SVGs/Profile_woman.svg'
import { loggedInState } from '../../recoil/AuthAtom'

const Profile = styled.View`
  align-items: center;
  margin-top: 35px;
  margin-bottom: 32px;
`
const Block = styled.View`
  flex-direction: row;
  padding: 15px 24px;
`
const NickBlock = styled.TouchableOpacity`
  flex-direction: row;
  padding: 15px 24px;
`
const NickContent = styled.View`
  width: ${ScreenWidth - 148}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
const MiniBlock = styled.View`
  height: 48px;
  justify-content: center;
`
const Click = styled.View`
  margin-right: 24px;
  align-items: flex-end;
`
const Container = styled.View`
  background-color: ${({ isDark }) => (isDark ? colors.grey_9 : colors.white)};
  height: 100%;
`
const BlockTitle = styled.Text`
  width: 100px;
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const BlockContent = styled.Text`
  width: ${ScreenWidth - 148}px;
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
`
const ClickText = styled.Text`
  width: 80px;
  text-align: right;
  font-size: 13px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 19.5px;
  text-decoration-line: underline;
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
`
const NickText = styled.Text`
  text-align: right;
  font-size: 17px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 25.5px;
  color: ${({ isDark }) => (isDark ? colors.grey_3 : colors.grey_7)};
`
const Bar = styled.View`
  height: 16px;
  background-color: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
`

export default function UserInfo({ route, navigation }) {
  const isFocused = useIsFocused()
  const isDark = useRecoilValue(IsDarkAtom)

  useEffect(() => {
    if (route.params?.showToast) {
      Toast.show({
        type: 'customToast',
        text1: route.params.toastMessage,
        visibilityTime: 2000,
        position: 'bottom',
        props: { isDark: isDark },
      })
    }
  }, [route.params])

  const [userInfo, setUserInfo] = useState([
    {
      birthYear: '',
      userId: '',
      userNickname: '',
      gender: '',
    },
  ])

  const deleteUserInfo = async () => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/user`
      const response = await axios.delete(url + detailAPI)
      console.log('회원 탈퇴')
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

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
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState)
  const Logout = () => {
    AsyncStorage.clear()
    setLoggedIn(false)
  }

  useEffect(() => {
    isFocused &&
      getUserInfoData().then((result) => {
        setUserInfo(result.result)
      })
  }, [isFocused])

  const getUserName = userInfo[0].userNickname
  const getBirthYear = userInfo[0].birthYear.toString()
  const getUserId = userInfo[0].userId
  const getGender = userInfo[0].gender

  return (
    <SafeAreaView backgroundColor={isDark ? colors.grey_9 : colors.grey_1}>
      <Container isDark={isDark}>
        <Profile>
          {getGender == 1 ? (
            <Profile_man width={88} height={88} color={isDark ? colors.grey_7 : colors.grey_2} />
          ) : (
            <Profile_woman width={88} height={88} color={isDark ? colors.grey_7 : colors.grey_2} />
          )}
        </Profile>
        <NickBlock onPress={() => navigation.navigate('EditUserInfo')}>
          <BlockTitle isDark={isDark}>닉네임</BlockTitle>
          <NickContent>
            <NickText isDark={isDark}>{getUserName}</NickText>
            <Right style={{ marginLeft: 8 }} width={20} height={20} color={colors.grey_7} />
          </NickContent>
        </NickBlock>
        <Block>
          <BlockTitle isDark={isDark}>출생년도</BlockTitle>
          <BlockContent isDark={isDark}>{getBirthYear}</BlockContent>
        </Block>
        <Block>
          <BlockTitle isDark={isDark}>이메일 주소</BlockTitle>
          <BlockContent isDark={isDark}>{getUserId}</BlockContent>
        </Block>
        <Bar isDark={isDark} />
        <MiniBlock>
          <Click>
            <ClickText
              isDark={isDark}
              onPress={() => {
                navigation.navigate('EditPW')
              }}
            >
              비밀번호 수정
            </ClickText>
          </Click>
        </MiniBlock>
        <MiniBlock>
          <Click>
            <ClickText
              isDark={isDark}
              onPress={() => {
                Alert.alert('정말로 탈퇴하시겠습니까?', '현재 이용 중인 계정은 삭제되며\n다시 불러올 수 없습니다.', [
                  {
                    text: '취소',
                    style: 'default',
                  },
                  {
                    text: '탈퇴하기',
                    style: 'destructive',
                    onPress: () => {
                      deleteUserInfo()
                      Logout()
                      navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Setting' }] }))
                    },
                  },
                ])
              }}
            >
              회원 탈퇴하기
            </ClickText>
          </Click>
        </MiniBlock>
      </Container>
    </SafeAreaView>
  )
}
