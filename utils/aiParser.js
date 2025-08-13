const parseNumberedList = (text) => {
  return text
    .split(/\d+\.\s+/)
    .slice(1)
    .map((item) => item.trim().replace(/\n+/g, " "))
    .filter((item) => item.length > 0);
};

export default parseNumberedList;
