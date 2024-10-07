import { ActionRowBuilder, ButtonBuilder } from "discord.js";

const test = new ButtonBuilder()
.setLabel('REPO')
.setStyle(5)
.setURL('https://github.com/ATlexEide/discordbot')


export const myActionRow = new ActionRowBuilder().addComponents([test])
