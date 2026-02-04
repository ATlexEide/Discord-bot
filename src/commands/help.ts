import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";
import createListEmbed from "../discord/embeds/listEmbed.ts";

import { cmdArr } from "../main.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lists all commands"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [createListEmbed("Commands", cmdArr)],
      flags: MessageFlags.Ephemeral
    });
  }
};
