import { EmbedBuilder } from "@discordjs/builders";

export function getChatEmbed(event) {
  const chatEmbed = new EmbedBuilder().setAuthor({
    name: `<${event.player}> ${event.messsage}`,
    iconURL: `https://minotar.net/avatar/${event.player}.png`,
  });
  //   return { embeds: [chatEmbed] };
  return `<\\${event.player}>  ${event.messsage}`;
}
