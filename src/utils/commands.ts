import dotenv from "dotenv";
dotenv.config();

import { SlashCommandBuilder } from "discord.js";

export interface ICommand {
  name: string;
  description: string;
  response?: Function;
  menuResponse?: Function;
}

export let commands: { [id: string]: ICommand } = {};

const test: ICommand = new SlashCommandBuilder()
  .setName("map")
  .setDescription("testing maps")
  .addStringOption((option) =>
    option.setName("message").setDescription("TEST").setRequired(true)
  );

commands["test"] = test;
