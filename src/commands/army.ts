import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const name: string = "army";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Velvet's army of children!"),

  async response(interaction: ChatInputCommandInteraction) {
    const res = emoji();
    interaction.reply({
      content: res
    });
  }
};

function emoji(emoji: string = "<:child420:1485309385361326221>") {
  const charLimit = 2000;
  console.log(emoji.length);
  let emojiMax = Math.floor(charLimit / emoji.length);
  console.log(charLimit);
  console.log(emojiMax);
  let res = "";
  while (emojiMax > 0) {
    res = res + emoji;
    emojiMax--;
  }
  return res;
}
