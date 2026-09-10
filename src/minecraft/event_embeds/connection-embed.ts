import { EmbedBuilder } from "@discordjs/builders";

export function getConnectionEmbed(event: any) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: event.player,
      iconURL: `https://mineskin.eu/avatar/${event.player_uuid}`
    })
    .setTitle(
      event.name === "PlayerJoinEvent"
        ? `Joined the server!`
        : `Left the server ):`
    )
    .setDescription(`*Current players online:* ${event.player_count}`);
  return { embeds: [chatEmbed] };
}
