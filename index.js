import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits, messageLink } from 'discord.js';
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
    ],
});

client.login(process.env.DISCORD_TOKEN)
console.log(message)
client.on("messageCreate", async (message) => {
    message.author.send('Copy that')
})