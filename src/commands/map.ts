import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("show a tarkov map")
    .addStringOption((Option) =>
      Option.setName("map").setDescription("which map").setRequired(true)
    ),

  async response(interaction: ChatInputCommandInteraction) {
    if (!interaction.options.get("map")) return;

    const map = interaction.options.get("map");
    let fileURL: string;
    console.log("///// MAP /////");
    console.log(map?.value);
    switch (map?.value) {
      case "woods":
        fileURL = "./dist/assets/images/woods.png";
        interaction.reply({
          files: [{ attachment: fileURL }]
        });
        break;

      default:
        break;
    }
  }
};
