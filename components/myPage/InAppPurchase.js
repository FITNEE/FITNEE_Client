import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../colors'
import { styled } from 'styled-components/native'
import { APP_STORE_SECRET } from '@env'
import { PurchaseError, requestSubscription, useIAP, validateReceiptIos } from 'react-native-iap'

const errorLog = ({ message, error }) => {
  console.error('An error happened', message, error)
}

const isIos = Platform.OS === 'ios'

//product id from appstoreconnect app->subscriptions
const subscriptionSkus = Platform.select({
  ios: ['fitnee.premium'],
})

export default function InAppPurchase({ isOpen, setIsOpen }) {
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
                //   navigation.navigate('Home')
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

  useEffect(()=>{
    console.log(loading)
  }, [loading])

  return (
    <Container>
      <TopContainer>
        <CloseBtn onPress={() => setIsOpen(false)} />
      </TopContainer>

      <PurchaseBtn
        onPress={() => {
          setLoading(true)
          handleBuySubscription('fitnee.premium')
        }}
      >
        {loading && <ActivityIndicator size="small"/>}
        {!loading && <PurchaseText>결제하기</PurchaseText>}
      </PurchaseBtn>
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background-color: pink;
`
const TopContainer = styled.View`
  width: 100%;
  height: 48px;
  padding: 12px 24px;
  display: flex;
  align-items: flex-end;
`
const CloseBtn = styled.TouchableOpacity`
  background-color: red;
  width: 24px;
  height: 24px;
`
const PurchaseBtn = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  background-color: ${colors.l_main};
  border-radius: 12px;
  justify-content: center;
  align-items: center;
`
const PurchaseText = styled.Text`
  line-height: 52px;
  color: ${colors.white};
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  text-align: center;
`
