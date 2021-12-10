"use strict";
// function paintOfBoard() {
//   const arr = [];
//   for (let i = 0; i < 8; i++) {
//     const arr2 = [];
//     for (let j = 0; j < 8; j++) {
//       arr2.push(`${i}.${j}`);
//     }
//     arr.push(arr2);
//   }
//   return arr;
// }
var gameBoard = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
];

class Checker {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }
  setValue = (x, y) => {
    console.log("Переход с", this.x, "-", this.y);
    this.x = x;
    this.y = y;
    console.log("Переход на", this.x, "-", this.y);
  };

  get data() {
    return [this.x, this.y, this.type];
  }

  set data(nums) {
    console.log([this.x, this.y, this.type], nums);

    [this.x, this.y, this.type] = nums;
  }
}

const b01 = new Checker(0, 1, "black");
const b03 = new Checker(0, 3, "black");
const b05 = new Checker(0, 5, "black");
const b07 = new Checker(0, 7, "black");

const b10 = new Checker(1, 0, "black");
const b12 = new Checker(1, 2, "black");
const b14 = new Checker(1, 4, "black");
const b16 = new Checker(1, 6, "black");

const b21 = new Checker(2, 1, "black");
const b23 = new Checker(2, 3, "black");
const b25 = new Checker(2, 5, "black");
const b27 = new Checker(2, 7, "black");

const b50 = new Checker(5, 0, "white");
const b52 = new Checker(5, 2, "white");
const b54 = new Checker(5, 4, "white");
const b56 = new Checker(5, 6, "white");

const b61 = new Checker(6, 1, "white");
const b63 = new Checker(6, 3, "white");
const b65 = new Checker(6, 5, "white");
const b67 = new Checker(6, 7, "white");

const b70 = new Checker(7, 0, "white");
const b72 = new Checker(7, 2, "white");
const b74 = new Checker(7, 4, "white");
const b76 = new Checker(7, 6, "white");

const Сheckers = [
  b01,
  b03,
  b05,
  b07,
  b10,
  b12,
  b14,
  b16,
  b21,
  b23,
  b25,
  b27,
  b50,
  b52,
  b54,
  b56,
  b61,
  b63,
  b65,
  b67,
  b70,
  b72,
  b74,
  b76,
  {},
];

const findeElement = function (x, y) {
  return Сheckers.find((item) => item.x === x && item.y === y);
};
let whosTurn = "white";
const ferifyOnRightWay = function (item) {
  //   console.log(item.type);
  //   if(item.type!==whosTurn) {
  // 	return
  //   }
  console.log("whosTurn", whosTurn);
  return item.type === whosTurn;
};

function paint() {
  let currentBoard = "";
  let numOfCheckerArr = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      //   console.log(
      //     `${i} - ${Сheckers[numOfCheckerArr].x}, ${j} -${Сheckers[numOfCheckerArr].y}`
      //   );
      //   const isChekersExist = Сheckers.find(
      //     (item) => item.x === i && item.y === j
      //   );
      const isChekersExist = findeElement(i, j);
      if (isChekersExist) {
        currentBoard += "ш" + isChekersExist.x + isChekersExist.y;
        numOfCheckerArr++;
      } else {
        currentBoard += `---`;
      }
    }
    // numOfCheckerArr = 0;
    currentBoard += "\n";
  }
  //   console.log(Сheckers[numOfCheckerArr].x);

  return currentBoard;
}
// "введіть номер шашки, якою бажаєте походити"
while (true) {
  const message1 = "введіть номер шашки, якою бажаєте походити";
  const message2 = "введіть номер бажаного ходу";
  console.dir(paint());

  console.log(Сheckers);
  const transformReceivedDataInArr = (text) => {
    let result = prompt(text);
    let res = result.split("");

    return res.map((item) => Number(item));
  };

  let getNumsChecker = transformReceivedDataInArr(message1);
  let getWishesNums = transformReceivedDataInArr(message2);
  getWishesNums.push(whosTurn);

  let currentChecker = findeElement(getNumsChecker[0], getNumsChecker[1]);
  console.log("currentChecker", currentChecker);
  if (ferifyOnRightWay(currentChecker)) {
    currentChecker.data = getWishesNums;
    console.dir(paint());
    console.log(Сheckers);

    whosTurn === "white" ? (whosTurn = "black") : (whosTurn = "white");
  } else console.log("ви зараз не ходите!");
  //   console.log(Сheckers.indexOf(ind));

  //   console.log(whosTurn);
  //   break;
}
