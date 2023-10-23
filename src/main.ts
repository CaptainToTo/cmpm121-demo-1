import "./style.css";
import { Canvas } from "./canvas.ts";

const canvas = Canvas.buildCanvas(window.innerWidth, window.innerHeight)
  .buildButton(100, 150, () => {
    console.log("clicked");
  })
  .setButtonContent("Click Me!");

console.log(canvas.height);

const gameName = "Juice Juice";

document.title = gameName;
