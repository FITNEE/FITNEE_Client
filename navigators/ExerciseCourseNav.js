import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterRoutine from "../screens/ExerciseCourse/RegisterRoutine";
import CompleteExercise from "../screens/ExerciseCourse/CompleteExercise";
import ExerciseResult from "../screens/ExerciseCourse/ExerciseResult";
import ExerciseCourse_1 from "../screens/ExerciseCourse/ExerciseCourse_1";
import ExerciseCourse_2 from "../screens/ExerciseCourse/ExerciseCourse_2";
import ExerciseCourse from "../screens/ExerciseCourse/ExerciseCourse";
import StartExercise from "../screens/ExerciseCourse/StartExercise";
import { useRecoilState } from "recoil";
import { HasRoutineAtom } from "../recoil/ExerciseCourseRecoil";
import Loading from "../screens/ExerciseCourse/Loading";
import { styled } from "styled-components/native";
import { colors } from "../colors";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const Stack = createStackNavigator();

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0px 23.5px;
  background: ${colors.grey_1};
`;

const ExerciseCircle = styled.View`
  width: 307px;
  height: 307px;
  border-radius: 291px;
  background: ${colors.white};
  margin-bottom: 24px;
  justify-content: center;
  align-items: center;
`;

function LoadingIndicator() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.grey_1 }}>
      <Container>
        <ExerciseCircle />
      </Container>
    </SafeAreaView>
  );
}

function ExerciseCourseNavLink({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  //fri,mon,sat,sun,thu,tue,wed
  const Week = new Array(3, 1, 5, 6, 4, 0, 2);
  const now = new Date();
  let day = Week[now.getDay()];

  const getRoutineData = async () => {
    try {
      let url = "https://gpthealth.shop/";
      let detailAPI = `/app/routine/calendar`;

      const response = await axios.get(url + detailAPI);
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const routineData = await getRoutineData();
      setRoutineIdx(routineData.result[day]);
      setIsLoading(false);
    };
    fetchData();
  }, [day]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (routineIdx === 0) {
    navigation.navigate("RegisterRoutine");
  } else {
    navigation.navigate("StartExercise");
  }

  return null;
}

export default function ExerciseCourseNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen name="StartExercise" component={StartExercise} />
      <Stack.Screen name="RegisterRoutine" component={RegisterRoutine} />
      <Stack.Screen name="ExerciseCourse" component={ExerciseCourse} />
      <Stack.Screen name="CompleteExercise" component={CompleteExercise} />
      <Stack.Screen name="ExerciseResult" component={ExerciseResult} />
      <Stack.Screen
        name="ExerciseCourse_1"
        component={ExerciseCourse_1}
        options={{
          // 화면 전환 애니메이션 없음
          transitionSpec: {
            open: { animation: "timing", config: { duration: 0 } },
            close: { animation: "timing", config: { duration: 0 } },
          },
        }}
      />
      <Stack.Screen name="ExerciseCourse_2" component={ExerciseCourse_2} />
    </Stack.Navigator>
  );
}
