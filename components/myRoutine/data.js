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
  if (newRoutine != []) {
    console.log("newRoutine 비어있어서 updateRoutine 실행취소");
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
