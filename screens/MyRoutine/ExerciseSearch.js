import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import { colors } from "../../colors";
import { AppContext } from "../../components/ContextProvider";
import axios from "axios";
import SearchList from "../../components/myRoutine/SearchList";
import Search from "../../assets/SVGs/Search.svg";
import { WithLocalSvg } from "react-native-svg";
import { Button } from "../../Shared";

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
`;

const TopContainer = styled.View`
  padding: 8px 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.grey_1};
`;
const SearchContainer = styled.View`
  flex-direction: row;
  margin: 0px 24px;
  justify-content: center;
  align-items: center;
`;
const SearchInputContainer = styled.View`
  background-color: ${colors.grey_1};
  border-radius: 12px;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;
`;
const Logo = styled.Image`
  width: 24px;
  height: 24px;
  background-color: ${colors.red};

  margin-right: 12px;
`;
const SearchInput = styled.TextInput`
  font-size: 16px;
  font-weight: 400;
  color: ${colors.black};
  flex: 1;
  margin: 0px 24px;
`;
const DeleteAllBtn = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  background-color: ${colors.red};
  margin-left: 16px;
`;
const KeywordsContainer = styled.View`
  padding: 22px;
`;
const BottomContainer = styled.View`
  justify-content: space-between;
  border: 1px ${colors.grey_3} solid;
  padding: 0px 24px;
`;
const RecentContainer = styled.View`
  height: 50px;
  width: 100%;
  margin-bottom: 56px;
`;
const RecentTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.black};
  margin-bottom: 16px;
`;
const RecentKeywordContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const HotContainer = styled.View`
  height: 123px;
  width: 100%;
`;
const HotTitle = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${colors.black};
  margin-bottom: 16px;
`;
const PopularKeywordsContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;
const KeywordContainer = styled.TouchableOpacity`
  background-color: ${colors.grey_1};
  border-radius: 100px;
  margin-right: 4px;
  margin-bottom: 4px;
  padding: 10px 14px;
`;
const Keyword = styled.Text`
  font-weight: 600;
  font-size: 13px;
  color: ${colors.grey_7};
`;

