const { createWorker } = require("tesseract.js");
const screenshot = require("screenshot-desktop");
const sharp = require("sharp");
const robot = require("robotjs");

const fs = require("fs");

let keyPress = null;

robot.setKeyboardDelay(1);

let count = 0;

const program = async () => {
  let englishText;

  setTimeout(async () => {
    count++;
    await screenshot().then((img) => {
      fs.writeFileSync("./testImg.png", img);
    });

    sharp("./testImg.png")
      .extract({ left: 500, top: 275, width: 800, height: 165 })
      .toFile(`./images/newTestImg${count}.png`, function (err) {
        if (err) console.log(err);
      });

    const worker = await createWorker("eng");

    (async () => {
      const {
        data: { text },
      } = await worker.recognize(`./images/newTestImg${count}.png`);
      // console.log(text);
      englishText = text;
      await worker.terminate();
    })();

    setTimeout(async () => {
      if (
        englishText.includes("you can") &&
        !englishText.includes("you cannot")
      ) {
        robot.typeStringDelayed("se puede", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("you cannot")) {
        robot.typeStringDelayed("no se puede", 2000);
        robot.keyTap("enter");
      } else if (
        englishText.includes("where I live") ||
        englishText.includes("where l live")
      ) {
        robot.typeStringDelayed("donde vivo", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("there is a lot to do / to see")) {
        robot.typeStringDelayed("hay mucho que hacer / ver", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("there is nothing to do / to see")) {
        robot.typeStringDelayed("no hay nada que hacer / ver", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to do jogging")) {
        robot.typeStringDelayed("hacer footing", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to go swimming")) {
        robot.typeStringDelayed("hacer natacion", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to go hiking")) {
        robot.typeStringDelayed("hacer senderismo", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to play football")) {
        robot.typeStringDelayed("jugar al futbol", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to see a film in the cinema")) {
        robot.typeStringDelayed("ver una pelicula en el cine", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to visit the castle")) {
        robot.typeStringDelayed("visitar el castillo", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to visit the art gallery")) {
        robot.typeStringDelayed("visitar la galeria de arte", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("to visit the museum")) {
        robot.typeStringDelayed("visitar el museo", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("in the woods")) {
        robot.typeStringDelayed("en el bosque", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("in the town centre")) {
        robot.typeStringDelayed("en el centro", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("in the park")) {
        robot.typeStringDelayed("en el parque", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("in the old town")) {
        robot.typeStringDelayed("en el casco antiguo", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("in the shopping district")) {
        robot.typeStringDelayed("en la zona comercial", 2000);
        robot.keyTap("enter");
      } else if (englishText.includes("in the town square")) {
        robot.typeStringDelayed("en la plaza mayor", 2000);
        robot.keyTap("enter");
      } else {
        keyPress = true;
      }
      if (!keyPress) {
        program();
      }
    }, 500);
  }, 1500);
};

setTimeout(() => {
  program();
}, 5000);
