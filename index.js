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
function Timer() {
  // функция таймера (подсчёт количества секунд)
  var elem = document.getElementById("timer");
  elem.value = parseInt(elem.value) + 1;
}

function start() {
  // функция запуска таймера
  window.TimerId = window.setInterval(Timer, 1000);
}

function stop() {
  // функция остановки таймера
  window.clearInterval(window.TimerId);
  // function startTimer(duration, display) {
  //   var timer = duration,
  //     minutes,
  //     seconds;
  //   setInterval(function () {
  //     minutes = parseInt(timer / 60, 10);
  //     seconds = parseInt(timer % 60, 10);

  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     seconds = seconds < 10 ? "0" + seconds : seconds;

  //     display.textContent = minutes + ":" + seconds;

  //     if (--timer < 0) {
  //       timer = duration;
  //     }
  //   }, 1000);
  // }

  // window.onload = function () {
  //   var fiveMinutes = 60 * 5,
  //     display = document.querySelector("#time");
  //   startTimer(fiveMinutes, display);
  // };
  const dataGame = {
    arr: [],
  };
  let whosTurn = "white";
  function infoGame() {
    const whosturnnow = document.querySelector(".whosturnnow");
    const blackpoints = document.querySelector(".blackpoints");
    const whitepoints = document.querySelector(".whitepoints");
    const getWhitepoints = () =>
      Сheckers.filter((el) => el.type === "black" && el.isAlive === false)
        .length;
    const getBlackpoints = () =>
      Сheckers.filter((el) => el.type === "white" && el.isAlive === false)
        .length;
    whosturnnow.innerHTML = `Зараз ходять ${whosTurn}`;
    whitepoints.innerHTML = `Білі ${getWhitepoints()}`;
    blackpoints.innerHTML = `Чорні ${getBlackpoints()}`;
  }

  function paintIterface() {
    let prevEl = document.querySelectorAll(".board div");
    for (let i = 0; i <= prevEl.length - 1; i++) {
      prevEl[i].innerHTML = "";
    }
    for (let i = 0; i < Сheckers.length - 1; i++) {
      let numPos = `${Сheckers[i].x}${Сheckers[i].y}`;
      let element = document.getElementById(numPos);
      // console.log(element);

      let imgEl;
      Сheckers[i].type === "white" ? (imgEl = "white") : (imgEl = "black");
      let StrCh = `<img src="${imgEl}.png" class="${numPos}" />`;
      // console.log("element StrCh", element, StrCh);

      if (Сheckers[i].isAlive === true)
        element.insertAdjacentHTML("afterbegin", StrCh);
    }
  }
  paintIterface();
  const moveStep = function (arr, x, y) {
    console.log("arr", arr);
    console.log(typeof x, typeof y);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === x && arr[i][1] === y) {
        console.log("arr[i]", arr[i]);

        return arr[i];
      }
    }
  };

  const board = document.querySelector(".board");
  board.addEventListener("click", () => {
    console.log("currentTarget", event.target);
    let lengthOfData = dataGame.arr.length;
    let target = event.target;
    let elId = target.id;
    if (lengthOfData === 0) {
      console.log("Оберіть клітинку для ходу");
      dataGame.arr.push(elId.split(""));
      // infoGame();
      target.classList.add("shadow");
    } else if (lengthOfData === 1) {
      console.log("Хід зроблено");
      dataGame.arr.push(elId.split(""));
      dataGame.arr.push(1);
      let prevEl = `${dataGame.arr[0][0]}${dataGame.arr[0][1]}`;
      console.log(prevEl);

      document.getElementById(prevEl).classList.remove("shadow");

      //------------

      let getNumsChecker = [
        Number(dataGame.arr[0][0]),
        Number(dataGame.arr[0][1]),
      ];
      let getWishesNums = [
        Number(dataGame.arr[1][0]),
        Number(dataGame.arr[1][1]),
      ];
      getWishesNums.push(whosTurn);
      getWishesNums.push(true);

      console.log(
        "getNumsChecker[0], getNumsChecker[1]",
        getNumsChecker[0],
        getNumsChecker[1]
      );

      let currentChecker = findeElement(getNumsChecker[0], getNumsChecker[1]);
      console.log("currentChecker", currentChecker);

      const currentWays = [
        ...getAccessablePoint(currentChecker),
        ...getAllWays(currentChecker.x, currentChecker.y),
      ];
      const moveStepArr = moveStep(
        currentWays,
        getWishesNums[0],
        getWishesNums[1]
      );
      console.log("currentWays", currentWays);
      console.log("moveStepArr", moveStepArr);
      // console.log('moveStepArr',moveStepArr);

      if (moveStepArr) {
        if (moveStepArr[3] === null) {
          currentChecker.data = getWishesNums;
          console.log("FREEWAYSTEP");

          whosTurn === "white" ? (whosTurn = "black") : (whosTurn = "white");
          infoGame();
        } else {
          currentChecker.data = getWishesNums;
          console.log("CDG", currentChecker.data, getWishesNums);

          let deletedEl = findeElement(moveStepArr[2], moveStepArr[3]);
          console.log(deletedEl);

          deletedEl.data = [-100, -100, deletedEl.type, false];
          console.log(whosTurn);
          whosTurn === "white" ? (whosTurn = "black") : (whosTurn = "white");
          infoGame();
        }
      } else alert("Недопустимий хід!");
      console.dir(paint());
      console.table(Сheckers);
      console.table(currentWays);

      paintIterface();
      //------------
    } else {
      dataGame.arr = [];
    }
    console.log(dataGame);
  });

  const findeElement = function (x, y) {
    return Сheckers.find((item) => item.x === x && item.y === y);
  };

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
    if (findeElement(x + 1, y - 1)) {
      if (
        findeElement(x + 1, y - 1).type != findeElement(x, y).type &&
        !findeElement(x + 2, y - 2) &&
        verifyOnRightStep([x + 1, y - 1], [x + 2, y - 2])
      ) {
        accessBattlePoints.push([x + 2, y - 2, x + 1, y - 1]);
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

  // while (true) {
  //   const message1 = "введіть номер шашки, якою бажаєте походити";
  //   const message2 = "введіть номер бажаного ходу";

  //   console.log(Сheckers);
  //   const transformReceivedDataInArr = (text) => {
  //     let result = prompt(text);
  //     let res = result.split("");

  //     return res.map((item) => Number(item));
  //   };

  //   let getNumsChecker = transformReceivedDataInArr(message1);
  //   let getWishesNums = transformReceivedDataInArr(message2);
  //   getWishesNums.push(whosTurn);
  //   getWishesNums.push(true);

  //   let currentChecker = findeElement(getNumsChecker[0], getNumsChecker[1]);
  //   console.log("currentChecker", currentChecker);

  //   const currentWays = [
  //     ...getAccessablePoint(currentChecker),
  //     ...getAllWays(currentChecker.x, currentChecker.y),
  //   ];
  //   const moveStepArr = moveStep(currentWays, getWishesNums[0], getWishesNums[1]);
  //   if (moveStepArr) {
  //     if (moveStepArr[3] === null) {
  //       currentChecker.data = getWishesNums;
  //     } else {
  //       currentChecker.data = getWishesNums;
  //       console.log("CDG", currentChecker.data, getWishesNums);

  //       let deletedEl = findeElement(moveStepArr[2], moveStepArr[3]);
  //       console.log(deletedEl);

  //       deletedEl.data = [-100, -100, deletedEl.type, false];
  //     }
  //   } else continue;
  //   console.dir(paint());
  //   console.table(Сheckers);
  //   console.table(currentWays);

  //   whosTurn === "white" ? (whosTurn = "black") : (whosTurn = "white");
  //
}
