import dotenv from "dotenv";
dotenv.config();
import { client } from "./main.ts";
import { getConnectionEmbed } from "./event_embeds/connection-embed.ts";
import { getGamemodeEmbed } from "./event_embeds/gamemode-embeds.ts";
import { getServerStatusEmbed } from "./event_embeds/serverstatus-embed.ts";
export function handleEvent(gameEvent) {
  if (!process.env.DISCORD_LOG_CHANNEL_ID)
    throw new Error("No log channel id in local enviroment");
  if (!process.env.DISCORD_CHAT_CHANNEL_ID)
    throw new Error("No chat channel id in local enviroment");
  const logChannel = client.channels.cache.get(
    process.env.DISCORD_LOG_CHANNEL_ID
  );
  const chatChannel = client.channels.cache.get(
    process.env.DISCORD_CHAT_CHANNEL_ID
  );
  if (!logChannel || !logChannel.isSendable())
    throw new Error("Invalid Channel");
  console.log(gameEvent);
  switch (gameEvent.event) {
    case "ServerStart":
      logChannel.send(getServerStatusEmbed(gameEvent, "start"));
      break;
    case "ServerStop":
      logChannel.send(getServerStatusEmbed(gameEvent, "stop"));
      break;
    case "PlayerJoinEvent":
      logChannel.send(getConnectionEmbed(gameEvent));
      break;
    case "PlayerQuitEvent":
      logChannel.send(getConnectionEmbed(gameEvent));
      break;
    case "PlayerGameModeChangeEvent":
      logChannel.send(getGamemodeEmbed(gameEvent));
      break;

    default:
      break;
  }
}
