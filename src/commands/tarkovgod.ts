import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("tarkovgod")
    .setDescription("Who is the god of tarkov"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: "Terrox is the tarkov god" });
  }
};
