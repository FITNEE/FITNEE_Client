import { atom } from "recoil";

export const IsDarkAtom = atom({
  key: "DarkModeAtom",
  default: true,
});

export const TabBarAtom = atom({
  key: "TabBarAtom",
  default: true,
});
