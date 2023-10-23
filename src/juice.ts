export class Juice {
  max: number;
  juices: number[];

  constructor(max: number) {
    this.max = max;
    this.juices = [];
  }

  getColorStyle(): string {
    let avgColor: number = 0;
    this.juices.forEach((juice) => {
      avgColor += juice;
    });
    avgColor /= this.juices.length;
    return "#" + Math.floor(avgColor).toString(16);
  }

  addJuice(newJuice: number) {
    this.juices.push(newJuice);
  }

  isFull(): boolean {
    return this.juices.length >= this.max;
  }

  getPrice(pricePerUnit: number): number {
    return this.juices.length * pricePerUnit;
  }

  getFillAmount(): number {
    return this.juices.length / this.max;
  }
}
