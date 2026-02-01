import { EmbedBuilder } from "@discordjs/builders";

export default function createInformationalEmbed(infoObj: {
  author?: string;
  title: string;
  desc?: string;
}) {
  const embed = new EmbedBuilder().setTitle(infoObj.title);

  infoObj.author && embed.setAuthor({ name: infoObj.author });
  infoObj.desc && embed.setDescription(infoObj.desc);

  return embed;
}
