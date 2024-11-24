import dotenv from "dotenv";
dotenv.config();
import { client } from "./main.ts";
import { getConnectionEmbed } from "./event_embeds/connection-embed.ts";
import { getGamemodeEmbed } from "./event_embeds/gamemode-embeds.ts";
import { getServerStatusEmbed } from "./event_embeds/serverstatus-embed.ts";
import { getChatEmbed } from "./event_embeds/chat-embed.ts";
export { lastEvent, serverStatus };

function cacheEvent(event) {
  cachedEvents.push(event);
  lastEvent = event;
}

const cachedEvents: object[] = [];
let lastEvent;
let serverStatus;
export function handleEvent(gameData) {
  cacheEvent(gameData);
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
  if (
    !logChannel ||
    !chatChannel ||
    !logChannel.isSendable() ||
    !chatChannel.isSendable()
  )
    throw new Error("Invalid Channel");
  switch (gameData.event) {
    case "ServerStart":
      serverStatus = gameData;
      logChannel.send(getServerStatusEmbed(gameData));
      break;
    case "ServerStop":
      serverStatus = gameData;
      logChannel.send(getServerStatusEmbed(gameData));
      break;
    case "ChatEvent":
      chatChannel.send(getChatEmbed(gameData));
      break;
    case "PlayerJoinEvent":
      logChannel.send(getConnectionEmbed(gameData));
      break;
    case "PlayerQuitEvent":
      logChannel.send(getConnectionEmbed(gameData));
      break;
    case "PlayerGameModeChangeEvent":
      logChannel.send(getGamemodeEmbed(gameData));
      break;

    default:
      break;
  }
}
