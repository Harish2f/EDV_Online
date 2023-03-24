// length: 10 and the text "Hello World" will return "Hello Worl..."
const trimText = (text, length) => {
  if (text.length > length) {
    return `${text.substring(0, length)}...`;
  }
  return text;
};

export default trimText;
