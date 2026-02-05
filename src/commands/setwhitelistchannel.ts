import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags
} from "discord.js";
import { db } from "../main.js";

export default {
  data: new SlashCommandBuilder()
    .setName("setwhitelistchannel")
    .setDescription("Sets this channel as the minecraft whitelist channel"),

  async response(interaction: ChatInputCommandInteraction) {
    db.connect();
    db.query(
      `SELECT guildId FROM guilds WHERE guildId = ${interaction.guildId}`,
      (error, result) => {
        if (error) console.log(error);
        // @ts-expect-error
        if (!result[0]) {
          console.log("DID NOT FIND GUILD\nCreating record...");
          const query = `INSERT INTO guilds (guildId, whitelist_channel_id)
            VALUES (${interaction.guildId}, ${interaction.channelId})`;
          db.query(query, function (error, results) {
            if (error) throw error;
            console.log("Created record: \n", results);

            interaction.reply({
              content: "Set this channel as the minecraft whitelist channel",
              flags: MessageFlags.Ephemeral
            });
          });
        } else {
          console.log("FOUND GUILD");
          const query = `UPDATE guilds
            SET whitelist_channel_id = ${interaction.channelId}
            WHERE guildId = ${interaction.guildId}`;
          console.log("///// QUERY /////");
          console.log(query);
          db.query(query, function (error, results) {
            if (error) throw error;
            console.log("Updated record: \n", results);

            interaction.reply({
              content: "Set this channel as the minecraft whitelist channel",
              flags: MessageFlags.Ephemeral
            });
          });
        }
      }
    );
  }
};
