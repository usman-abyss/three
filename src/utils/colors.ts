import { CSS_COLOR_NAMES } from "../data/colors";

export const getRandomColor = () =>
    CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)];