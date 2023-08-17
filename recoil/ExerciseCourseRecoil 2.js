import { atom, selector } from "recoil";

export const HasRoutineAtom = atom({
  key: "hasRoutine",
  default: false,
});

export const hasRoutineSelector = selector({
  key: "hasRoutineSelector",
  get: async () => {
    const response = await getRouitneIdx();
    return response;
  },
});
