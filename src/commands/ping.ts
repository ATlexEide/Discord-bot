import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: "pong but from new file",
      flags: MessageFlags.Ephemeral
    });
  }
};
