import dotenv from "dotenv";
dotenv.config();

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  SlashCommandBuilder
} from "discord.js";
import createMapEmbed from "../discord/embeds/mapEmbed.js";

export default {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("show a tarkov map")
    .addStringOption((Option) =>
      Option.setName("map").setDescription("location").setRequired(true)
    ),

  async response(interaction: ChatInputCommandInteraction) {
    if (!interaction.options.get("map")) return;

    const map = interaction.options.get("map");
    let fileURL: string;
    console.log("///// MAP /////");
    console.log(map?.value);

    switch (map?.value) {
      case "woods":
        interaction.reply(
          createMapEmbed(
            "https://static.wikia.nocookie.net/escapefromtarkov_gamepedia/images/0/05/Glory4lyfeWoods_map_v4_marked.png"
          )
        );
        break;

      default:
        break;
    }

    const deleteBtn = new ButtonBuilder()
      .setCustomId("delete-map")
      .setStyle(ButtonStyle.Danger)
      .setLabel(`Remove map`);

    const row = new ActionRowBuilder().addComponents(deleteBtn);

    await interaction.reply({
      components: [row]
    });
  }
};
