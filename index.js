"use strict";

// var gameBoard = [
//   [0, 1, 0, 1, 0, 1, 0, 1],
//   [1, 0, 1, 0, 1, 0, 1, 0],
//   [0, 1, 0, 1, 0, 1, 0, 1],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0],
//   [2, 0, 2, 0, 2, 0, 2, 0],
//   [0, 2, 0, 2, 0, 2, 0, 2],
//   [2, 0, 2, 0, 2, 0, 2, 0],
// ];

class Checker {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.isAlive = true;
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

    [this.x, this.y, this.type, this.isAlive] = nums;
  }
}

const b01 = new Checker(0, 1, "black");
const b03 = new Checker(4, 1, "black");
const b05 = new Checker(0, 5, "black");
const b07 = new Checker(4, 7, "black");

const b10 = new Checker(1, 0, "black");
const b12 = new Checker(1, 2, "black");
const b14 = new Checker(1, 4, "black");
const b16 = new Checker(3, 4, "black");

const b21 = new Checker(3, 0, "black");
const b23 = new Checker(3, 2, "black");
const b25 = new Checker(1, 6, "black");
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
const b76 = new Checker(4, 3, "white");

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
const verifyOnRightStep = function (item, step) {
  // console.log("step and item", step, item);
  if ((step[0] > 7 && step[0] < 0) || step[1] > 7 || step[1] < 0) {
    // console.log("таких ходів не існує");
    return false;
  } else return true;
  // const isRightY = () => step[1] === item.y - 1 || step[1] === item.y + 1;

  // if (whosTurn === "white") {
  //   if (step[0] === item.x - 1 && isRightY()) {
  //     return true;
  //   } else {
  //     console.log("некоректний хід, білі не можуть так ходити");
  //     return false;
  //   }
  // } else {
  //   if (step[0] === item.x + 1 && isRightY()) {
  //     return true;
  //   } else {
  //     console.log("некоректний хід, чорні не можуть так ходити");
  //     return false;
  //   }
};

const verifyOnRightWay = function (item) {
  if (item.type !== whosTurn) {
    console.log("Ви зараз не ходите");
    return false;
  } else {
    return true;
  }
};

function getAccessablePoint(item) {
  const accessPoint = [];

  if (item.type === "white") {
    const leftStepWhite = findeElement(item.x - 1, item.y - 1);
    const rightStepWhite = findeElement(item.x - 1, item.y + 1);

    if (!leftStepWhite && verifyOnRightStep(item, [item.x - 1, item.y - 1]))
      accessPoint.push([item.x - 1, item.y - 1, null, null]);
    if (!rightStepWhite && verifyOnRightStep(item, [item.x - 1, item.y + 1]))
      accessPoint.push([item.x - 1, item.y + 1, null, null]);
    console.log("accessPoint");

    console.table(accessPoint);
  } else {
    const leftStepBlack = findeElement(item.x + 1, item.y - 1);
    const rightStepBlack = findeElement(item.x + 1, item.y + 1);

    if (!leftStepBlack && verifyOnRightStep(item, [item.x + 1, item.y - 1]))
      accessPoint.push([item.x + 1, item.y - 1, null, null]);
    if (!rightStepBlack && verifyOnRightStep(item, [item.x + 1, item.y + 1]))
      accessPoint.push([item.x + 1, item.y + 1, null, null]);
    console.log("accessPoint");

    console.table(accessPoint);
  }
  return accessPoint;
}

