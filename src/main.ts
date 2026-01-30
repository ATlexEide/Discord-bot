import dotenv from "dotenv";
dotenv.config();
import {
  channelLink,
  Client,
  GatewayIntentBits,
  Guild,
  messageLink,
  TextChannel
} from "discord.js";
import { handleDiscordEvent } from "./discord/event-handler.js";

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

//////
// Load bot
client.login(process.env.DISCORD_TOKEN);
client.on("clientReady", () => {
  if (!client.user) throw new Error("No client user");
  console.log(`Logged in as ${client.user.tag}, ready to serve!`);
});

//////
// Listen for interactions
client.on("interactionCreate", async (interaction) => {
  handleDiscordEvent(interaction);
});

if (!process.env.DISCORD_CHAT_CHANNEL_ID)
  throw new Error("No chat channel id in local enviroment");

let payload;
client.on("messageCreate", async (message) => {
  console.log(message);

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
