import { EmbedBuilder } from "@discordjs/builders";

export function getChatEmbed(event) {
  const date = new Date();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  console.log(`${hours}:${minutes}`);
  const chatEmbed = new EmbedBuilder().setAuthor({
    name: `[${hours}:${minutes}]  <${event.player}>  ${event.messsage}`,
    iconURL: `https://minotar.net/avatar/${event.player}.png`,
  });
  //   return { embeds: [chatEmbed] };
  return `[${hours}:${minutes}]  <\\${event.player}>  ${event.messsage}`;
}
