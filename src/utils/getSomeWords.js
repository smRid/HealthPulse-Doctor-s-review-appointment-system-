const getSomeWords = (str, amount) => {
  const arrayWords = str.split(/\s+/);
  if (arrayWords.length <= amount) return arrayWords.slice(0, amount).join(" ");
  else return `${arrayWords.slice(0, amount).join(" ")}...`;
};

export default getSomeWords;
