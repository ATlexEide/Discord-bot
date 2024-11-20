import dotenv from "dotenv";
dotenv.config();
import { client } from "./main.ts";
import { getConnectionEmbed } from "./event_embeds/connection-embed.ts";
import { getGamemodeEmbed } from "./event_embeds/gamemode-embeds.ts";

export function handleEvent(gameEvent) {
  if (!process.env.DISCORD_LOG_CHANNEL_ID)
    throw new Error("No channel id in local enviroment");
  const channel = client.channels.cache.get(process.env.DISCORD_LOG_CHANNEL_ID);
  if (!channel || !channel.isSendable()) throw new Error("Invalid channel");

  switch (gameEvent.event) {
    case "PlayerJoinEvent":
      channel.send(getConnectionEmbed(gameEvent));
      break;
    case "PlayerQuitEvent":
      channel.send(getConnectionEmbed(gameEvent));
      break;
    case "PlayerGameModeChangeEvent":
      channel.send(getGamemodeEmbed(gameEvent));
      break;

    default:
      break;
  }
}
