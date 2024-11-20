import { EmbedBuilder } from "@discordjs/builders";
import dotenv from "dotenv";
dotenv.config();
import { client } from "./main.ts";
export function handleEvent(gameEvent) {
  if (!process.env.DISCORD_LOG_CHANNEL_ID)
    throw new Error("No channel id in local enviroment");
  const channel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL_ID);
  if (!channel || !channel.isSendable()) throw new Error("Invalid channel");
  if (gameEvent.event === "PlayerJoinEvent") {
    channel.send(getEmbed("join", gameEvent.player, gameEvent.playerCount));
  }
  if (gameEvent.event === "PlayerQuitEvent") {
    channel.send(getEmbed("leave", gameEvent.player, gameEvent.playerCount));
  }
}

function getEmbed(event, player, playerCount) {
  const chatEmbed = new EmbedBuilder()
    .setAuthor({
      name: player,
      iconURL: `https://minotar.net/avatar/${player}.png`,
    })
    .setTitle(
      event === "join"
        ? `${player} joined the server!`
        : `${player} left the server ):`
    )
    .setDescription(`*Current players online:* ${playerCount}`);
  return { embeds: [chatEmbed] };
}
