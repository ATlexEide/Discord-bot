import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonComponent,
  ButtonStyle,
  Component,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { projects } from "../projects/projects.ts";

export async function createProjectButtons(proj: object) {
  const deleteButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Danger)
    .setLabel("Remove")
    .setCustomId("remove-proj-message");

  let response;
  const repoButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Link)
    .setLabel(`Repo`)
    .setURL(proj.repoURL);

  if (proj.previewURL !== "") {
    const previewLinkButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setLabel(`Live Preview`)
      .setURL(proj.previewURL);
    response = new ActionRowBuilder().addComponents([
      repoButton,
      previewLinkButton,
      deleteButton,
    ]);
    return response;
  }
  response = new ActionRowBuilder().addComponents([repoButton, deleteButton]);
  return response;
}

const select = new StringSelectMenuBuilder()
  .setCustomId("projects")
  .setPlaceholder("Project list");
projects.forEach((project) => {
  select.addOptions(
    new StringSelectMenuOptionBuilder()
      .setLabel(project.projectName)
      .setValue(project.id)
      .setDescription(project.projectDesc)
  );
});
export const projectList = new ActionRowBuilder().addComponents([select]);
