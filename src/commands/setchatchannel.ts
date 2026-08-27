import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits
} from "discord.js";
import { db } from "../main.js";

const name: string = "setchatchannel";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Sets this channel as the minecraft chat channel"),

  async response(interaction: ChatInputCommandInteraction) {
    const user = await interaction.guild?.members.fetch(interaction.user.id);
    const userRoles = user?.roles.cache;
    if (!user) return;
    if (!userRoles) return;
    const hasMcAdmin = userRoles.get("1542467267500183552");
    if (!hasMcAdmin) {
      await interaction.reply({
        content: "You must be an mc admin to perform this action.",
        flags: MessageFlags.Ephemeral
      });
      return;
    }
    db.connect();
    db.query(
      `SELECT guildId FROM guilds WHERE guildId = ${interaction.guildId}`,
      (error, result) => {
        try {
          if (error) console.log(error);
          // @ts-expect-error
          if (!result[0]) {
            console.log("DID NOT FIND GUILD\nCreating record...");
            const query = `INSERT INTO guilds (guildId, chat_channel_id)
            VALUES (${interaction.guildId}, ${interaction.channelId})`;
            db.query(query, function (error, results) {
              if (error) throw error;
              console.log("Created record: \n", results);

              interaction.reply({
                content: "Set this channel as the minecraft chat channel",
                flags: MessageFlags.Ephemeral
              });
            });
          } else {
            console.log("FOUND GUILD");
            const query = `UPDATE guilds
            SET chat_channel_id = ${interaction.channelId}
            WHERE guildId = ${interaction.guildId}`;
            console.log("///// QUERY /////");
            console.log(query);
            db.query(query, function (error, results) {
              if (error) throw error;
              console.log("Updated record: \n", results);

              interaction.reply({
                content: "Set this channel as the minecraft chat channel",
                flags: MessageFlags.Ephemeral
              });
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
    db.end();
  }
};
