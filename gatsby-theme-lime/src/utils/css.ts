export const px = (x: number | string) =>
  typeof x === "number" ? `${x}px` : x;
