import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("map")
    .setDescription("show a tarkov map"),

  async response(interaction: ChatInputCommandInteraction) {
    switch ("map") {
      case "map":
        // files: [{ attachment: "YourImage.jpg" }];
        break;

      default:
        break;
    }
  }
};
