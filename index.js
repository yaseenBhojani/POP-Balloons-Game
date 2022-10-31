const boxes = document.querySelectorAll(".box");
const colorBox = document.getElementById("colorBox");
const lifeBox = document.getElementById("chanceBox");
const popBox = document.getElementById("popBox");
const levelBox = document.getElementById("levelBox");
let totalLife = 3;
let totalPop = 0;
let isWin = null;
let availableColorBox = [];
let levelCount = 1;
let islevel2 = false;

const colorSelector = () => {
  const randomNumber = Math.random();
  let color;
  if (randomNumber < 0.2) {
    color = "green";
  } else if (randomNumber < 0.4) {
    color = "blue";
  } else if (randomNumber < 0.6) {
    color = "black";
  } else if (randomNumber < 0.8) {
    color = "red";
  } else {
    color = "yellow";
  }
  return color;
};

const initialState = () => {
  availableColorBox = [];
  boxes.forEach((e) => {
    const selectColor = colorSelector();
    if (!e.disabled) {
      e.style.backgroundColor = selectColor;

      availableColorBox.push(selectColor);
    }
  });
};
initialState();

const popSelectHandler = () => {
  const randomNumber = Math.floor(Math.random() * availableColorBox.length);
  const colorSelect = availableColorBox[randomNumber];
  // console.log(randomNumber);

  colorBox.innerHTML = `POP ${colorSelect} 📌`.toUpperCase();
  colorBox.style.color = colorSelect;
  availableColorBox.splice(randomNumber, 1);
};

popSelectHandler();

const isWinHandler = () => {
  if (totalPop === 10) {
    isWin = true;
    colorBox.innerText = "WIN";
    levelCount++;
    if (levelCount === 2) {
      levelBox.innerText = "Level 2";
      setTimeout(() => {
        level2();
      }, 1000);
    } else if (levelCount === 3) {
      setTimeout(() => {
        level3();
      }, 1000);
    }
  } else if (totalLife === 0) {
    isWin = false;
    colorBox.innerText = "lose";
  }

  if (isWin !== null) {
    for (const e of boxes) {
      if (!e.disabled) {
        e.innerText = colorBox.innerText;
      }
      e.disabled = true;
    }
  }
};

const hoverHandler = () => {
  boxes.forEach((e) => {
    e.addEventListener("mouseover", () => {
      const currentColor = colorBox.style.color;
      if (e.style.backgroundColor === currentColor) {
        e.innerHTML = "POP";
        totalPop++;
        popBox.innerText = "POP " + totalPop;
        setTimeout(() => {
          e.innerHTML = "<img src='./balloon.png' />";
        }, 600);
      } else {
        e.innerHTML = "MIS";
        totalLife--;
        lifeBox.innerText = "❤ " + " LIFE " + totalLife;
        setTimeout(() => {
          e.innerHTML = "<img src='./close.png' />";
        }, 600);
      }
      e.style.backgroundColor = "#dfe6e9";
      e.disabled = true;
      e.style.zIndex = "-12";
      popSelectHandler();
      isWinHandler();
    });
  });
};
let num;

if (innerWidth > 650) {
  num = 150;
} else if (innerWidth < 650) {
  num = 120;
}
hoverHandler();
function level2() {
  autoReset();
  setInterval(() => {
    const ballonMovingHandler = (e) => {
      e.style.transform = `translateY(${
        Math.random() * num - Math.random() * num
      }px)`;
      e.style.transform += `translateX(${
        Math.random() * num - Math.random() * num
      }px)`;
    };

    boxes.forEach((e) => {
      ballonMovingHandler(e);
    });
  }, 300);
}

function level3() {
  autoReset();
  levelBox.innerText = "Level 3";
  setInterval(() => {
    const ballonMovingHandler = (e) => {
      e.style.transform = `translateY(${
        Math.random() * num - Math.random() * num
      }px)`;
      e.style.transform += `translateX(${
        Math.random() * num - Math.random() * num
      }px)`;
    };

    boxes.forEach((e) => {
      ballonMovingHandler(e);
    });
  }, 300);
  setInterval(() => {
    boxes.forEach((e) => {
      if (!e.disabled) {
        const color = (e.backgroundColor = initialState());
        availableColorBox.push(color);
      }
    });
  }, 3000);
}

function autoReset() {
  totalLife = 3;
  lifeBox.innerText = "❤ LIFE " + totalLife;
  totalPop = 0;
  popBox.innerText = "POP " + totalPop;
  isWin = null;
  boxes.forEach((e) => {
    e.innerText = "";
    e.disabled = false;
    e.style.zIndex = "12";
  });
  initialState();
  colorBox.innerHTML = ("POP " + availableColorBox[0] + " 📌").toUpperCase();
  colorBox.style.color = availableColorBox[0];
}

const resetHandler = () => {
  window.top.location = window.top.location;
};
