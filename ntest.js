import { generateNickname } from "./data/nicknames.js";

const nickname = document.querySelector("#nickname");
const nicknameImage = document.querySelector("#nickname-image");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  generateNickname(nickname, nicknameImage);
});