function getAllWays(x, y) {
  // x = x - 1;
  // y = y - 1;
  const accessBattlePoints = [];
  // console.log("call getTopRight", x, y);
  // toTopRight
  let opociteColor = "";
  whosTurn === "white" ? (opociteColor = "black") : (opociteColor = "white");
  console.log(verifyOnRightStep([x - 1, y + 1], [x - 2, y + 2]));
  if (findeElement(x - 1, y + 1)) {
    if (
      findeElement(x - 1, y + 1).type != findeElement(x, y).type &&
      !findeElement(x - 2, y + 2) &&
      verifyOnRightStep([x - 1, y + 1], [x - 2, y + 2])
    ) {
      accessBattlePoints.push([x - 2, y + 2, x - 1, y + 1]);
    }
  }
  //toTopLeft
  if (findeElement(x - 1, y - 1)) {
    if (
      findeElement(x - 1, y - 1).type != findeElement(x, y).type &&
      !findeElement(x - 2, y - 2) &&
      verifyOnRightStep([x - 1, y - 1], [x - 2, y - 2])
    ) {
      accessBattlePoints.push([x - 2, y - 2, x - 1, y - 1]);
    }
  }
  // toBottomRight
  if (findeElement(x + 1, y + 1)) {
    if (
      findeElement(x + 1, y + 1).type != findeElement(x, y).type &&
      !findeElement(x + 2, y + 2) &&
      verifyOnRightStep([x + 1, y - 1], [x + 2, y + 2])
    ) {
      accessBattlePoints.push([x + 2, y + 2, x + 1, y + 1]);
    }
  }
  //toBottomLeft
  if (findeElement(x - 1, y - 1)) {
    if (
      findeElement(x - 1, y - 1).type != findeElement(x, y).type &&
      !findeElement(x - 2, y - 2) &&
      verifyOnRightStep([x - 1, y - 1], [x - 2, y - 2])
    ) {
      accessBattlePoints.push([x - 2, y - 2, x - 1, y - 1]);
    }
  }

  console.table(accessBattlePoints);

  return accessBattlePoints;
}

// console.table(accessPoint);

function paint() {
  let currentBoard = "";
  let numOfCheckerArr = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isChekersExist = findeElement(i, j);

      if (isChekersExist && isChekersExist.isAlive === true) {
        currentBoard +=
          "ш" + isChekersExist.x + isChekersExist.y + isChekersExist.type[0];
        numOfCheckerArr++;
      } else {
        currentBoard += `---`;
      }
    }
    currentBoard += "\n";
  }

  return currentBoard;
}
const moveStep = function (arr, x, y) {
  console.log("arr", arr);
  console.log(x, y);
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === x && arr[i][1] === y) {
      console.log("arr[i]", arr[i]);

      return arr[i];
    }
  }
};
console.log(paint());

while (true) {
  const message1 = "введіть номер шашки, якою бажаєте походити";
  const message2 = "введіть номер бажаного ходу";

  console.log(Сheckers);
  const transformReceivedDataInArr = (text) => {
    let result = prompt(text);
    let res = result.split("");

    return res.map((item) => Number(item));
  };

  let getNumsChecker = transformReceivedDataInArr(message1);
  let getWishesNums = transformReceivedDataInArr(message2);
  getWishesNums.push(whosTurn);
  getWishesNums.push(true);

  let currentChecker = findeElement(getNumsChecker[0], getNumsChecker[1]);
  console.log("currentChecker", currentChecker);

  const currentWays = [
    ...getAccessablePoint(currentChecker),
    ...getAllWays(currentChecker.x, currentChecker.y),
  ];
  const moveStepArr = moveStep(currentWays, getWishesNums[0], getWishesNums[1]);
  if (moveStepArr) {
    if (moveStepArr[3] === null) {
      currentChecker.data = getWishesNums;
    } else {
      currentChecker.data = getWishesNums;
      console.log("CDG", currentChecker.data, getWishesNums);

      let deletedEl = findeElement(moveStepArr[2], moveStepArr[3]);
      console.log(deletedEl);

      deletedEl.data = [-100, -100, deletedEl.type, false];
    }
  } else continue;
  console.dir(paint());
  console.table(Сheckers);
  console.table(currentWays);

  whosTurn === "white" ? (whosTurn = "black") : (whosTurn = "white");
}
