export function renderValue(value: any) {
  if (typeof value === "object") {
    return new Date(value).toLocaleString();
  } else {
    return value;
  }
}
