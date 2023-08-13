import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { colors } from "../colors";

const AutoSearchContainer = styled.ScrollView`
  width: 100%;
  height: 100%;
`;
const AutoSearch = styled.TouchableOpacity`
  padding: 24px 16px;

  border-top-width: 1px;
  border-top-color: ${colors.grey_1};
`;
const AutoSearchText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: ${colors.black};
`;
const ColoredSearchText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: ${colors.l_main};
`;

export default function Dictionary_AutoSearch(props) {
  const { navigation, parentSearch, parentSearchList } = props;
  const [searchList, setSearchList] = useState(parentSearchList);
  useEffect(() => {
    setSearchList(parentSearchList);
  }, [parentSearchList]);

  const splitString = (str) => {
    const regex = new RegExp(`(${parentSearch})`, "g");
    const splitStr = str.split(regex);
    const extracted = splitStr.filter((item) => item !== "");
    return extracted;
  };
  const onPress = (exercise) =>
    navigation.navigate("Dictionary_3", { exercise });

  return (
    <AutoSearchContainer>
      {searchList !== undefined &&
        searchList.map((words) => {
          let splitedString = splitString(words.name);
          return (
            <AutoSearch onPress={() => onPress(words)}>
              <AutoSearchText>
                {splitedString.map((word) =>
                  word == parentSearch ? (
                    <ColoredSearchText>{word}</ColoredSearchText>
                  ) : (
                    <AutoSearchText>{word}</AutoSearchText>
                  )
                )}
              </AutoSearchText>
            </AutoSearch>
          );
        })}
    </AutoSearchContainer>
  );
}
