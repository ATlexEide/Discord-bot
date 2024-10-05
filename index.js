import dotenv from 'dotenv'
dotenv.config()
import { REST, Routes } from 'discord.js';
import { SlashCommandBuilder } from 'discord.js';
import { Client, GatewayIntentBits, Guild, messageLink } from 'discord.js';
import {commands} from './commands.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
    ],
});
client.login(process.env.DISCORD_TOKEN)



const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);


try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1248660696535924858"),{ body: commands });

  console.log('Successfully reloaded application (/) commands.');
  console.log(commands)
} catch (error) {
  console.error(error);
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  // console.log(interaction)
  // console.log(interaction.commandName)
  if (!interaction.isChatInputCommand()) return;

  const currCmd = commands.find(command => command.name === interaction.commandName)
    if (currCmd) {
      console.log(interaction.user)
      console.log(`Current command: ${JSON.stringify(currCmd)}`);
      console.log(`Current interaction: ${interaction}`);
      currCmd.response(interaction);
  }
});