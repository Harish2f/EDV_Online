const generateRandomColor = (seed) => {
  const random = Math.abs(Math.sin(seed)) * 16777215;
  return `#${Math.floor(random).toString(16)}`;
};

const createRandomColorGenerator = () => {
  const seed = Math.random();
  return () => generateRandomColor(seed);
};

const randomColor = createRandomColorGenerator();

export default randomColor;
