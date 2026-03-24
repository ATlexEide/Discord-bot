import dotenv from "dotenv";
dotenv.config();
import { client } from "../main.js";
import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const name: string = "test";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Test command for development"),

  async response(interaction: ChatInputCommandInteraction) {
    interaction.reply("YIPPIEE").catch((e: Error) => console.log(e));
  }
};
