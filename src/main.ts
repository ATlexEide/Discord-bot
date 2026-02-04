import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits } from "discord.js";
import { handleDiscordEvent } from "./discord/event-handler.ts";
import { startServer } from "./server.ts";

import ping from "./commands/ping.ts";
import tarkovgod from "./commands/tarkovgod.ts";
import cat from "./commands/cat.ts";
import refresh from "./commands/refresh.ts";
import map from "./commands/map.ts";
import hiLove from "./commands/hiLove.ts";
import help from "./commands/help.ts";

import test from "./commands/test.ts";

export let cmdArr = [
  { name: "help", command: help },
  { name: "ping", command: ping },
  { name: "tarkovgod", command: tarkovgod },
  { name: "cat", command: cat },
  { name: "refresh", command: refresh },
  { name: "map", command: map },
  { name: "hiLove", command: hiLove }
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

let payload;
client.on("messageCreate", async (message) => {
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
