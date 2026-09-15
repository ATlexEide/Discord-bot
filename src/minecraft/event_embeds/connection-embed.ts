import { EmbedBuilder } from "@discordjs/builders";
import { removeColorCode } from "./chat-embed.js";

export function getConnectionEmbed(event: any) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: removeColorCode(event.player),
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
