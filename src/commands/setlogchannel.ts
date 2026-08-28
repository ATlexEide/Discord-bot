import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  InteractionContextType
} from "discord.js";
import setMcChannel from "../utils/setMcChannel.js";

const name: string = "setlogchannel";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Sets this channel as the minecraft log channel")
    .setContexts(InteractionContextType.Guild),

  async response(interaction: ChatInputCommandInteraction) {
    setMcChannel(interaction, "log");
    return;
  }
};
