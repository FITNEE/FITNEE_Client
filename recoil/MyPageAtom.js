import { atom } from 'recoil'

export const IsDarkAtom = atom({
  key: 'DarkModeAtom',
  default: false,
})

export const TabBarAtom = atom({
  key: 'TabBarAtom',
  default: true,
})

export const GenderAtom = atom({
  key: 'GenderAtom',
  default: null,
})