const SelectedListContainer = styled.ScrollView`
  height: 48px;
  width: 100%;
  margin-bottom: 8px;
`;
const ItemContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;
const DeleteButton = styled.TouchableOpacity`
  width: 24px;
  height: 24px;
  background-color: ${colors.red};
`;
const SelectedItemText = styled.Text`
  font-weight: 500;
  font-size: 13px;
  margin-left: 4px;
  color: ${colors.grey_7};
`;
export default function ExerciseSearch({ navigation }) {
  const { isDark } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [part, setPart] = useState([
    ["유산소", false],
    ["어깨", false],
    ["상체", false],
    ["가슴", false],
    ["등", false],
    ["복근", false],
    ["하체", false],
    ["엉덩이", false],
  ]);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  // 사용자가 검색창에 onFocus 했을 때
  const onFocusInput = () => {
    search.length == 0 ? null : setIsSearching(true);
  };

  // 검색List창에서 부위 버튼 toggle
  const onPressPart = (i) => {
    let temp = [...part];
    temp[i][1] = !temp[i][1];
    setPart(temp);
  };
  const editSelectedList = (mode, id, arr) => {
    let newArr = JSON.parse(JSON.stringify(selectedItem));
    if (mode == "add") {
      newArr.push(arr);
    } else {
      newArr.splice(id, 1);
    }
    setSelectedItem(newArr);
    console.log(newArr);
  };
  // 검색창 옆 X 버튼 눌렀을 때
  const onDeleteInput = () => {
    setSearch("");
    setIsSearching(false); // 키워드들 보이게
  };

  // 검색어(search)가 비어있으면 IsSearching = true / 아니면 false
  useEffect(() => {
    search.length === 0 ? setIsSearching(false) : setIsSearching(true);
  }, [search]);

  // 최근 검색 키워드, 인기 키워드 받아오는 API
  const getKeywords = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "/app/dictionary";
      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result.result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  // getKeywords로 키워드들 받아와서 recetKeywords, popularKeywords에 저장
  useEffect(() => {
    getKeywords().then((result) => {
      let temp = result.recentKeywords;
      let temp2 = temp.map((keyword) => keyword.text);
      setRecentKeywords(temp2);
      temp = result.popularKeywords;
      temp2 = temp.map((keyword) => keyword.text);
      setPopularKeywords(temp2);
    });
  }, [isSearching, search]);

  // 검색어에 따라 일치하는 운동리스트 불러오는 API
  const postSearch = async (text) => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = "/app/dictionary/searchexercise";
      const response = await axios.post(url + detailAPI, null, {
        params: {
          search: text,
        },
      });
      const result = response.data;
      return result.result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };
  // 검색어 변경될 때마다 search값 update
  const onChangeText = (event) => {
    const { eventCount, target, text } = event.nativeEvent;
    setSearch(text);
    postSearch(text).then((result) => setSearchList(result));
  };
  // 최근검색어, 인기검색어 클릭시 검색List 화면으로 전환
  const onPressKeyword = (keyword) => {
    setSearch(keyword);
    postSearch(keyword).then((result) => setSearchList(result));
  };
  // 사용자가 키보드에서 검색 버튼 눌렀을 때
  const onSubmitEditing = () => {
    setIsSubmit(true);
    setIsSearching(false);
  };
  // 검색될때마다 키워드 기록
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <Container>
          <TopContainer>
            <SearchContainer>
              <SearchInputContainer>
                <WithLocalSvg width={24} height={24} asset={Search} />
                <SearchInput
                  autoFocus={true}
                  placeholder="운동명, 부위 검색"
                  placeholderTextColor={colors.grey_4}
                  returnKeyType="search"
                  onChange={onChangeText}
                  value={search}
                  onSubmitEditing={onSubmitEditing}
                  onFocus={onFocusInput}
                />
              </SearchInputContainer>
              <DeleteAllBtn onPress={onDeleteInput} />
            </SearchContainer>
          </TopContainer>
          {!isSearching && (
            <KeywordsContainer>
              <RecentContainer style={{ marginBottom: 56 }}>
                <RecentTitle>최근 검색 키워드</RecentTitle>
                <RecentKeywordContainer>
                  {recentKeywords.map((keyword) => (
                    <KeywordContainer onPress={() => onPressKeyword(keyword)}>
                      <Keyword>{keyword}</Keyword>
                    </KeywordContainer>
                  ))}
                </RecentKeywordContainer>
              </RecentContainer>
              <HotContainer>
                <HotTitle>인기 키워드</HotTitle>
                <PopularKeywordsContainer>
                  {popularKeywords.map((keyword) => (
                    <KeywordContainer onPress={() => onPressKeyword(keyword)}>
                      <Keyword>{keyword}</Keyword>
                    </KeywordContainer>
                  ))}
                </PopularKeywordsContainer>
              </HotContainer>
            </KeywordsContainer>
          )}
          {isSearching && (
            <SearchList
              parentSearchList={searchList}
              editSelectedList={editSelectedList}
            />
          )}
        </Container>
      </TouchableWithoutFeedback>
      <BottomContainer>
        <SelectedListContainer
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {selectedItem?.map((item, id) => (
            <ItemContainer key={id}>
              <DeleteButton
                onPress={() => editSelectedList("delete", id, "none")}
              />
              <SelectedItemText>{item.exerciseName}</SelectedItemText>
            </ItemContainer>
          ))}
        </SelectedListContainer>
        <Button
          onPress={() => navigation.navigate("MyRoutine", { selectedItem })}
          text="다음"
          enabled={true}
        />
      </BottomContainer>
    </SafeAreaView>
  );
}
