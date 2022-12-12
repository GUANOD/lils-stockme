export const genRandomHSL = () => {
  let hue = Math.floor(Math.random() * 360);
  return "hsl(" + hue + ", 100%, 87.5%)";
};
