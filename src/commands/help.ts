import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";
import createListEmbed from "../discord/embeds/listEmbed.js";

import { cmdArr } from "../main.js";

const name: string = "help";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Lists all commands"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      embeds: [createListEmbed("Commands", cmdArr)],
      flags: MessageFlags.Ephemeral
    });
  }
};
