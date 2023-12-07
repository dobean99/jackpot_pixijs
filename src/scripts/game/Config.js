import { Tools } from "../system/Tools";
import { Game } from "./Game";
import { JungleRich } from "./JungleRich";

export const Config = {
  scenes: {
    Game,
    JungleRich,
  },
  loader: Tools.massiveRequire(
    require["context"]("./../../sprites/", true, /\.(mp3|png|jpe?g)$/)
  ),
  grandText: {
    text: "GRAND",
    x: 100,
    y: 100,
    color: ["#ff9600", "#ff5200"],
    fontSize: 50,
  },
};
