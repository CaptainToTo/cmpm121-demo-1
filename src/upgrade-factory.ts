import { Upgrade } from "./upgrade.ts";

export class UpgradeFactory {
  static buildBlender(): Upgrade {
    return (
      Upgrade.buildUpgrade("Blender")
        //.setDesc("No need to squeeze!")
        .setMaxLevel(5)
        .setPrice(500)
        .setPriceStep(100)
    );
  }

  static buildBiggerCups(): Upgrade {
    return (
      Upgrade.buildUpgrade("Bigger Cups")
        //.setDesc("More juice, more money!")
        .setMaxLevel(10)
        .setPrice(800)
        .setPriceStep(300)
    );
  }

  static buildEmployees(): Upgrade {
    return (
      Upgrade.buildUpgrade("Employees")
        //.setDesc("More hands on deck!")
        .setMaxLevel(15)
        .setPrice(700)
        .setPriceStep(700)
    );
  }

  static buildInvestments(): Upgrade {
    return (
      Upgrade.buildUpgrade("Off Shore Investments?")
        //.setDesc("We're just a juicing company!")
        .setMaxLevel(30)
        .setPrice(3000)
        .setPriceStep(1000)
    );
  }

  static buildUnionBusting(): Upgrade {
    return (
      Upgrade.buildUpgrade("Union Busting Campaign")
        //.setDesc("Management knows best!")
        .setMaxLevel(8)
        .setPrice(2000)
        .setPriceStep(600)
    );
  }
}
