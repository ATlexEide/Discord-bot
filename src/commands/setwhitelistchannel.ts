import dotenv from "dotenv";
dotenv.config();

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import setMcChannel from "../utils/setMcChannel.js";

const name: string = "setwhitelistchannel";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Sets this channel as the minecraft whitelist channel"),

  async response(interaction: ChatInputCommandInteraction) {
    setMcChannel(interaction, "whitelist");
    return;
  }
};
