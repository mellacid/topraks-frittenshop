export function jump(dog) {
  dog.classList.remove("walking");
  dog.classList.add("jumping");
}

export const checkHit = (window, dog, block, loseText) => {
  setInterval(function () {
    let dogTop = parseInt(window.getComputedStyle(dog).getPropertyValue("top"));

    let blockLeft = parseInt(
      window.getComputedStyle(block).getPropertyValue("left")
    );

    if (blockLeft < 90 && blockLeft > 0 && dogTop >= 140) {
      block.style.animation = "none";
      block.style.display = "none;";
      dog.style.display = "none";
      loseText.style.display = "block";
    }
  }, 10);
};
