export const decodeBinary = (binary: NodeJS.AllowSharedBufferSource) => {
  const json = new TextDecoder().decode(binary);
  return JSON.parse(json);
}
