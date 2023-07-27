import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import { listToObject } from "../../components/Shared/MyRoutine_Shared";
import { MovableSchedule } from "../../components/MovableSchedule";

const SCHEDULES = [
  {
    id: 0,
    valid: false,
  },
  {
    id: 1,
    part: "코어",
    valid: true,
  },
  {
    id: 2,
    valid: false,
  },
  {
    id: 3,
    valid: false,
  },
  {
    id: 4,
    part: "하체",
    valid: true,
  },
  {
    id: 5,
    valid: false,
  },
  {
    id: 6,
    part: "상체",
    valid: true,
  },
];

export default function App() {
  const positions = useSharedValue(listToObject(SCHEDULES));
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          {SCHEDULES.map((sche) => (
            <MovableSchedule
              key={sche.id}
              id={sche.id}
              day={sche.day}
              valid={sche.valid}
              part={sche.part}
              positions={positions}
              songsCount={SCHEDULES.length}
            />
          ))}
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}
