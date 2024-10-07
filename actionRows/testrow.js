import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Component, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";

export async function createProjectButtons(proj){
    let cont;
    const repoButton = new ButtonBuilder()
    .setURL(proj.repoURL)
    .setLabel(`Repo`)
    .setStyle(ButtonStyle.Link)
if(proj.previewURL !== ""){
    const previewLinkButton = new ButtonBuilder()
    .setURL(proj.previewURL)
    .setLabel(`Live Preview`)
    .setStyle(ButtonStyle.Link)
    cont = new ActionRowBuilder().addComponents([repoButton,previewLinkButton])
    return cont;
}

    cont = new ActionRowBuilder().addComponents([repoButton])
    return cont;
}




const select = new StringSelectMenuBuilder()
.setCustomId('projects')
.setPlaceholder('Project list')
.addOptions(
    new StringSelectMenuOptionBuilder()
    .setLabel('Discord bot')
    .setDescription('This bot, figuring out how discord works')
    .setValue('discord-bot'),
    new StringSelectMenuOptionBuilder()
    .setLabel('Weather App')
    .setDescription('Lorem')
    .setValue('weather-app'),
    new StringSelectMenuOptionBuilder()
    .setLabel('Todo List')
    .setDescription('ipsum')
    .setValue('todo-list')
)
export const testaction = new ActionRowBuilder().addComponents([select])