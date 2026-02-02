import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";
import createListEmbed from "../discord/embeds/listEmbed.js";

import ping from "./ping.js";
import tarkovgod from "./tarkovgod.js";
import cat from "./cat.js";
import refresh from "./refresh.js";
import map from "./map.js";
import hiLove from "./hiLove.js";

export const help = {
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

export let cmdArr = [help, ping, tarkovgod, cat, refresh, map, hiLove];
