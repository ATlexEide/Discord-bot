import { EmbedBuilder } from "@discordjs/builders";

export function getConnectionEmbed(event, player, playerCount) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: player,
      iconURL: `https://minotar.net/avatar/${player}.png`,
    })
    .setTitle(event === "join" ? `joined the server!` : `left the server ):`)
    .setDescription(`*Current players online:* ${playerCount}`);
  return { embeds: [chatEmbed] };
}
