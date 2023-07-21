import { useState } from "react";
import styled from "styled-components/native";

export default function RoutineItem() {
  const [select, SetSelect] = useState(true);
  return (
    <Container>
      <Item>
        <ItemTitle>Day 1</ItemTitle>
        <ItemSubTitle>등, 어깨, 가슴</ItemSubTitle>
      </Item>
      {select ? (
        <PartContainer>
          <PartItem>
            <PartName>데드리프트</PartName>
            <PartSet>3세트</PartSet>
          </PartItem>
          <PartItem>
            <PartName>데드리프트</PartName>
            <PartSet>3세트</PartSet>
          </PartItem>
          <PartItem>
            <PartName>데드리프트</PartName>
            <PartSet>3세트</PartSet>
          </PartItem>
          <PartItem>
            <PartName>데드리프트</PartName>
            <PartSet>3세트</PartSet>
          </PartItem>
          <PartItem>
            <PartName>데드리프트</PartName>
            <PartSet>3세트</PartSet>
          </PartItem>
          <PartItem>
            <PartName>데드리프트</PartName>
            <PartSet>3세트</PartSet>
          </PartItem>
        </PartContainer>
      ) : null}
    </Container>
  );
}
const Container = styled.View``;
const Item = styled.TouchableOpacity`
  flex-direction: row;
  width: 303px;
  height: 58px;
  background-color: #f3f3f3;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
`;
const ItemTitle = styled.Text`
  font-size: 20px;
  margin-left: 15px;
`;
const ItemSubTitle = styled.Text`
  margin-right: 15px;
  color: #757575;
`;
const PartContainer = styled.View`
  margin: 20px;
`;
const PartItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 5px;
`;
const PartName = styled.Text`
  color: #757575;
`;
const PartSet = styled.Text`
  color: #757575;
`;
