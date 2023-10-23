export class Upgrade {
  name: string;
  desc: string;
  level: number;
  maxLevel: number;
  price: number;
  priceStep: number;
  action: (() => any) | null;

  constructor(name: string) {
    this.name = name;
    this.desc = "";
    this.level = 0;
    this.maxLevel = 0;
    this.price = 0;
    this.priceStep = 0;
    this.action = null;
  }

  static buildUpgrade(name: string): Upgrade {
    return new Upgrade(name);
  }

  setDesc(desc: string): Upgrade {
    this.desc = desc;
    return this;
  }

  setMaxLevel(maxLevel: number): Upgrade {
    this.maxLevel = maxLevel;
    return this;
  }

  setPrice(price: number): Upgrade {
    this.price = price;
    return this;
  }

  setPriceStep(step: number): Upgrade {
    this.priceStep = step;
    return this;
  }

  setAction(action: () => any): Upgrade {
    this.action = action;
    return this;
  }

  buy() {
    if (this.level >= this.maxLevel) return;
    this.level++;
  }

  getLevel(): number {
    return this.level;
  }

  getPriceStep(): number {
    return this.priceStep;
  }

  isAtMax(): boolean {
    return this.level >= this.maxLevel;
  }

  getPrice(): number {
    return this.price;
  }

  increasePrice(amount: number): void {
    this.price += amount;
  }

  doAction() {
    if (this.action) {
      this.action();
    }
  }

  toString(): string {
    let content: string = "";
    if (this.isAtMax()) {
      content = `${this.name} Max Lvl<br>${this.desc}`;
    } else {
      content = `${this.name} Lvl ${this.level}: $${this.price}<br>${this.desc}`;
    }
    return content;
  }
}
