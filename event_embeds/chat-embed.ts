import { EmbedBuilder } from "@discordjs/builders";

export function getChatEmbed(event) {
  const date = new Date();
  const hours = date.getHours();
  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  console.log(`${hours}:${minutes}`);
  const chatEmbed = new EmbedBuilder().setAuthor({
    name: `[${hours}:${minutes}]  <${event.player}>  ${event.message}`,
    iconURL: `https://minotar.net/avatar/${event.player}.png`,
  });
  /// Keep just in case i decide to use it later for whatever reason
  // return { embeds: [chatEmbed] };
  return `[${hours}:${minutes}]  <\\${event.player}>  ${event.message}`;
}
