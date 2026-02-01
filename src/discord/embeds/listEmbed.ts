import { EmbedBuilder } from "@discordjs/builders";
import { ICommand } from "../../utils/commands.js";

export default function createListEmbed(title: string, listItems: ICommand[]) {
  const test = listItems
    .map((item: ICommand) => `\n### ${item.name} \n ${item.description}\n`)
    .join(" ");
  const embed = new EmbedBuilder()
    .setTitle(title)
    .setDescription(test.toString());

  return embed;
}
