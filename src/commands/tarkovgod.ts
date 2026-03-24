import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const name: string = "tarkovgod";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Who is the god of tarkov"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({ content: "Terrox is the tarkov god" });
  }
};
