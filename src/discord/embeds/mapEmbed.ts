import { EmbedBuilder } from "@discordjs/builders";
import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from "discord.js";

export default function createMapEmbed(url: string): any {
  const embed = new EmbedBuilder().setImage(url);

  return embed;
}
