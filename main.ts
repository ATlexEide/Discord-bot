import express from "express";
import dotenv from "dotenv";
dotenv.config();
import {
  channelLink,
  Client,
  GatewayIntentBits,
  Guild,
  messageLink,
  TextChannel,
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
    GatewayIntentBits.MessageContent,
  ],
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
  console.log(interaction.isCommand());
  console.log(interaction);
  if (interaction.isCommand()) {
    const id = interaction.commandName;
    console.log("ID //");
    console.log(id);
    const cmd = commands[interaction.commandName];
    console.log("CMD //");
    console.log(cmd);
    cmd.response(interaction);
  }
  // If interaction is on a select menu
  if (interaction.isStringSelectMenu()) {
    console.log("MENU INTERACTION //");
    console.log(interaction);
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
app.get("/", (req, res) => {
  res.send("Welcome to my server!");
});
app.get("/events/last", (req, res) => {
  res.send(lastEvent);
});
app.get("/server/status", (req, res) => {
  res.send(serverStatus);
});
app.post("/events", async (req, res) => {
  const event = await req.body;
  handleEvent(event);
  console.log("Post request recieved");
  console.log(req.body);
  res.json({ status: "OK" });
});
if (!process.env.DISCORD_CHAT_CHANNEL_ID)
  throw new Error("No chat channel id in local enviroment");

client.on("messageCreate", async (message) => {
  if (message.channelId === process.env.DISCORD_CHAT_CHANNEL_ID) {
    const messageObj = {
      user: message.author.username,
      message: message.content,
    };
    const messageJson = JSON.stringify(messageObj);
    console.log(messageJson);
    app.post("/server/chat", (req, res) => {
      res.send(messageJson);
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
