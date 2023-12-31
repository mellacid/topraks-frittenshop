import { fritten } from "./data/fritten.js";
import { checkHit, jump } from "./scripts/game.js";
import { snacks } from "./data/snacks.js";
import { drinks } from "./data/drinks.js";
import { generateNickname } from "./data/nicknames.js";

const frittenElement = document.getElementById("fritten");
const frittenTag = document.querySelector(".fritten");

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
  applyDiscountCode();
});

checkHit(window, dog, block, loseText, winText, jumpCount);

block.addEventListener("animationend", () => {
  if (jumpCount === 4) {
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

let discountApplied = false; // Flag, um zu überprüfen, ob der Rabatt bereits angewendet wurde
let rabattcode = "";

function applyDiscountCode() {
  if (jumpCount >= 5 && !discountApplied) {
    rabattcode = prompt(
      "Herzlichen Glückwunsch! Du hast gewonnen. Gib deinen Rabattcode ein:"
    );
    alert("Rabattcode akzeptiert! 10% Rabatt wird angewendet.");
    discountApplied = true; // Setze das Flag, um zu verhindern, dass der Rabatt mehrmals angewendet wird
    renderCart();
  }
}
// GAME END

//  FRITTEN

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

// FRITTEN END

//  SNACKS
const snacksElement = document.getElementById("snacks");

for (let menu of snacks) {
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

  snacksElement.appendChild(menuEach);
}

const snacksTag = document.querySelector(".snacks");

// SNACKS END

// DRINKS

const drinksElement = document.getElementById("drinks");

for (let menu of drinks) {
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

  drinksElement.appendChild(menuEach);
}

const drinksTag = document.querySelector(".drinks");

// DRINKS END

// CART Start

const cartItemsList = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
let shoppingCart = [];

const cartIcon = document.querySelector(".fa-cart-shopping");
const cart = document.getElementById("cart");

cartIcon.addEventListener("click", () => {
  if (cart.classList.contains("cart-hidden")) {
    cart.classList.remove("cart-hidden");
  } else {
    cart.classList.add("cart-hidden");
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-image")) {
    const selectedItem = {
      name: e.target.nextElementSibling.textContent,
      price: parseFloat(
        e.target.nextElementSibling.nextElementSibling.textContent
      ),
    };

    addToCart(selectedItem);
  }
});

function addToCart(selectedItem) {
  shoppingCart.push(selectedItem);
  renderCart();
  cart.classList.remove("cart-hidden"); // Ändere die Sichtbarkeit des Warenkorbs
}

function renderCart() {
  cartItemsList.innerHTML = "";
  let total = 0;
  for (let i = 0; i < shoppingCart.length; i++) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const name = document.createElement("p");
    name.classList.add("cart-item-name");
    name.textContent = shoppingCart[i].name;
    cartItem.appendChild(name);

    const price = document.createElement("p");
    price.classList.add("cart-item-price");
    price.textContent = shoppingCart[i].price + "0 €";
    cartItem.appendChild(price);

    cartItemsList.appendChild(cartItem);

    total += shoppingCart[i].price;
  }

  // Berücksichtige den Rabatt
  if (rabattcode === "TOPRAKWINS10") {
    total *= 0.9; // 10% Rabatt
  }

  total = Math.round(total * 100) / 100;
  cartTotalElement.textContent = "Gesamtpreis:" + total + " €";
}

function clearCart() {
  shoppingCart = [];
  renderCart();
  cartTotalElement.textContent = `Warenkorb wurde geleert!`;
}

document.getElementById("clear-cart").addEventListener("click", () => {
  clearCart();
});

const orderElement = document.getElementById("order");

// CART END

// JANS EVENT LISTENER

const homeTag = document.querySelector(".home");
const homeElement = document.getElementById("game");

document.addEventListener("click", (e) => {
  const targetClassList = e.target.classList;

  if (targetClassList.contains("home")) {
    openMenuCategory(homeElement, homeTag);
  } else if (targetClassList.contains("fritten")) {
    openMenuCategory(frittenElement, frittenTag);
  } else if (targetClassList.contains("snacks")) {
    openMenuCategory(snacksElement, snacksTag);
  } else if (targetClassList.contains("drinks")) {
    openMenuCategory(drinksElement, drinksTag);
  } else if (targetClassList.contains("order-btn")) {
    openMenuCategory(orderElement, cartIcon);
  }
});

function openMenuCategory(menuElement, menuTag) {
  const categories = [
    homeElement,
    frittenElement,
    snacksElement,
    drinksElement,
    orderElement,
  ];
  const tags = [homeTag, frittenTag, snacksTag, drinksTag, cartIcon];

  for (const category of categories) {
    if (category === homeElement) {
      category.style.display = category === menuElement ? "block" : "none";
    } else {
      category.style.display = category === menuElement ? "flex" : "none";
    }
  }

  for (const tag of tags) {
    tag.style.color = tag === menuTag ? "yellow" : "white";
  }
}

// JANS EVENT LISTENER END

// NICKNAME
const nickname = document.querySelector("#nickname");
const nicknameImage = document.querySelector("#nickname-image");
const button = document.querySelector(".order-btn");

button.addEventListener("click", () => {
  generateNickname(nickname, nicknameImage);
});
// NICKNAME END

// FINAL ORDER
const finalOrder = document.querySelector("#final-order");

document.querySelector("#order-button").addEventListener("click", () => {
  cart.classList.add("cart-hidden");
  finalOrder.appendChild(cartItemsList);
  finalOrder.appendChild(cartTotalElement);
  cartIcon.style.pointerEvents = "none";
});

// FINAL ORDER END
