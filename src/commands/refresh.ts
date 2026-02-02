import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { refreshCommands } from "../utils/update_commands.js";
import createInformationalEmbed from "../discord/embeds/informationalEmbed.js";

export default {
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription("Refresh commands"),

  async response(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) throw new Error("No guild found");

    const res = await refreshCommands(interaction.guild);

    const embed = createInformationalEmbed({
      author: interaction.guild.name,
      title: "Updating commands ... "
    });

    await interaction.reply({
      embeds: [embed],
      flags: ["Ephemeral"]
    });

    res
      ? embed.setTitle("Commands updated")
      : embed.setTitle("Failed to update commands");

    await interaction.editReply({ embeds: [embed] });
  }
};
