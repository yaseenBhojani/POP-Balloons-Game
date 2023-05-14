// Get DOM elements
const boxes = document.querySelectorAll(".box");
const colorBox = document.getElementById("colorBox");
const lifeBox = document.getElementById("chanceBox");
const popBox = document.getElementById("popBox");
const levelBox = document.getElementById("levelBox");

// Set initial variables
let totalLife = 3;
let totalPop = 0;
let isWin = null;
let availableColorBox = [];
let levelCount = 1;
let isLevel2 = false;

// Function that selects a random color
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

// Function that sets the initial state of the game
const initialState = () => {
  availableColorBox = [];
  boxes.forEach((box) => {
    const selectColor = colorSelector();
    if (!box.disabled) {
      box.style.backgroundColor = selectColor;
      availableColorBox.push(selectColor);
    }
  });
};

// Call the initial state function
initialState();

// Function that handles the pop selection
const popSelectHandler = () => {
  const randomNumber = Math.floor(Math.random() * availableColorBox.length);
  const colorSelect = availableColorBox[randomNumber];

  colorBox.innerHTML = `POP ${colorSelect} 📌`.toUpperCase();
  colorBox.style.color = colorSelect;
  availableColorBox.splice(randomNumber, 1);
};

// Call the pop selection function
popSelectHandler();

// Function that handles whether the game is won or lost
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
    colorBox.innerText = "LOSE";
  }

  // Disable all boxes after the game is won or lost
  if (isWin !== null) {
    for (const box of boxes) {
      if (!box.disabled) {
        box.innerText = colorBox.innerText;
      }
      box.disabled = true;
    }
  }
};

// Function that handles the hover event over the boxes
const hoverHandler = () => {
  boxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      const currentColor = colorBox.style.color;
      if (box.style.backgroundColor === currentColor) {
        box.innerHTML = "POP";
        totalPop++;
        popBox.innerText = "POP " + totalPop;
        setTimeout(() => {
          box.innerHTML = "<img src='./balloon.png' />";
        }, 600);
      } else {
        box.innerHTML = "MIS";
        totalLife--;
        lifeBox.innerText = "❤ LIFE " + totalLife;
        setTimeout(() => {
          box.innerHTML = "<img src='./close.png' />";
        }, 600);
      }
      box.style.backgroundColor = "#dfe6e9";
      box.disabled = true;
      box.style.zIndex = "-12";
      popSelectHandler();
      isWinHandler();
    });
  });
};

// Determine the value of num based on the screen width
let num;
if (innerWidth > 650) {
  num = 150;
} else if (innerWidth < 650) {
  num = 120;
}

// Call the hover event handler function
hoverHandler();

// Function that handles level 2 of the game
function level2() {
  autoReset();
  setInterval(() => {
    const balloonMovingHandler = (box) => {
      box.style.transform = `translateY(${
        Math.random() * num - Math.random() * num
      }px)`;
      box.style.transform += `translateX(${
        Math.random() * num - Math.random() * num
      }px)`;
    };

    boxes.forEach((box) => {
      balloonMovingHandler(box);
    });
  }, 300);
}

// Function that handles level 3 of the game
function level3() {
  autoReset();
  levelBox.innerText = "Level 3";
  setInterval(() => {
    const balloonMovingHandler = (box) => {
      box.style.transform = `translateY(${
        Math.random() * num - Math.random() * num
      }px)`;
      box.style.transform += `translateX(${
        Math.random() * num - Math.random() * num
      }px)`;
    };

    boxes.forEach((box) => {
      balloonMovingHandler(box);
    });
  }, 300);
  setInterval(() => {
    boxes.forEach((box) => {
      if (!box.disabled) {
        const color = (box.backgroundColor = initialState());
        availableColorBox.push(color);
      }
    });
  }, 3000);
}

// Function that resets the game
function autoReset() {
  totalLife = 3;
  lifeBox.innerText = "❤ LIFE " + totalLife;
  totalPop = 0;
  popBox.innerText = "POP " + totalPop;
  isWin = null;
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    box.style.zIndex = "12";
  });
  initialState();
  colorBox.innerHTML = ("POP " + availableColorBox[0] + " 📌").toUpperCase();
  colorBox.style.color = availableColorBox[0];
}

// Function that handles the reset button click event
const resetHandler = () => {
  window.top.location = window.top.location;
};
