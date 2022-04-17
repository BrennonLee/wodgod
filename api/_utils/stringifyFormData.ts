export default (obj: { [x: string]: string | number | string[] }) =>
  Object.entries(obj).reduce(
    (val, [key, value]) => `${val}${key}=${escape(value.toString() || "")}&`,
    ""
  );
