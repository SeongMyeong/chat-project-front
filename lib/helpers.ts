export const nicknameMaker = () => {
  let firstNameList = ['A', 'B', 'C', 'D', 'E', 'F'];
  let secondNameList = ['1', '2', '3', '4', '6', '7'];
  let first = Math.floor(Math.random() * firstNameList.length - 1) + 1;
  let second = Math.floor(Math.random() * firstNameList.length - 1) + 1;
  return firstNameList[first] + '_' + secondNameList[second];
};
