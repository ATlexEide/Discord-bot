import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits, TextChannel } from "discord.js";
import { handleDiscordEvent } from "./discord/event-handler.js";
import { startServer } from "./API/server.js";

import ping from "./commands/ping.js";
import tarkovgod from "./commands/tarkovgod.js";
import cat from "./commands/cat.js";
import refresh from "./commands/refresh.js";
import map from "./commands/map.js";
import hiLove from "./commands/hiLove.js";
import help from "./commands/help.js";
import setchatchannel from "./commands/setchatchannel.js";
import setlogchannel from "./commands/setlogchannel.js";
import setwhitelistchannel from "./commands/setwhitelistchannel.js";
import army from "./commands/army.js";
import test from "./commands/test.js";
import testing from "./commands/testing.js";
import child from "./commands/child.js";
import mysql from "mysql2";

export let cmdArr = [
  refresh,
  test,
  testing,
  ping,
  army,
  setwhitelistchannel,
  setlogchannel,
  setchatchannel,
  help,
  hiLove,
  map,
  cat,
  tarkovgod,
  child
];

/////////
// Discord Bot
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages
  ]
});

//////
// Load bot
client.login(process.env.DISCORD_TOKEN);
client.on("clientReady", () => {
  if (!client.user) throw new Error("No client user");
  console.log(`Logged in as ${client.user.tag}, ready to serve!`);
  startServer();
});

//////
// Listen for interactions
client.on("interactionCreate", async (interaction) => {
  handleDiscordEvent(interaction);
});

// if (!process.env.DISCORD_CHAT_CHANNEL_ID)
//   throw new Error("No chat channel id in local enviroment");

client.on("messageCreate", async (message) => {
  try {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    if (message.author.bot) return;
    let payload = `${message.author.displayName} | ${message.content}`;
    db.query(
      `SELECT chat_channel_id FROM guilds WHERE guildId = ${message.guildId}`,
      (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        // @ts-expect-error
        if (!res[0]) {
          console.error(
            `couldnt find chat channel for guild id ${message.guildId}`
          );
        }
        // @ts-expect-error
        if (message.channelId === res[0].chat_channel_id) {
          return;

          fetch(`http://127.0.0.1:3001/chat`, {
            method: "POST",
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(payload)
          });
        }
      }
    );
  } catch (error: any) {
    console.log(error);
  }
});

export function globalErrorHandler(error: any) {
  try {
    console.log(error.message);
    for (const [key, val] of Object.entries(error)) {
      console.log(key, val);
    }
  } catch (error: any) {
    console.log(error);
  }
  // const channel = client.channels.cache.get("1466784440339664971");
  // // @ts-expect-error
  // channel.send(Object.keys(error) ? error : "hmmm");
  // // @ts-expect-error
  // channel.send("yippie");
  // console.log(error);
}
