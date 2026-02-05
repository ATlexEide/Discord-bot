import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits } from "discord.js";
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

export let cmdArr = [
  { name: "help", command: help },
  { name: "ping", command: ping },
  { name: "tarkovgod", command: tarkovgod },
  { name: "cat", command: cat },
  { name: "refresh", command: refresh },
  { name: "map", command: map },
  { name: "hiLove", command: hiLove },
  { name: "setchatchannel", command: setchatchannel },
  { name: "setlogchannel", command: setlogchannel },
  { name: "setwhitelistchannel", command: setwhitelistchannel }
];

// Source - https://stackoverflow.com/a/5818884
// Posted by mak, modified by community. See post 'Timeline' for change history
// Retrieved 2026-02-05, License - CC BY-SA 3.0

import mysql from "mysql2";

export const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

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

let payload;
client.on("messageCreate", async (message) => {
  if (message.content === "!setLog") {
    // setLogChannelId(message.channelId);
    message.reply("Set this as the server log channel");
  }
  if (
    message.channelId === process.env.DISCORD_CHAT_CHANNEL_ID &&
    message.author.id !== process.env.BOT_ID
  ) {
    console.log(message.author.id);
    payload = `DISCORD <${message.author.username}> ${message.content}`;

    fetch(`http://127.0.0.1:3001/chat`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify(payload)
    });
  }
});
