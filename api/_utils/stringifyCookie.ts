export default (obj: any) =>
  Object.entries(obj).reduce(
    (val, [key, value]) => `${val}${key}=${value}; `,
    ""
  );
