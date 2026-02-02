import { EmbedBuilder } from "@discordjs/builders";

export default function createListEmbed(title: string, listItems: any) {
  const test = listItems
    .map((item: any) => `\n### ${item.data.name} \n ${item.data.description}\n`)
    .join(" ");
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(test.toString());
  console.log(test);
  return embed;
}
