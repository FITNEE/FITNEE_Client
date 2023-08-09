import { atom } from "recoil";

export const CreateRoutineAtom = atom({
  key: "CreateRoutineAtom",
  default: {
    RM: 0,
    targets: [],
    place: null,
    dayOfWeeks: [],
  },
});
