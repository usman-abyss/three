import { atom } from "recoil";
import { Cordinate, IBox } from "../../types";
import { getRandomColor, getRandomUUID } from "../../utils";

export const countState = atom({
  key: "countState",
  default: 0,
});

export const boxesState = atom<IBox[]>({
  key: "boxesState",
  default: [
    // {
    //   id: getRandomUUID(),
    //   color: getRandomColor(),
    // },
  ],
});

export const directionLightsCordsState = atom<Cordinate>({
  key: "directionLightsCordsState",
  default: {
    x: 5,
    z: 4,
    y: 0.1,
  },
});
