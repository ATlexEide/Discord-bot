import dotenv from "dotenv";
dotenv.config();
import { client } from "../main.js";
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription("Test command for development"),

  async response() {
    const channel = client.channels.cache.get("1466784440339664971");
    // @ts-expect-error
    channel?.send("Bot started lol").catch((e: Error) => console.log(e));
  }
};
