export function jump(dog) {
  dog.classList.remove("walking");
  dog.classList.add("jumping");
}

export const checkHit = (window, dog, block, loseText, winText, jumpCount) => {
  setInterval(function () {
    let dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("top"));
    let dogLeft = parseInt(
      window.getComputedStyle(dog).getPropertyValue("left")
    );

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
};

// GAME END
