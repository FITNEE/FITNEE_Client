import React, { useState } from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { styled } from "styled-components/native";
import EditInfo from "../components/EditInfo";

export default function EditUserInfo({ navigation }) {
    const [name, onChangeName] = useState('초코맛 프로틴');
    const [age, onChangeAge] = useState('1998');

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
    const InputBlock = styled.TextInput`
        background-color: #f3f3f3;
        padding: 15px 24px;
        width: 327px;
        height: 48px;
        border-radius: 8px;
        margin: 0px 24px 10px 24px;
    `;
    const Block = styled.View`
        background-color: #f3f3f3;
        padding: 15px 24px;
        width: 327px;
        height: 48px;
        border-radius: 8px;
        margin: 0px 24px;
    `;

    return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()}}>
        <Container>
            <Header>
                <SettingBtn onPress={() => navigation.navigate("UserInfo")}><Text style={{
                    textAlign: "right"
                }}>완료</Text></SettingBtn>
            </Header>
            <Profile><ProfileImage></ProfileImage></Profile>
            <EditInfo/>
            <Block><Text style={{
                fontSize: 16,
                fontWeight: 400,
                lineHeight: 24,
                color: '#bfbfbf'
            }}>{'protein012@gmail.com'}</Text></Block>
        </Container>
    </TouchableWithoutFeedback>
    );
}