import dotenv from "dotenv";
dotenv.config();

import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  MessageFlags,
  PermissionFlagsBits
} from "discord.js";
import { client } from "../main.js";
import mysql from "mysql2";

const name: string = "setlogchannel";
export default {
  name,
  data: new SlashCommandBuilder()
    .setName(name)
    .setDescription("Sets this channel as the minecraft log channel"),

  async response(interaction: ChatInputCommandInteraction) {
    const db = mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
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
        if (error) console.log(error);
        // @ts-expect-error
        if (!result[0]) {
          console.log("DID NOT FIND GUILD\nCreating record...");
          const query = `INSERT INTO guilds (guildId, log_channel_id)
            VALUES (${interaction.guildId}, ${interaction.channelId})`;
          db.query(query, function (error, results) {
            if (error) throw error;
            console.log("Created record: \n", results);

            interaction.reply({
              content: "Set this channel as the minecraft log channel",
              flags: MessageFlags.Ephemeral
            });
          });
        } else {
          console.log("FOUND GUILD");

          const query = `UPDATE guilds
            SET log_channel_id = ${interaction.channelId}
            WHERE guildId = ${interaction.guildId}`;
          console.log("///// QUERY /////");
          console.log(query);

          db.query(query, async function (error, results) {
            if (error) throw error;
            console.log("Updated record: \n", results);

            interaction.reply({
              content: "Set this channel as the minecraft log channel",
              flags: MessageFlags.Ephemeral
            });
          });
        }

        if (interaction.guildId) {
          const guild = client.guilds.cache.get(interaction.guildId);
          const channel = guild?.channels.cache.get(interaction.channelId);
          channel?.edit({ topic: "Minecraft log channel" });
        }
      }
    );
    db.end();
  }
};
