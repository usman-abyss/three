import { selector } from "recoil";
import { boxesState } from "../atoms";
import { IBox } from "../../types";

export const evenNumberedBoxes = selector<IBox[]>({
  key: "boxesState",
  get: ({ get }) => {
    const evens = get(boxesState).filter((_, i) => i % 2 === 0);
    return evens;
  },
});
