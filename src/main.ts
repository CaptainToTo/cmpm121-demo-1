import "./style.css";
import { Canvas } from "./canvas.ts";
import { Fruit } from "./fruit.ts";
import { Juice } from "./juice.ts";
import { Upgrade } from "./upgrade.ts";
import { UpgradeFactory } from "./upgrade-factory.ts";

const originalFontSize: number = 10;
const smallestFontSize: number = 4;
let curFontSize: number = originalFontSize;

const maxJuiceHeight: number = 500;

let pricePerUnit: number = 5;
let cupVolume: number = 30;

let autoClickSpeed: number = -1;
let autoClicker: number;

let hitPerClick: number = 1;

let upgradeProgress: number = 0;

function getNewFruit(): Fruit {
  return new Fruit();
}

function getNewJuice(): Juice {
  return new Juice(cupVolume);
}

let fr: Fruit = getNewFruit();
let jc: Juice = getNewJuice();
let money: number = 0;

const autoClick: Upgrade = UpgradeFactory.buildBlender().setAction(() => {
  if (autoClickSpeed == -1) {
    autoClickSpeed = 500;
  } else {
    autoClickSpeed -= 100;
  }
  clearInterval(autoClicker);
  autoClicker = setInterval(updateJuicing, autoClickSpeed);
});
const biggerCups: Upgrade = UpgradeFactory.buildBiggerCups().setAction(() => {
  pricePerUnit += 5;
  cupVolume += 5;
});
const employees: Upgrade = UpgradeFactory.buildEmployees().setAction(() => {
  hitPerClick += 1;
});

const canvas = Canvas.buildCanvas(window.innerWidth, window.innerHeight)
  .buildMoney(500, 150)
  .buildButton(100, 150, () => {
    for (let i = 0; i < hitPerClick; i++) {
      updateJuicing();
    }
  })
  .setButtonContent(fr.getChar())
  .setButtonSize(10)
  .buildCup(100, 400, 300, maxJuiceHeight)
  .setCupHeight(0);

canvas
  .setUpgradesOffset(500, 300)
  .addUpgrade(autoClick.name, () => {
    buyUpgrade(autoClick, canvas);
  })
  .setUpgradeContent(autoClick.name, autoClick.toString());

let curCheckpoint: number = 0;
const checkpoints: { upgrade: Upgrade; checkpoint: number }[] = [
  { upgrade: biggerCups, checkpoint: 2 },
  { upgrade: employees, checkpoint: 5 },
  //{ upgrade: investments, checkpoint: 8 },
  //{ upgrade: unionBusting, checkpoint: 10 },
];

function buyUpgrade(upgrade: Upgrade, canvas: Canvas) {
  if (money >= upgrade.getPrice() && !upgrade.isAtMax()) {
    money -= upgrade.getPrice();
    canvas.setMoney("$" + money);
    upgrade.buy();
    upgrade.doAction();
    upgrade.increasePrice(upgrade.getPriceStep());
    canvas.setUpgradeContent(upgrade.name, upgrade.toString());
    upgradeProgress++;
    checkUpgradeProgress();
  }
}

function checkUpgradeProgress() {
  if (upgradeProgress >= checkpoints[curCheckpoint].checkpoint) {
    const upgrade = checkpoints[curCheckpoint].upgrade;

    canvas
      .addUpgrade(upgrade.name, () => {
        buyUpgrade(upgrade, canvas);
      })
      .setUpgradeContent(upgrade.name, upgrade.toString());
    curCheckpoint++;
  }
}

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
