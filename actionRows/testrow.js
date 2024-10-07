import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Component, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { projects } from "../projects/projects.js";

export async function createProjectButtons(proj){
    let response;
    const repoButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel(`Repo`)
    .setURL(proj.repoURL);
    if(proj.previewURL !== ""){
        const previewLinkButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel(`Live Preview`)
        .setURL(proj.previewURL)
        response = new ActionRowBuilder().addComponents([repoButton,previewLinkButton])
        return response;
    }
    response = new ActionRowBuilder().addComponents([repoButton])
    return response
}




const select = new StringSelectMenuBuilder()
.setCustomId('projects')
.setPlaceholder('Project list')
projects.forEach((project) =>{
        console.log(project)
        select.addOptions(new StringSelectMenuOptionBuilder()
        .setLabel(project.projectName)
        .setValue(project.id)
        .setDescription(project.projectDesc)
    )})
export const testaction = new ActionRowBuilder().addComponents([select])