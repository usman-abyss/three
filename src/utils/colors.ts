import { CSS_COLOR_NAMES } from "../data/colors";

// export const getRandomColor = () =>
// CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)];
//   `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const getRandomColor = () => {
  const x = Math.round(0xffffff * Math.random()).toString(16);
  const y = 6 - x.length;
  const z = "000000";
  const z1 = z.substring(0, y);
  //   const color = "#" + z1 + x;
  const color = `#${z1}${x}`;
  return color;
};
