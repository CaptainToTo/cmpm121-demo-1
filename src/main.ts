import "./style.css";
import { Canvas } from "./canvas.ts";
import { Fruit } from "./fruit.ts";
import { Juice } from "./juice.ts";

const originalFontSize: number = 10;
const smallestFontSize: number = 4;
let curFontSize: number = originalFontSize;

const maxJuiceHeight: number = 500;

let pricePerUnit: number = 5;
let cupVolume: number = 30;

// let autoClickSpeed: number = -1;
// let autoClicker: number;

// let hitPerClick: number = 1;

// let upgradeProgress: number = 0;

function getNewFruit(): Fruit {
  return new Fruit();
}

function getNewJuice(): Juice {
  return new Juice(cupVolume);
}

let fr: Fruit = getNewFruit();
let jc: Juice = getNewJuice();
let money: number = 0;

const canvas = Canvas.buildCanvas(window.innerWidth, window.innerHeight)
  .buildMoney(500, 150)
  .buildButton(100, 150, () => {
    updateJuicing();
  })
  .setButtonContent(fr.getChar())
  .setButtonSize(10)
  .buildCup(100, 400, 300, maxJuiceHeight)
  .setCupHeight(0);

function updateFruit(): any {
  fr.hit();
  curFontSize -= (originalFontSize - smallestFontSize) / fr.getOriginalHealth();

  if (fr.isCrushed()) {
    fr = getNewFruit();
    canvas.setButtonContent(fr.getChar());
    curFontSize = originalFontSize;
  }
  canvas.setButtonSize(curFontSize);
}

function updateJuice(): any {
  jc.addJuice(fr.getColor());

  if (jc.isFull()) {
    money += jc.getPrice(pricePerUnit);
    canvas.setMoney("$" + money);
    jc = getNewJuice();
  }

  canvas.setCupColor(jc.getColorStyle());
  canvas.setCupHeight(jc.getFillAmount());
}

function updateJuicing(): any {
  updateJuice();
  updateFruit();
}

const gameName = "Juice Juice";

document.title = gameName;
