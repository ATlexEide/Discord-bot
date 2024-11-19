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

/////////
// Discord Bot
const client = new Client({
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
app.get("/test", (req, res) => {
  res.send("Welcome to my server/test!");
});
app.post("/events", async (req, res) => {
  console.log("Post request recieved");
  const channel = client.channels.cache.get("1293123587385069628");
  if (!channel) throw new Error("Invalid channel");
  if (req.body.event === "PlayerJoinEvent") {
    channel.send(
      `${req.body.player} joined the server!\nCurrent players online: ${req.body.playerCount}`
    );
  }
  if (req.body.event === "PlayerQuitEvent") {
    channel.send(
      `${req.body.player} left the server :(\nCurrent players online: ${req.body.playerCount}`
    );
  }
  console.log(req.body);
  res.json({ status: "OK" });
  // res.json(req.body);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
