import dotenv from "dotenv";
dotenv.config();
import {
  Client,
  GatewayIntentBits,
  Guild,
  messageLink,
  TextChannel,
} from "discord.js";
import { commands } from "./commands/commands.ts";

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
