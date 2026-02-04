import dotenv from "dotenv";
dotenv.config();
import { Client, GatewayIntentBits } from "discord.js";
import { handleDiscordEvent } from "./discord/event-handler.ts";
import { startServer } from "./server.ts";

import ping from "./commands/ping.js";
import tarkovgod from "./commands/tarkovgod.js";
import cat from "./commands/cat.js";
import refresh from "./commands/refresh.js";
import map from "./commands/map.js";
import hiLove from "./commands/hiLove.js";
import help from "./commands/help.js";

export let cmdArr = [help, ping, tarkovgod, cat, refresh, map, hiLove];

/////////
// Discord Bot
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

const testdata = {};

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

export let commands: any = {};
for (let i = 0; i < cmdArr.length; i++) {
  commands[cmdArr[i].data.name] = cmdArr[i];
}

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
