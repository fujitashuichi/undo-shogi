export const getKifHeader = (kifContent: string): Record<string, string> => {
  const headers: Record<string, string> = {};

  const lines = kifContent.replace(/\r\n/g, '\n').split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine === '' || /^\d+\s/.test(trimmedLine)) {
      break;
    }

    const separatorIndex = trimmedLine.search(/[:：]/);
    if (separatorIndex !== -1) {
      const key = trimmedLine.slice(0, separatorIndex).trim();
      const value = trimmedLine.slice(separatorIndex + 1).trim();
      headers[key] = value;
    }
  }

  return headers;
}
