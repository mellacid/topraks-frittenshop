import { fritten } from "./data/fritten.js";
import { checkHit, jump } from "./functionality/game.js";
import { snacks } from "./data/snacks.js";
import { drinks } from "./data/drinks.js";

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
    //game.style.display = "block";
    frittenTag.style.display = "none";
  }
});

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

const snacksTag = document.getElementById("snacks");

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("snacks") &&
    window.getComputedStyle(snacksElement).getPropertyValue("display") ===
      "none"
  ) {
    game.style.display = "none";
    snacksTag.style.display = "flex";
  } else {
    snacksTag.style.display = "none";
  }
});

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

const drinksTag = document.getElementById("drinks");

document.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("drinks") &&
    window.getComputedStyle(drinksElement).getPropertyValue("display") ===
      "none"
  ) {
    game.style.display = "none";
    drinksTag.style.display = "flex";
    console.log("drinks");
  } else {
    drinksTag.style.display = "none";
  }
});

// DRINKS END

// CART

/*document.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-item")) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const image = document.createElement("img");
    image.classList.add("cart-image");
    image.src = e.target.querySelector(".menu-image").src;
    cartItem.appendChild(image);

    const name = document.createElement("h2");
    name.classList.add("cart-name");
    name.textContent = e.target.querySelector(".menu-name").textContent;
    cartItem.appendChild(name);

    const price = document.createElement("p");
    price.classList.add("cart-price");
    price.textContent = e.target.querySelector(".menu-price").textContent;
    cartItem.appendChild(price);

    const cart = document.getElementById("cart");
    cart.appendChild(cartItem);
  }
});*/

function addToCart(item) {
  // Artikel dem Warenkorb hinzufügen
  const cartItems = document.getElementById("cart-items");
  const listItem = document.createElement("li");
  listItem.textContent = item.name + " : " + item.price + " €";
  cartItems.appendChild(listItem);

  // Gesamtpreis aktualisieren
  const cartTotal = document.getElementById("cart-total");
  cartTotal.textContent = "Gesamtpreis: " + calculateTotalPrice() + " €";
}

function calculateTotalPrice() {
  // Hier können Sie den Gesamtpreis aller Artikel im Warenkorb berechnen
  let total = 0;
  // Durch die Liste der ausgewählten Artikel im Warenkorb iterieren und den Preis addieren
  // Beispiel: for (let item of selectedItems) { total += item.price; }
  return total;
}

// Annahme: Sie haben eine Schaltfläche zum Hinzufügen von Artikeln mit der Klasse "add-to-cart"
const addToCartButtons = document.querySelectorAll(".menu-item");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Hier sollten Sie den ausgewählten Artikel identifizieren, z.B., indem Sie auf Datenattribute zugreifen.
    const item = {
      name: "Beispielartikel",
      price: 10.0,
    };
    addToCart(item);
  });
});

// CART END
