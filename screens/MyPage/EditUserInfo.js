import React, { useEffect, useState } from 'react'
import { Keyboard, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import { styled } from 'styled-components/native'
import { colors } from '../../colors'
import axios from 'axios'
import { TouchableOpacity } from 'react-native'
import Left from '../../assets/SVGs/Left.svg'
import { Alert } from 'react-native'
import { useRecoilValue } from 'recoil'
import { IsDarkAtom } from '../../recoil/MyPageAtom'
import Profile_man from '../../assets/SVGs/Profile_man.svg'
import Profile_woman from '../../assets/SVGs/Profile_woman.svg'

const Container = styled.View`
  background-color: ${({ isDark }) => (isDark ? colors.grey_9 : colors.white)};
  height: 100%;
  padding: 0px 24px;
  align-items: center;
`
const Profile = styled.View`
  align-items: center;
  margin-top: 35px;
  margin-bottom: 32px;
`
const InputRed = styled.View`
  width: 240px;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 3px;
  border: 1px;
`
const InputBlock = styled.TextInput`
  width: 238px;
  background-color: ${({ isDark }) => (isDark ? colors.black : colors.grey_1)};
  color: ${({ isDark }) => (isDark ? colors.white : colors.black)};
  padding: 0px 16px;
  height: 46px;
  border-radius: 8px;
  font-size: 16px;
  font-style: normal;
  font-family: Pretendard-Regular;
`
const StatusText = styled.Text`
  margin-left: 40px;
  font-size: 11px;
  font-style: normal;
  font-family: Pretendard-Regular;
  line-height: 16.5px;
  width: 100%;
  margin-bottom: 20px;
  margin-right: 8px;
  font-weight: 300;
  color: ${({ isDark, check, error }) =>
    check ? (error ? colors.red : colors.green) : isDark ? colors.grey_8 : colors.grey_2};
`
const CheckButton = styled.TouchableOpacity`
  width: 79px;
  height: 48px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ isDark }) => (isDark ? colors.d_main : colors.l_main)};
  margin-left: 8px;
`
const CheckButtonText = styled.Text`
  font-size: 15px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 22.5px;
  color: ${({ isDark }) => (isDark ? colors.d_main : colors.l_main)};
`
const InputContainer = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: center;
`

export default function EditUserInfo({ navigation }) {
  const isDark = useRecoilValue(IsDarkAtom)

  const [check, setCheck] = useState(false)
  const [error, setError] = useState(true)
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
    getUserInfoData().then((result) => {
      setUserInfo(result.result)
    })
  }, [])

  const getUserName = userInfo[0].userNickname
  const getGender = userInfo[0].gender

  const [newNickname, setNewNickname] = useState(getUserName)
  const [checkNick, setCheckNick] = useState('')

  const checkOnlyOneNickName = async (newNickname) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/mypage/nickname?userNickName=${newNickname}`
      const response = await axios.get(url + detailAPI, {
        userNickName: newNickname,
      })
      const checkResult = response.data
      return checkResult
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }
  const updateUserInfo = async (newNickname) => {
    try {
      let url = 'https://gpthealth.shop/'
      let detailAPI = `app/mypage/updateuser`
      const response = await axios.put(url + detailAPI, {
        userNickname: newNickname,
      })
      const updateResult = response.data
      return updateResult
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }

  const change = () => {
    checkOnlyOneNickName(newNickname).then((checkResult) => {
      if (newNickname == '') {
        alert('변경할 닉네임을 입력해주세요')
      } else {
        setCheck(true)
        setCheckNick(newNickname)
        checkResult.result || newNickname.length < 2 ? setError(true) : setError(false) & Keyboard.dismiss()
        checkResult.result || newNickname.length < 2 ? setEnabled(false) : setEnabled(true)
      }
    })
  }

  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('변경 사항을 폐기하시겠습니까?', '', [
              {
                text: '계속 편집하기',
                style: 'cancel',
              },
              {
                text: '변경사항 폐기',
                style: 'destructive',
                onPress: () => navigation.goBack(),
              },
            ])
          }}
        >
          <Left style={{ marginLeft: 24 }} width={24} height={24} color={isDark ? colors.white : colors.black} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          disabled={!enabled}
          onPress={() => {
            !error && updateUserInfo(newNickname)
            navigation.navigate('UserInfo', {
              showToast: true,
              toastMessage: '닉네임이 변경되었습니다.',
            })
          }}
          style={{ marginRight: 24 }}
        >
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'Pretendard-SemiBold',
              color: enabled ? (isDark ? colors.d_main : colors.l_main) : isDark ? colors.grey_7 : colors.grey_2,
            }}
          >
            저장
          </Text>
        </TouchableOpacity>
      ),
    })
  }, [error, newNickname, enabled])

  return (
    <SafeAreaView backgroundColor={isDark ? colors.grey_9 : colors.grey_1}>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss()
        }}
      >
        <Container isDark={isDark}>
          <Profile>
            {getGender == 1 ? (
              <Profile_man width={88} height={88} color={isDark ? colors.grey_7 : colors.grey_2} />
            ) : (
              <Profile_woman width={88} height={88} color={isDark ? colors.grey_7 : colors.grey_2} />
            )}
          </Profile>
          <InputContainer>
            <InputRed
              isDark={isDark}
              error={error}
              check={check}
              style={{
                borderColor: check ? (error ? colors.red : colors.green) : isDark ? colors.black : colors.grey_2,
              }}
            >
              <InputBlock
                editable
                autoFocus
                onChangeText={(text) => setNewNickname(text)}
                placeholder={getUserName}
                placeholderTextColor={isDark ? colors.grey_8 : colors.grey_6}
                isDark={isDark}
              />
            </InputRed>
            <CheckButton enabled onPress={change} isDark={isDark}>
              <CheckButtonText isDark={isDark}>중복 확인</CheckButtonText>
            </CheckButton>
          </InputContainer>
          <StatusText error={error} check={check} isDark={isDark}>
            {check
              ? error
                ? checkNick.length < 2
                  ? '닉네임은 2글자 이상이어야 합니다.'
                  : '이미 존재하는 닉네임입니다.'
                : '사용 가능한 닉네임입니다.'
              : ''}
          </StatusText>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
