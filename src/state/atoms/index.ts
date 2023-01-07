import { atom } from "recoil";
import { IBox } from "../../types";
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
