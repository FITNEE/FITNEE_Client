import React, { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import RoutineItem from "./RoutineItem";
import { ScreenHeight } from "../Shared";

const PageIndicator = ({ totalPages, currentPage }) => {
  return (
    <PageIndicatorContainer>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageDot key={index} active={index === currentPage} />
      ))}
    </PageIndicatorContainer>
  );
};

export default Scroll = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = React.createRef();

  const [selectedID, setSelectedID] = useState("");
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent;
    const pageIndex = Math.floor(contentOffset.x / layoutMeasurement.width);
    setCurrentPage(pageIndex);
  };
  const renderItem = ({ item: routines }) => {
    return (
      <RoutineContainer>
        <RoutineBox key={routines.id}>
          <RoutineTitleContainer>
            <RoutineTitle>{routines.title}</RoutineTitle>
          </RoutineTitleContainer>
          <ItemConteiner>
            {routines.item.map((routine, id) => (
              <RoutineItem
                key={id}
                select={selectedID == id}
                onPress={setSelectedID(id)}
                day={routine.day}
                parts={routine.parts}
                exercises={routine.exercises}
              />
            ))}
          </ItemConteiner>
        </RoutineBox>
      </RoutineContainer>
    );
  };
  // onPress={() => {
  //   selectedID == id ? setSelectedID(null) : setSelectedID(id);
  // }}
  return (
    <Container>
      <FlatList
        ref={flatListRef}
        horizontal={true}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScroll={handleScroll}
        // 스크롤이 멈출 때마다 현재 페이지를 계산합니다.
        onMomentumScrollEnd={(event) => {
          const offsetX = event.nativeEvent.contentOffset.x;
          const width = event.nativeEvent.layoutMeasurement.width;
          const pageIndex = Math.round(offsetX / width);
          setCurrentPage(pageIndex);
        }}
      />
      <PageIndicator totalPages={data.length} currentPage={currentPage} />
    </Container>
  );
};
const Container = styled.View`
  flex: 1;
`;
const RoutineContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  margin-right: 30px;
`;
const RoutineBox = styled.View`
  width: 100%;
`;
const RoutineTitleContainer = styled.View`
  position: absolute;
  width: 157px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: #dddddd;
  border-radius: 100px;
  top: -15px;
  left: 85px;
  z-index: 1;
`;
const RoutineTitle = styled.Text``;
const ItemConteiner = styled.View`
  width: 327px;
  border: 1px;
  border-color: #dddddd;
  border-radius: 20px;
  background-color: white;
  padding: 20px;

  align-items: center;
`;
const PageIndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;
const PageDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin: 5px;
  background-color: ${(props) => (props.active ? "#757575" : "#DDDDDD")};
`;
