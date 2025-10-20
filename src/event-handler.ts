import dotenv from "dotenv";
dotenv.config();
import { client } from "./main.js";
import { getConnectionEmbed } from "./event_embeds/connection-embed.js";
import { getGamemodeEmbed } from "./event_embeds/gamemode-embeds.js";
import { getServerStatusEmbed } from "./event_embeds/serverstatus-embed.js";
import { getChatEmbed } from "./event_embeds/chat-embed.js";
export { lastEvent, serverStatus };

function cacheEvent(event: any) {
  cachedEvents.push(event);
  lastEvent = event;
}

const cachedEvents: object[] = [];
let lastEvent: any;
let serverStatus: any;
export function handleEvent(gameData: any) {
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
