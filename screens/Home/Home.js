import React, { useContext, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AppContext } from '../../components/ContextProvider';
import { Button } from '../../Shared';
import { styled } from 'styled-components/native';
import { colors } from '../../colors';
import HomeRoutines from '../../components/HomeRoutines';
import NotHomeRoutine from '../../components/NotHomeRoutine';

const Top = styled.View`
  width: 100%;
  padding: 10px 24px;
  flex-direction: row;
  justify-content: space-between;
`;
const Logo = styled.Image`
  width: 88px;
  height: 28px;
  background-color: ${colors.grey_2};
`;
const Premium = styled.View`
  padding: 6px 12px 6px 6px;
  gap: 4px;
  border-radius: 100px;
  flex-direction: row;
  background-color: ${colors.grey_3};
  align-items: center;
`;
const Circle = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${colors.green};
  border-radius: 20px;
`;
const PremiumText = styled.Text`
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: 19.5px;
`;

const Home = () => {
  //const { toggleLogin } = useContext(AppContext);
  const [showRoutine, SetShowRoutine] = useState(true);

  return (
    <SafeAreaView
      style={{
        width: '100%',
        flex: 1
      }}
    >
      {/*<Text>Home</Text>
      <Button enabled={true} text='logOut' onPress={() => toggleLogin()} />*/}
        <Top>
          <Logo/>
          <Premium><Circle/><PremiumText>PREMIUM</PremiumText></Premium>
        </Top>
        {showRoutine && <HomeRoutines/>}
        {!showRoutine && <NotHomeRoutine/>}
    </SafeAreaView>
  );
};

export default Home;
