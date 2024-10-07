import dotenv from "dotenv";
dotenv.config();
import { SlashCommandBuilder } from "discord.js";
import { Client, GatewayIntentBits, Guild, messageLink } from "discord.js";
import { commands } from "./commands/commands.js";
import { createProjectButtons } from "./actionRows/testrow.js";
import { projects } from "./projects/projects.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.login(process.env.DISCORD_TOKEN);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("interactionCreate", async (interaction) => {
  const message = interaction;
  console.log(`Interaction: ${interaction}`);
  if (interaction.isChatInputCommand()) {
    const currCmd = commands.find(
      (command) => command.name === interaction.commandName
    );
    if (currCmd) {
      console.log(interaction.user);
      console.log(`Current command: ${JSON.stringify(currCmd)}`);
      console.log(`Current interaction: ${interaction}`);
      currCmd.response(interaction);
    }
  }
  if (interaction.isStringSelectMenu()) {
    commands
      .find((command) => command.name === interaction.customId)
      .reply(interaction, message);
  }
  if (interaction.customId === "remove-proj-message") {
    interaction.message.delete();
  }
});
