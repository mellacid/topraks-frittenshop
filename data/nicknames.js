export const nicknames = [
  { nickname: "Daria", image: "./img/nicknames/daria.gif" },
  { nickname: "Eleven", image: "./img/nicknames/eleven.gif" },
  { nickname: "Mr. Bean", image: "./img/nicknames/mrbean.gif" },
  { nickname: "Patrick", image: "./img/nicknames/patrick.gif" },
  { nickname: "Pikachu", image: "./img/nicknames/pikachu.gif" },
  { nickname: "Sailor Moon", image: "./img/nicknames/sailormoon.gif" },
  { nickname: "Thaddäus", image: "./img/nicknames/squidward.gif" },
  { nickname: "Winnie Pooh", image: "./img/nicknames/winniepooh.gif" },
  { nickname: "Homer", image: "./img/nicknames/homer.gif" },
  { nickname: "Fry", image: "./img/nicknames/fry.gif" },
  { nickname: "Ron", image: "./img/nicknames/ron.gif" },
  { nickname: "Garfield", image: "./img/nicknames/garfield.gif" },
  { nickname: "Jerry", image: "./img/nicknames/jerry.gif" },
  { nickname: "Salem", image: "./img/nicknames/salem.gif" },
  { nickname: "Kirby", image: "./img/nicknames/kirby.gif" },
  { nickname: "Shaggy", image: "./img/nicknames/shaggy.gif" },
  { nickname: "Peter", image: "./img/nicknames/peter.gif" },
];

export function generateNickname(nickname, nicknameImage) {
  let randomIndex = Math.floor(Math.random() * nicknames.length);
  let randomNickname = nicknames[randomIndex];
  nickname.textContent = randomNickname.nickname;
  nicknameImage.src = randomNickname.image;
  nicknames.splice(randomIndex, 1);
  console.log(nicknames);
}
