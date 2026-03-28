import dotenv from "dotenv";
dotenv.config();
import { client } from "../main.js";
import { getConnectionEmbed } from "./event_embeds/connection-embed.js";
import { getGamemodeEmbed } from "./event_embeds/gamemode-embeds.js";
import { getServerStatusEmbed } from "./event_embeds/serverstatus-embed.js";
import { getChatEmbed } from "./event_embeds/chat-embed.js";
import { TextChannel } from "discord.js";
import { getChannelOut } from "../utils/DB.js";

export async function handleEvent(gameData: any) {
  // try {
  //   await getChannelOut(gameData);
  //   return;
  //   // return;
  //   // if (
  //   //   !logChannel ||
  //   //   !chatChannel ||
  //   //   !logChannel.isSendable() ||
  //   //   !chatChannel.isSendable()
  //   // )
  //   //   throw new Error("Invalid Channel");
  //   if (channel)
  //     switch (gameData.event) {
  //       // case "ServerStart":
  //       //   console.log("SERVER START LOG");
  //       //   return;
  //       // // serverStatus = ServerStatus[0];
  //       // // channel.send(getServerStatusEmbed(gameData));
  //       // // break;
  //       // case "ServerStop":
  //       //   console.log("SERVER STOP LOG");
  //       //   return;
  //       // // serverStatus = gameData;
  //       // // logChannel.send(getServerStatusEmbed(gameData));
  //       // // break;
  //       case "ChatEvent":
  //         // @ts-expect-error
  //         channel.send(getChatEmbed(gameData));
  //         return;
  //       // case "PlayerJoinEvent":
  //       //   (channel as TextChannel).send(getConnectionEmbed(gameData));
  //       //   break;
  //       // case "PlayerQuitEvent":
  //       //   (channel as TextChannel).send(getConnectionEmbed(gameData));
  //       //   break;
  //       // case "PlayerGameModeChangeEvent":
  //       //   (channel as TextChannel).send(getGamemodeEmbed(gameData));
  //       //   break;
  //       default:
  //         console.log(gameData.event);
  //         return;
  //     }
  // } catch (error) {
  //   console.log(error);
  // }
}
