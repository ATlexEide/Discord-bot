import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { refreshCommands } from "../utils/update_commands.js";
import createInformationalEmbed from "../discord/embeds/informationalEmbed.js";
import { client } from "../main.js";

const name = "refresh";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Refresh commands"),

  async response(interaction: ChatInputCommandInteraction) {
    if (!interaction.guild) throw new Error("No guild found");

    const res = await refreshCommands(interaction.guild);
    console.log(
      `Updating commands for ${client.user?.displayName} in ${interaction.guild.name}`
    );
    const embed = createInformationalEmbed({
      author: interaction.guild.name,
      title: `Updating commands ...`,
      desc: `Updating commands for ${client.user?.displayName} in ${interaction.guild.name}`
    });

    await interaction.reply({
      embeds: [embed],
      flags: ["Ephemeral"]
    });

    res
      ? embed.setTitle("Commands updated") && embed.setColor(0xaaff00)
      : embed.setTitle("Failed to update commands") && embed.setColor(0xff0000);

    await interaction.editReply({ embeds: [embed] });
  }
};
