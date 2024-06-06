const getRandomDigits = (length = 16) => {
  let randomNumber = "";
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
};
export {
  getRandomDigits as g
};
