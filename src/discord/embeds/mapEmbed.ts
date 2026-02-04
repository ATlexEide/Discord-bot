import { EmbedBuilder } from "@discordjs/builders";

export default function createMapEmbed(url: string): any {
  const embed = new EmbedBuilder().setImage(url);

  return embed;
}
