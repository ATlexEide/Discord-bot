import { globalErrorHandler } from "../../main.js";

export function getChatEmbed(event: any) {
  try {
    const username = event.player;
    const date = new Date();
    const hours =
      date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return `[${hours}:${minutes}]  <${username}>  ${event.message}`;
  } catch (e) {
    globalErrorHandler(e);
  }
}
