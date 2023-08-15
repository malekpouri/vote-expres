export const nonEmptyString = (x: string | any[] | undefined) => {
  if (
    x === undefined ||
    typeof x !== "string" ||
    (typeof x === "string" && x.length === 0)
  )
    return false;
  else return true;
};
