import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  messageLink
} from "discord.js";
import { globalErrorHandler } from "../main.js";

const name: string = "ping";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
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
