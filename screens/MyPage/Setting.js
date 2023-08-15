import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { styled } from "styled-components/native";
import Mode from "../../components/myPage/Mode";
import { colors } from "../../colors";
import { AppContext } from "../../components/ContextProvider";
import axios from "axios";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { IsDarkAtom, TabBarAtom } from "../../recoil/MyPageAtom";
import { WithLocalSvg } from "react-native-svg";
import Right from "../../assets/SVGs/Right.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Profile = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: 35px;
  padding-left: 24px;
  margin-bottom: 22px;
  padding-right: 30px;
  justify-content: space-between;
`;
const ProfileInfo = styled.View`
  flex-direction: row;
`;
const ProfileImage = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #ddd;
  margin-right: 8px;
`;
const ProfileContents = styled.View`
  justify-content: center;
`;
const Name = styled.Text`
  font-size: 17px;
  font-style: normal;
  font-weight: 600;
  line-height: 25.5px;
`;
const Bar = styled.View`
  height: 16px;
  background-color: #f3f3f3;
`;
const ModeView = styled.View`
  padding: 15px 24px;
  flex-direction: row;
  align-items: center;
`;
const BlockContent = styled.View`
  margin-left: auto;
  margin-right: 0;
`;

export default function Setting({ navigation }) {
  const isFocused = useIsFocused();
  const isDark = useRecoilValue(IsDarkAtom);
  const [isTabVisible, setIsTabVisible] = useRecoilState(TabBarAtom);

  useEffect(() => {
    isFocused && setIsTabVisible(false);
  }, [isFocused, isTabVisible]);

  const { toggleLogin } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState([
    {
      birthYear: "",
      userId: "",
      userNickname: "",
      gender: "",
    },
  ]);

  const getUserInfoData = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/mypage/userinfo`;
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    isFocused &&
      getUserInfoData().then((result) => {
        setUserInfo(result.result);
      });
  }, [isFocused]);

  const getUserName = userInfo[0].userNickname;
  const getGender = userInfo[0].gender;

  const Container = styled.View`
    background-color: ${isDark ? colors.d_background : colors.l_background};
    height: 100%;
  `;
  const Bar = styled.View`
    height: 16px;
    background-color: ${isDark ? colors.black : colors.grey_1};
  `;
  const Name = styled.Text`
    font-size: 17px;
    font-style: normal;
    font-weight: 600;
    line-height: 25.5px;
    color: ${isDark ? colors.white : colors.black};
  `;
  const Block = styled.TouchableOpacity`
    padding: 19px 24px;
    flex-direction: row;
    align-items: center;
    background-color: ${isDark ? colors.d_background : colors.l_background};
  `;
  const BlockText = styled.Text`
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 25.5px;
    color: ${isDark ? colors.white : colors.black};
  `;
  /*
  const logout = async () => {
    try {
      AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
*/

  return (
    <SafeAreaView>
      <Container>
        <Profile
          onPress={() => {
            navigation.navigate("UserInfo");
          }}
        >
          <ProfileInfo>
            <ProfileImage
              style={{ backgroundColor: getGender == 1 ? "blue" : "pink" }}
            />
            <ProfileContents>
              <Name>{getUserName}</Name>
            </ProfileContents>
          </ProfileInfo>
          <WithLocalSvg
            width={20}
            height={20}
            asset={Right}
            color={colors.grey_7}
          />
        </Profile>
        <ModeView>
          <BlockText>다크화면 모드</BlockText>
          <BlockContent>
            <Mode />
          </BlockContent>
        </ModeView>
        <Bar />
        <Block
          onPress={() => {
            Alert.alert(
              "루틴을 다시 생성할까요?",
              "현재 이용 중인 루틴은 삭제되며\n다시 불러올 수 없습니다.",
              [
                {
                  text: "취소",
                  style: "cancel",
                },
                {
                  text: "다시 생성하기",
                  style: "default",
                  onPress: () => navigation.navigate("createRoutine"),
                },
              ]
            );
          }}
        >
          <BlockText>루틴 재설정</BlockText>
        </Block>
        <Block>
          <BlockText>일반 설정</BlockText>
        </Block>
        <Block>
          <BlockText>알림 설정</BlockText>
        </Block>
        <Block>
          <BlockText>자주 물어보는 질문</BlockText>
        </Block>
        <Block>
          <BlockText>개인정보 처리방침</BlockText>
        </Block>
        <Block>
          <BlockText>서비스 이용약관</BlockText>
        </Block>
        <Block>
          <BlockText>버전 정보</BlockText>
        </Block>
        <Block onPress={() => toggleLogin()}>
          <BlockText>로그아웃</BlockText>
        </Block>
      </Container>
    </SafeAreaView>
  );
}
