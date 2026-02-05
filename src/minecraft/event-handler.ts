import dotenv from "dotenv";
dotenv.config();
import { client, db } from "../main.js";
import { getConnectionEmbed } from "./event_embeds/connection-embed.js";
import { getGamemodeEmbed } from "./event_embeds/gamemode-embeds.js";
import { getServerStatusEmbed } from "./event_embeds/serverstatus-embed.js";
import { getChatEmbed } from "./event_embeds/chat-embed.js";

export function handleEvent(gameData: any) {
  db.query(
    `SELECT chat_channel_id FROM guilds WHERE guildId = ${gameData.guild_id}`,
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      // @ts-expect-error
      if (!res[0]) {
        console.error(
          `couldnt find chat channel for guild id ${gameData.guild_id}`
        );
      }
      // @ts-expect-error
      console.log(res[0].chat_channel_id);
      // @ts-expect-error
      client.channels.cache
        // @ts-expect-error
        .get(res[0].chat_channel_id)
        // @ts-expect-error
        .send(getChatEmbed(gameData));
    }
  );

  // if (
  //   !logChannel ||
  //   !chatChannel ||
  //   !logChannel.isSendable() ||
  //   !chatChannel.isSendable()
  // )
  //   throw new Error("Invalid Channel");
  // switch (gameData.event) {
  //   case "ServerStart":
  //     serverStatus = ServerStatus[0];
  //     logChannel.send(getServerStatusEmbed(gameData));
  //     break;

  //   case "ServerStop":
  //     serverStatus = gameData;
  //     logChannel.send(getServerStatusEmbed(gameData));
  //     break;

  //   case "ChatEvent":
  //     chatChannel.send(getChatEmbed(gameData));
  //     break;

  //   case "PlayerJoinEvent":
  //     logChannel.send(getConnectionEmbed(gameData));
  //     break;

  //   case "PlayerQuitEvent":
  //     logChannel.send(getConnectionEmbed(gameData));
  //     break;

  //   case "PlayerGameModeChangeEvent":
  //     logChannel.send(getGamemodeEmbed(gameData));
  //     break;

  //   default:
  //     break;
  // }
}
