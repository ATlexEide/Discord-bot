import dotenv from 'dotenv'
dotenv.config()
import { SlashCommandBuilder } from 'discord.js';
import { Client, GatewayIntentBits, Guild, messageLink } from 'discord.js';

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
    if (!message?.author.bot) {
        if (message.content === '!btn')
            message.channel.send({
                'content': 'test',
                'components': [
                    {
                        'type': 1,
                        'components': [
                            {
                                'type': 2,
                                'label': 'test btn',
                                'style': 1,
                                'custom_id': 'test_button',
                            }, {
                                'type': 2,
                                'label': 'test btn2',
                                'style': 2,
                                'custom_id': 'test_button2',
                            }, {
                                'type': 2,
                                'label': 'test btn3',
                                'style': 3,
                                'custom_id': 'test_button3',
                            }
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


const data = new SlashCommandBuilder()
    .setName('echo')
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back'));