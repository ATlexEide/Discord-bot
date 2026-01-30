import { EmbedBuilder } from "@discordjs/builders";

export function getConnectionEmbed(event: any) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: event.player,
      iconURL: `https://minotar.net/avatar/${event.player}.png`
    })
    .setTitle(
      event.event === "PlayerJoinEvent"
        ? `Joined the server!`
        : `Left the server ):`
    )
    .setDescription(`*Current players online:* ${event.playerCount}`);
  return { embeds: [chatEmbed] };
}
