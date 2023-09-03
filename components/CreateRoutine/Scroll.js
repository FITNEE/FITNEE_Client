import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components/native'
import RoutineItem from './RoutineItem'
import { ScreenHeight, ScreenWidth } from '../../Shared'
import { colors } from '../../colors'

const PageIndicator = ({ isDark, totalPages, currentPage }) => {
  return (
    <PageIndicatorContainer isDark={isDark}>
      {Array.from({ length: totalPages }, (_, index) => (
        <PageDot isDark={isDark} key={index} active={index === currentPage} />
      ))}
    </PageIndicatorContainer>
  )
}

export default Scroll = ({ isDark, data, currentRoutine }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const flatListRef = React.createRef()
  const [selectedID, setSelectedID] = useState('')
  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement } = event.nativeEvent
    const pageIndex = Math.round(contentOffset.x / layoutMeasurement.width)
    // console.log("event.nativeEvent : ", event.nativeEvent);
    setCurrentPage(pageIndex)
  }
  useEffect(() => {
    console.log(currentPage)
    currentRoutine(currentPage)
    setSelectedID('')
  }, [currentPage])

  const renderItem2 = ({ item, index }) => {
    return (
      <RoutineItem
        isDark={isDark}
        select={selectedID == index}
        onPress={() => {
          setSelectedID(index)
        }}
        day={item.day}
        parts={item.parts}
        exercises={item.exercises}
      />
    )
  }
  const renderItem = ({ item: routines }) => {
    return (
      <RoutineContainer isDark={isDark}>
        <RoutineBox isDark={isDark} key={routines.id}>
          <RoutineTitleContainer isDark={isDark}>
            <RoutineTitle isDark={isDark}>{routines.title}</RoutineTitle>
          </RoutineTitleContainer>
          <ItemConteiner
            isDark={isDark}
            style={{
              borderColor: isDark ? `${colors.grey_8}` : `${colors.grey_3}`,
            }}
          >
            <FlatList
              // contentContainerStyle={{ width: 400 }}
              data={routines.item}
              keyExtractor={(item) => item.routineIdx}
              renderItem={renderItem2}
              showsVerticalScrollIndicator={false}
            />
            {/* {routines.item.map((routine, id) => (
                            <RoutineItem
                                isDark={isDark}
                                key={id}
                                select={selectedID == id}
                                onPress={() => {
                                    setSelectedID(id)
                                }}
                                day={routine.day}
                                parts={routine.parts}
                                exercises={routine.exercises}
                            />
                        ))} */}
          </ItemConteiner>
        </RoutineBox>
      </RoutineContainer>
    )
  }

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
        contentContainerStyle={
          {
            // width: '100%',
            // margin: 100,
          }
        }
        // 스크롤이 멈출 때마다 현재 페이지를 계산합니다.
        // onMomentumScrollEnd={(event) => {
        //   const offsetX = event.nativeEvent.contentOffset.x;
        //   const width = event.nativeEvent.layoutMeasurement.width;
        //   const pageIndex = Math.round(offsetX / width);
        //   setCurrentPage(pageIndex);
        //   console.log("offsetX :", offsetX, " width :", width);
        //   // setSelectedID("");
        // }}
      />
      <PageIndicator isDark={isDark} totalPages={data.length} currentPage={currentPage} />
    </Container>
  )
}
const Container = styled.View`
  /* flex: 1; */
  height: 470px;
`
const RoutineContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-left: ${ScreenWidth * 0.07}px;
  margin-right: ${ScreenWidth * 0.12}px;
  margin-top: 10px;
`
const RoutineBox = styled.View`
  width: 100%;
`
const RoutineTitleContainer = styled.View`
  position: absolute;
  width: 160px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.grey_7};
  border-radius: 100px;
  top: -15px;
  left: ${ScreenWidth * 0.43 - 80}px;
  z-index: 1;
`
const RoutineTitle = styled.Text`
  font-size: 13px;
  font-family: Pretendard-Regular;
  color: ${colors.white};
`
const ItemConteiner = styled.View`
  width: 107%;
  height: 365px;
  border: 1px;
  border-color: ${(props) => (props.isDark ? colors.grey_8 : colors.grey_3)};
  border-radius: 20px;
  background-color: ${(props) => (props.isDark ? colors.grey_9 : colors.white)};
  padding: 22px 0px 5px 0px;
  align-items: center;
`
const PageIndicatorContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 22px;
`
const PageDot = styled.View`
  width: 7px;
  height: 7px;
  border-radius: 5px;
  margin: 5px;
  background-color: ${(props) =>
    props.active ? (props.isDark ? colors.grey_2 : colors.grey_7) : props.isDark ? colors.grey_7 : colors.grey_3};
`
