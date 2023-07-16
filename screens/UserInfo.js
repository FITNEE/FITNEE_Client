import React, { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
import { styled } from "styled-components/native";


    const Container = styled.View`
        background-color: #fff;
        height: 100%;
    `;
    const SettingBtn = styled.TouchableOpacity`
    `;
    const Header = styled.View`
        display: flex;
        width: 375px;
        height: 56px;
        padding: 16px 24px 16px 327px;
        justify-content: flex-end;
        align-items: center;
    
    `;
    const Profile = styled.View`
        align-items: center;
        margin-top: 12px;
        margin-bottom: 32px;
    `;
    const ProfileImage = styled.TouchableOpacity`
        width: 88px;
        height: 88px;
        background-color: #dddddd;
        border-radius: 88px;
    `;
    const Block = styled.View`
        flex-direction: row;
        padding: 15px 24px;
    `;
    const BlockTitle = styled.Text`
        width: 100px;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: 25.5px;
    `;
    const BlockContent = styled.Text`
        width: 224px;
        text-align: right;
        font-size: 17px;
        font-style: normal;
        font-weight: 400;
        line-height: 25.5px;
        color: #676767;
    `;
    const Bar = styled.View`
        height: 16px;
        background-color: #f3f3f3;
    `;
    const MiniBlock = styled.View`
        height: 48px;
        justify-content: center;
    `;
    const Click = styled.TouchableOpacity`
        margin-right: 24px;
    `;
    const ClickText = styled.Text`
        text-align: right;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 19.5px;
        text-decoration-line: underline;
    `;

export default function UserInfo({ navigation }) {
    
    const username = useState('초코맛 프로틴');
    const age = useState('1998');
    const email = useState('protein012@gmail.com');

    return (
    <SafeAreaView>
    <Container>
        <Header>
            <SettingBtn onPress={() => navigation.navigate("EditUserInfo")}><Text style={{
                textAlign: "right"
            }}>수정</Text></SettingBtn>
        </Header>
        <Profile><ProfileImage></ProfileImage></Profile>
        <Block>
            <BlockTitle>닉네임</BlockTitle>
            <BlockContent>{username}</BlockContent>
        </Block>
        <Block>
            <BlockTitle>출생년도</BlockTitle>
            <BlockContent>{age}</BlockContent>
        </Block>
        <Block>
            <BlockTitle>이메일 주소</BlockTitle>
            <BlockContent>{email}</BlockContent>
        </Block>
        <Bar/>
        <MiniBlock>
            <Click><ClickText>비밀번호 수정</ClickText></Click>
        </MiniBlock>
        <MiniBlock>
            <Click><ClickText>회원 탈퇴하기</ClickText></Click>
        </MiniBlock>
    </Container>
    </SafeAreaView>
  );
}