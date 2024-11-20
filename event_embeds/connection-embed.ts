import { EmbedBuilder } from "@discordjs/builders";

export function getConnectionEmbed(event) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: event.player,
      iconURL: `https://minotar.net/avatar/${event.player}.png`,
    })
    .setTitle(event === "join" ? `joined the server!` : `left the server ):`)
    .setDescription(`*Current players online:* ${event.playerCount}`);
  return { embeds: [chatEmbed] };
}
