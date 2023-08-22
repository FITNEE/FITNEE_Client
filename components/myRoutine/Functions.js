import { Alert } from 'react-native'

export const pressBack = ({ setMode, setNewSCHE, setNewRoutine }) => {
  Alert.alert('이 변경 사항을 폐기하시겠습니까?', '', [
    {
      text: '취소',
      onPress: () => {},
      style: 'default',
    },
    {
      text: '변경사항 폐기',
      onPress: () => {
        setMode(false), setNewSCHE(null), setNewRoutine(null)
      },

      style: 'destructive',
    },
  ])
}

/**백엔드로부터 받아온 rawData를 요일요약 상단 컴퍼넌트에 렌더링하고자 숫자값만 담긴 배열로 후가공*/
export const processDayData = (rawData) => {
  let newArr = new Array(rawData.length)
  newArr[0] = { id: 0, routineId: rawData.monRoutineIdx }
  newArr[1] = { id: 1, routineId: rawData.tueRoutineIdx }
  newArr[2] = { id: 2, routineId: rawData.wedRoutineIdx }
  newArr[3] = { id: 3, routineId: rawData.thuRoutineIdx }
  newArr[4] = { id: 4, routineId: rawData.friRoutineIdx }
  newArr[5] = { id: 5, routineId: rawData.satRoutineIdx }
  newArr[6] = { id: 6, routineId: rawData.sunRoutineIdx }
  return newArr
}
