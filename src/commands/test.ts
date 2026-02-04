import dotenv from "dotenv";
dotenv.config();
import { client } from "../main.ts";
import {
  ChannelManager,
  ChatInputCommandInteraction,
  GuildChannel,
  SlashCommandBuilder,
  TextChannel
} from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("test").setDescription("test"),

  async response() {
    const channel = client.channels.cache.get("1466784440339664971");
    // @ts-expect-error
    channel?.send("Bot started lol");
  }
};
