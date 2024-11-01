import dotenv from "dotenv";
dotenv.config();
import {
  Client,
  GatewayIntentBits,
  Guild,
  messageLink,
  TextChannel,
} from "discord.js";
import { commands } from "./commands/commands.js";

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
  if (!client.user) throw new Error("No client user");
  console.log(`Logged in as ${client.user.tag}, ready to serve!`);
});
client.on("messageCreate", (message) => {
  console.log(message);
  if (message.content !== "test") return;

  const channel = client.channels.cache.get("1293123587385069628");
  if (!channel) throw new Error("No matching channel");
  if (!(channel instanceof TextChannel))
    throw new Error("Not instance of TextChannel");
  channel.send("reply");
});
client.on("interactionCreate", async (interaction) => {
  console.log(interaction);
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
      .reply(interaction);
  }
  if (interaction.customId === "remove-proj-message") {
    interaction.message.delete();
  }
});
const regex = /.*Update/;
console.log(regex);
client.on("messageDelete", (interaction) => {
  console.log(interaction);
});
