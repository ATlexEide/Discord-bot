import dotenv from 'dotenv'
dotenv.config()
import { SlashCommandBuilder } from 'discord.js';
import { Client, GatewayIntentBits, Guild, messageLink } from 'discord.js';
import('./commands/utility/test.cjs')

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
client.on("messageCreate", async (message) => {
    if (!message.author.bot) {
        console.log(message.channel.roles)
        if (message.content === '!btn')
            message.channel.send({
                'content': 'test',
                'components': [
                    {
                        'type': 1,
                        'components': [
                            {
                                'type': 2,
                                'style': 5,
                                'label': 'Link',
                                'url': 'https://www.google.com',
                            }, {
                                'type': 2,
                                'label': 'test btn2',
                                'style': 1,
                                'disabled': true,
                                'custom_id': 'test_button2',
                            },
                        ],
                    }
                ],
            })
        if (message.content === 'radio check') {
            message.react('🫡');
            message.reply('lima charlie')
        };
    };
})