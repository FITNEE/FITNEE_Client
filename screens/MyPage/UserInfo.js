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
import { APP_STORE_SECRET } from '@env'
import { PurchaseError, requestSubscription, useIAP, validateReceiptIos } from 'react-native-iap'

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
  color: ${({ isDark }) => (isDark ? colors.white : colors.grey_7)};
`
const ClickText2 = styled.Text`
  width: 90px;
  text-align: right;
  font-size: 13px;
  font-style: normal;
  font-family: Pretendard-SemiBold;
  line-height: 19.5px;
  text-decoration-line: underline;
  color: ${({ isDark }) => (isDark ? colors.white : colors.d_main)};
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

const errorLog = ({ message, error }) => {
  console.error('An error happened', message, error)
}

const isIos = Platform.OS === 'ios'

//product id from appstoreconnect app->subscriptions
const subscriptionSkus = Platform.select({
  ios: ['fitnee.premium'],
})

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

  //useIAP - easy way to access react-native-iap methods to
  //get your products, purchases, subscriptions, callback
  //and error handlers.
  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP()

  const [loading, setLoading] = useState(false)

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory()
    } catch (error) {
      errorLog({ message: 'handleGetPurchaseHistory', error })
      // warning could occur with simulator. it should be with real device.
    }
  }

  useEffect(() => {
    // app store connect 연결 성공시 유저의 구매 히스토리 알아오기
    handleGetPurchaseHistory()
  }, [connected])

  const handleGetSubscriptions = async () => {
    try {
      await getSubscriptions({ skus: subscriptionSkus })
    } catch (error) {
      errorLog({ message: 'handleGetSubscriptions', error })
    }
  }

  useEffect(() => {
    handleGetSubscriptions()
  }, [connected])

  useEffect(() => {
    // ... listen if connected, purchaseHistory and subscriptions exist
    if (
      // 유저가 해당 구독을 이미 진행 중인지 확인
      purchaseHistory.find((x) => x.productId === (subscriptionSkus[0] || subscriptionSkus[1]))
    ) {
      // 이미 구독 되어 있다면 여기 코드 실행
      // navigation.navigate("Home");
    }
  }, [connected, purchaseHistory, subscriptions])

  const handleBuySubscription = async (productId) => {
    try {
      await requestSubscription({
        sku: productId,
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      if (error instanceof PurchaseError) {
        errorLog({ message: `[${error.code}]: ${error.message}`, error })
      } else {
        errorLog({ message: 'handleBuySubscription', error })
      }
    }
  }

  useEffect(() => {
    const checkCurrentPurchase = async (purchase) => {
      if (purchase) {
        try {
          const receipt = purchase.transactionReceipt
          if (receipt) {
            if (Platform.OS === 'ios') {
              const isTestEnvironment = __DEV__

              //send receipt body to apple server to validete
              const appleReceiptResponse = await validateReceiptIos(
                {
                  'receipt-data': receipt,
                  password: APP_STORE_SECRET,
                },
                isTestEnvironment,
              )

              //if receipt is valid
              if (appleReceiptResponse) {
                const { status } = appleReceiptResponse
                if (status) {
                  navigation.navigate('Home')
                }
              }

              return
            }
          }
        } catch (error) {
          console.log('error', error)
        }
      }
    }
    checkCurrentPurchase(currentPurchase)
  }, [currentPurchase, finishTransaction])
  return (
    <SafeAreaView backgroundColor={isDark ? colors.grey_9 : colors.white}>
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
                Alert.alert(
                  '회원 탈퇴하시겠습니까?',
                  '서비스를 탈퇴하시면 피트니 계정을 비롯하여 모든 이용기록이 삭제되며, 삭제된 정보는 복원할 수 없습니다.',
                  [
                    {
                      text: '탈퇴하기',
                      style: 'destructive',
                      onPress: () => {
                        deleteUserInfo()
                        Logout()
                        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Setting' }] }))
                      },
                    },
                    {
                      text: '취소',
                      style: 'default',
                    },
                  ],
                )
              }}
            >
              회원 탈퇴하기
            </ClickText>
          </Click>
        </MiniBlock>
        <MiniBlock>
          <Click>
            <ClickText2 onPress={() => handleBuySubscription('fitnee.premium')}>피트니 응원하기</ClickText2>
          </Click>
        </MiniBlock>
      </Container>
    </SafeAreaView>
  )
}
