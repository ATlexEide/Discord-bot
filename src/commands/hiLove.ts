import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("hilove").setDescription("Hi love!"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: `${interaction.user.displayName} says hi love!\n*mwahhhh* :heart:`
    });
  }
};
