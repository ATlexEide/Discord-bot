import { globalErrorHandler } from "../../main.js";

export function getChatFormat(event: any): string {
  let formatted = "";
  try {
    const username = event.player;
    const date = new Date();
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    formatted = `[${hours}:${minutes}]  <${removeColorCode(username)}>  ${
      event.message
    }`;
    return formatted;
  } catch (e) {
    globalErrorHandler(e);
  }
  return formatted;
}
function removeColorCode(name: string) {
  if (!name.includes("§")) return name;
  let regex = /§(.)/g;
  return name.replace(regex, "");
}
