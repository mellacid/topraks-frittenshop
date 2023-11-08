import { fritten } from "./data/fritten.js";
import { checkHit, jump } from "./functionality/game.js";

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
  if (jumpCount === 9) {
    winText.style.display = "block";
    block.style.animation = "none";
    block.style.display = "none;";
    dog.style.display = "none";
  }
  jumpCount += 1;
  jumpCountElement.innerHTML = jumpCount;
  block.classList.remove("block-moves");
  void block.offsetWidth; // Trigger reflow to restart the animation
  block.classList.add("block-moves");
});

// GAME END

//  FRITTEN
const frittenElement = document.getElementById("fritten");

for (let menu of fritten) {
  const menuEach = document.createElement("div");
  menuEach.classList.add("menu-item");

  const image = document.createElement("img");
  image.classList.add("menu-image");
  image.src = menu.image;
  menuEach.appendChild(image);

  const name = document.createElement("h2");
  name.classList.add("menu-name");
  name.textContent = menu.name;
  menuEach.appendChild(name);

  const price = document.createElement("p");
  price.classList.add("menu-price");
  price.textContent = menu.price + "0 €";
  menuEach.appendChild(price);

  frittenElement.appendChild(menuEach);
}

const frittenTag = document.getElementById("fritten");

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("fritten") &&
    window.getComputedStyle(frittenElement).getPropertyValue("display") ===
      "none"
  ) {
    game.style.display = "none";
    frittenTag.style.display = "flex";
  } else {
    game.style.display = "block";
    frittenTag.style.display = "none";
  }
});

// FRITTEN END
