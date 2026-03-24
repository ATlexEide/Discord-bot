import dotenv from "dotenv";
dotenv.config();
import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const name: string = "testing";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Test command for development"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply("hmmm").catch((e: Error) => console.log(e));
  }
};
