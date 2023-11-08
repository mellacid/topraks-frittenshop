// GAME

const game = document.getElementById("game");
const dog = document.getElementById("dog");
const block = document.getElementById("block");
const startText = document.getElementById("start-text");
const loseText = document.getElementById("lose-text");
const jumpCountElement = document.getElementById("jump-count");
const winText = document.getElementById("win-text");

let jumpCount = 0;

function jump() {
  dog.classList.remove("walking");
  dog.classList.add("jumping");
}

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    if (!dog.classList.contains("walking")) {
      dog.classList.add("walking");
      block.classList.add("block-moves");
      startText.style.display = "none";
    }
    jump();
  }
});
document.addEventListener("keyup", (event) => {
  dog.classList.remove("jumping");
  dog.classList.add("walking");
});

const checkHit = setInterval(function () {
  let dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("top"));
  let dogLeft = parseInt(window.getComputedStyle(dog).getPropertyValue("left"));

  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );

  if (blockLeft < 90 && blockLeft > 0 && dogTop >= 140) {
    block.style.animation = "none";
    block.style.display = "none;";
    dog.style.display = "none";
    loseText.style.display = "block";
  } else if (jumpCount === 10) {
    winText.style.display = "block";
    block.style.animation = "none";
    block.style.display = "none;";
    dog.style.display = "none";
  }
}, 10);

block.addEventListener("animationend", () => {
  jumpCount += 1;
  jumpCountElement.innerHTML = jumpCount;
  block.classList.remove("block-moves");
  void block.offsetWidth; // Trigger reflow to restart the animation
  block.classList.add("block-moves");
});

// GAME END
