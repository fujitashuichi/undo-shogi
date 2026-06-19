export const encodeBinary = (data: any) => {
  const json = JSON.stringify(data);
  return new TextEncoder().encode(json);
}
