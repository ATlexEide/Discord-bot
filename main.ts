import express from "express";
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
import { commands } from "./commands/commands.ts";
import { handleEvent, lastEvent, serverStatus } from "./event-handler.ts";

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
client.on("ready", () => {
  if (!client.user) throw new Error("No client user");
  console.log(`Logged in as ${client.user.tag}, ready to serve!`);
});

//////
// Listen for interactions
client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    const id = interaction.commandName;
    const cmd = commands[interaction.commandName];
    cmd.response(interaction);
  }

  // If interaction is on a select menu
  if (interaction.isStringSelectMenu()) {
    commands[interaction.customId].menuResponse(interaction);
  }

  // If interaction is on a button
  if (interaction.isButton()) {
    const id = interaction.customId;
    if (id === "remove-proj-message") {
      interaction.message.delete();
    }
  }
});

////////
// Node Server
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req: any, res: any) => {
  res.send("Welcome to my server!");
});

app.get("/events/last", (req: any, res: any) => {
  res.send(lastEvent);
});

app.get("/server/status", (req: any, res: any) => {
  res.send(serverStatus);
});

app.post("/events", async (req: any, res: any) => {
  console.clear();
  console.log(req.body);
  const event = await req.body;
  handleEvent(event);
  console.log("Request recieved");
  console.log(event);
  res.json({ status: "OK" });
});

if (!process.env.DISCORD_CHAT_CHANNEL_ID)
  throw new Error("No chat channel id in local enviroment");

let payload;
client.on("messageCreate", async (message) => {
  console.log(message);

  if (message.channelId === process.env.DISCORD_CHAT_CHANNEL_ID) {
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
