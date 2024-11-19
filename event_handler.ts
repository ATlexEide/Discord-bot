import { EmbedBuilder } from "@discordjs/builders";

import { client } from "./main.ts";
export function handleEvent(gameEvent) {
  const channel = client.channels.cache.get("1293123587385069628");
  if (!channel) throw new Error("Invalid channel");
  if (gameEvent.event === "PlayerJoinEvent") {
    channel.send(getEmbed("join", gameEvent.player, gameEvent.playerCount));
  }
  if (gameEvent.event === "PlayerQuitEvent") {
    channel.send(getEmbed("leave", gameEvent.player, gameEvent.playerCount));
  }
}

function getEmbed(event, player, playerCount) {
  const chatEmbed = new EmbedBuilder()
    .setTitle(
      event === "join"
        ? `${player} joined the server!`
        : `${player} left the server ):`
    )
    .setDescription(`*Current players online:* ${playerCount}`);
  return { embeds: [chatEmbed] };
}
