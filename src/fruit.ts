const fruitOptions = [
  { char: "🍈", color: 0x9bff69, hits: 20 },
  { char: "🍓", color: 0xf9627b, hits: 10 },
  { char: "🥝", color: 0xcbec90, hits: 10 },
  { char: "🥭", color: 0xffa23e, hits: 14 },
  { char: "🍋", color: 0xf2ff5c, hits: 12 },
  { char: "🍑", color: 0xffc9ac, hits: 10 },
  { char: "🍊", color: 0xff940b, hits: 12 },
  { char: "🍉", color: 0xff4d4d, hits: 20 },
  { char: "🍒", color: 0xf10000, hits: 6 },
  { char: "🍏", color: 0xb9ffa0, hits: 8 },
  { char: "🍇", color: 0xdc3ce9, hits: 16 },
  { char: "🍌", color: 0xf2e28d, hits: 8 },
  { char: "🍎", color: 0xff6565, hits: 8 },
];

export class Fruit {
  char: string;
  color: number;
  health: number;
  fullHealth: number;
  constructor() {
    const i: number = Math.floor(Math.random() * fruitOptions.length);
    this.char = fruitOptions[i].char;
    this.color = fruitOptions[i].color;
    this.health = fruitOptions[i].hits;
    this.fullHealth = this.health;
  }

  getOriginalHealth(): number {
    return this.fullHealth;
  }

  hit() {
    this.health--;
  }

  isCrushed(): boolean {
    return this.health <= 0;
  }

  getChar(): string {
    return this.char;
  }

  getColor(): number {
    return this.color;
  }

  getColorStyle(): string {
    return "#" + this.color.toString(16);
  }
}
