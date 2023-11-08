import { fritten } from "./data/fritten.js";

import { checkHit, jump } from "./functionality/game.js";

console.log(fritten);

// GAME

const game = document.getElementById("game");
const dog = document.getElementById("dog");
const block = document.getElementById("block");
const startText = document.getElementById("start-text");
const loseText = document.getElementById("lose-text");
const jumpCountElement = document.getElementById("jump-count");
const winText = document.getElementById("win-text");
let jumpCount = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if (!dog.classList.contains("walking")) {
      dog.classList.add("walking");
      block.classList.add("block-moves");
      startText.style.display = "none";
    }
    jump(dog);
  }
});
document.addEventListener("keyup", (event) => {
  dog.classList.remove("jumping");
  dog.classList.add("walking");
});

checkHit(window, dog, block, loseText, winText, jumpCount);

block.addEventListener("animationend", () => {
  jumpCount += 1;
  jumpCountElement.innerHTML = jumpCount;
  block.classList.remove("block-moves");
  void block.offsetWidth; // Trigger reflow to restart the animation
  block.classList.add("block-moves");
});
