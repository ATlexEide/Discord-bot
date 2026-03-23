import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  messageLink
} from "discord.js";
import { globalErrorHandler } from "../main.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async response(interaction: ChatInputCommandInteraction) {
    try {
      throw new Error("test error");

      interaction.reply({
        content: "pong but from new file",
        flags: MessageFlags.Ephemeral
      });
    } catch (error: any) {
      globalErrorHandler(error);
    }
  }
};
