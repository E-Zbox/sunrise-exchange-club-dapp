export const expressInThousands = (num: number): string => {
  let rem = num.toFixed(0).length % 3;
  let start = rem;
  let end = Math.floor(num.toFixed(0).length / 3);
  let result = num.toFixed(0).substring(0, rem);
  for (let i = 0; i < end; i++) {
    result = `${result}${rem > 0 || i > 0 ? "," : ""}${num
      .toFixed(0)
      .substring(start, start + 3)}`;
    start += 3;
  }
  return result;
};
