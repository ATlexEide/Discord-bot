import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const name: string = "hilove";
export default {
  name,
  data: new SlashCommandBuilder().setName(name).setDescription("Hi love!"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply({
      content: `${interaction.user.displayName} says hi love!\n*mwahhhh* :heart:`
    });
  }
};
