import React, { useState, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import { colors } from '../../colors'
import { styled } from 'styled-components/native'
import { APP_STORE_SECRET } from '@env'
import { PurchaseError, requestSubscription, useIAP, validateReceiptIos, getAvailablePurchases } from 'react-native-iap'
import CloseIcon from '../../assets/SVGs/Close.svg'

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
  const [restoreLoading, setRestoreLoading] = useState(false)

  const handleGetPurchaseHistory = async () => {
    try {
      await getPurchaseHistory()
    } catch (error) {
      //errorLog({ message: 'handleGetPurchaseHistory', error })
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

  const restorePurchase = async () => {
    setRestoreLoading(true)
    // getAvailablePurchases()
    //   .then((purchases) => {
    //     console.debug('restorePurchases')
    //     // let receipt = purchases[0].transactionReceipt
    //     // if (Platform.OS === 'android' && purchases[0].purchaseToken) {
    //     //   receipt = purchases[0].purchaseToken
    //     // }
    //     // AsyncStorage.setItem('receipt', receipt)
    //     setRestoreLoading(false)
    //   })
    //   .catch((err) => {
    //     //console.debug('restorePurchases')
    //     console.error(err) })
    try {
      const purchases = await getAvailablePurchases()
      setRestoreLoading(false)
      console.log(purchases)
    } catch (err) {
      console.warn(err)
    }
  }

  return (
    <Container>
      <Label>
        <LabelText>
          Donation for
          <LabelText style={{ fontFamily: 'Pretendard-SemiBold' }}> fitnee</LabelText>
        </LabelText>
      </Label>
      <Title>피트니 후원하기</Title>
      <SubTitle>{`더 나은 헬스 문화를 만들어갈 수 있도록\n팀 피트니를 후원해주세요`}</SubTitle>
      <InfoBox>
        <InfoText style={{ color: colors.black }}>정기 후원 결제 시</InfoText>
        <InfoText style={{ color: colors.l_main }}>₩ 1,100/월</InfoText>
      </InfoBox>
      <PurchaseBtn
        isPurchaseButton={true}
        onPress={() => {
          setLoading(true)
          handleBuySubscription('fitnee.premium')
        }}
      >
        {loading && <ActivityIndicator size="small" />}
        {!loading && <PurchaseText>결제하기</PurchaseText>}
      </PurchaseBtn>
      <PurchaseBtn isPurchaseButton={false} onPress={() => restorePurchase()}>
        {restoreLoading && <ActivityIndicator size="small" />}
        {!restoreLoading && <RecoverText>구매 복원</RecoverText>}
      </PurchaseBtn>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${colors.grey_1};
  height: 100%;
`
const TopContainer = styled.View`
  width: 100%;
  height: 48px;
  padding: 12px 24px;
  display: flex;
  align-items: flex-end;
`
const CloseBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
`
const Label = styled.View`
  margin-top: 27px;
  width: 136px;
  height: 32px;
  align-self: center;
  border: 1px solid ${colors.l_main};
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const LabelText = styled.Text`
  font-size: 13px;
  color: ${colors.l_main};
  font-family: Pretendard-Regular;
`
const Title = styled.Text`
  font-family: Pretendard-SemiBold;
  font-size: 20px;
  color: ${colors.black};
  align-self: center;
  margin-top: 16px;
  line-height: 32px;
`
const SubTitle = styled.Text`
  font-size: 17px;
  font-family: Pretendard-Regular;
  color: ${colors.grey_7};
  align-self: center;
  text-align: center;
  margin-top: 8px;
  line-height: 25.5px;
`
const InfoBox = styled.View`
  margin: 147px 0px 168px 0px;
  background-color: ${colors.white};
  border-radius: 12px;
  align-self: center;
  border: 1px solid ${colors.grey_2};
  width: 327px;
  height: 89px;
  padding: 16px 24px;
  gap: 8px;
  justify-content: center;
`
const InfoText = styled.Text`
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  line-height: 25.5px;
`
const PurchaseBtn = styled.TouchableOpacity`
  width: 343px;
  height: 52px;
  background-color: ${(props) => (props.isPurchaseButton ? colors.l_main : colors.grey_1)};
  border-radius: 12px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
`
const PurchaseText = styled.Text`
  color: ${colors.white};
  font-size: 17px;
  font-family: Pretendard-SemiBold;
`
const Recover = styled.View`
  width: 343px;
  height: 52px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey_1};
`
const RecoverText = styled.Text`
  color: ${colors.grey_7};
  font-size: 17px;
  font-family: Pretendard-SemiBold;
  line-height: 52px;
  align-self: center;
`
