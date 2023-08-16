import axios from "axios";
//prettier-ignore
export const days = ["월", "화", "수", "목", "금", "토", "일"];

export const getRoutines = async () => {
  try {
    let url = "https://gpthealth.shop/";
    let detailAPI = "app/routine/calendar";
    const response = await axios.get(url + detailAPI);

    const result = response.data;
    return result;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
export const getRoutineParts = async () => {
  try {
    let url = "https://gpthealth.shop/";
    let detailAPI = "app/routine/calendar/parts";
    const response = await axios.get(url + detailAPI);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export const sortArray = (obj) => {
  const sortedArray = Object.keys(obj.parts).map((key, index) => ({
    id: index,
    parts: obj.parts[key] !== null ? obj.parts[key] : "임시",
    routineId: obj.routineIdx[key],
  }));

  return sortedArray;
};
export const getRoutine = async (mySCHEDULE, selectedDay, setIsLoading) => {
  setIsLoading(true);
  try {
    let url = "https://gpthealth.shop/";
    //후가공한 SCHEDULE 배열에서의 IDX값을 그대로 가져와 query스트링으로 추가
    let detailAPI = `app/routine/${mySCHEDULE[selectedDay].routineId}`;
    const response = await axios.get(url + detailAPI);

    const result = response.data;
    setIsLoading(false);
    return result;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export const updateRoutine = async (mySCHEDULE, selectedDay, newRoutine) => {
  if (newRoutine == undefined) {
    let message = "newRoutine가 undefined여서, updateRoutine 실행취소";
    return message;
  } else {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `app/routine/${mySCHEDULE[selectedDay].routineId}`;
      const response = await axios.put(url + detailAPI, newRoutine, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }
};
