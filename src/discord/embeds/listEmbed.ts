import { EmbedBuilder } from "@discordjs/builders";

export default function createListEmbed(title: string, listItems: any) {
  const test = listItems
    .map((item: any) => `\n### ${item.name} \n ${item.description}\n`)
    .join(" ");
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(test.toString());

  return embed;
}
