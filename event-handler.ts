import dotenv from "dotenv";
dotenv.config();
import { client } from "./main.ts";
import { getConnectionEmbed } from "./event_embeds/connection-embed.ts";

export function handleEvent(gameEvent) {
  if (!process.env.DISCORD_LOG_CHANNEL_ID)
    throw new Error("No channel id in local enviroment");
  const channel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL_ID);
  if (!channel || !channel.isSendable()) throw new Error("Invalid channel");
  if (gameEvent.event === "PlayerJoinEvent") {
    channel.send(
      getConnectionEmbed("join", gameEvent.player, gameEvent.playerCount)
    );
  }
  if (gameEvent.event === "PlayerQuitEvent") {
    channel.send(
      getConnectionEmbed("leave", gameEvent.player, gameEvent.playerCount)
    );
  }
}
